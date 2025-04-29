const db = require("../db/index").pool;
const bcryptjs = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
// const cryptojs = require("crypto-js");
require("dotenv").config({ path: "../.env" });
const crypto = require("crypto");

const checkAuth = async (req, res) => {
  console.log("checkAuth", req.userId);
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    // Validate request data
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const checkUserQuery = "SELECT id FROM users WHERE email = $1";
    const existingUser = await db.query(checkUserQuery, [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // Token for email verification

    console.log("verificationToken", verificationToken);

    // Insert the new user into the database
    const insertQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email
    `;
    const newUserResult = await db.query(insertQuery, [
      name,
      email,
      hashedPassword,
    ]);

    const newUser = newUserResult.rows[0]; // Newly created user

    // Generate token and set cookie for authentication (JWT for login session)
    generateTokenAndSetCookie(newUser.id, res);

    // Send success response
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: {
        userId: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const login = async (req, res) => {
  console.log("login", req.body);
  const { email, password } = req.body;

  try {
    // 1. Find the user by email
    const query =
      "SELECT id, username, email, password FROM users WHERE email = $1";
    const userResult = await db.query(query, [email]);

    const user = userResult.rows[0]; // Get the first matching user
    console.log("user", user);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // 3. Check password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    // 4. Generate token and set cookie
    generateTokenAndSetCookie(user.id, res);

    // 5. Send user data safely (without password)
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        userId: user.id,
        email: user.email,
        username: user.username,
        // Only send safe fields (no password)
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    // Generate reset token
    // const resetToken = cryptojs.
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    await user.save();

    // Send reset password email
    const clientResetUrl = process.env.CLIENT_URL;

    const resetURL = `${clientResetUrl}/reset-password/${resetToken}`;

    const myEmail = "sunilpasi73@gmail.com";

    sendResetPasswordEmail(myEmail, resetURL);

    console.log("resetToken", resetToken);

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {}
};

const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { resetToken } = req.params;
  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    console.log("user", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }
    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter new password",
      });
    }

    if (!user.isVarified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiresAt = null;

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("error in resetPassword", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const sendEmailVerification = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const varificationToken = crypto.randomBytes(32).toString("hex");
    user.varificationToken = varificationToken;
    user.varificationExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    await user.save();

    // Send verification email
    const clientVerifyUrl = process.env.CLIENT_URL;

    const verifyURL = `${clientVerifyUrl}/${varificationToken}`;

    const myEmail = "sunilpasi73@gmail.com";

    sendVerificationEmail(myEmail, verifyURL);

    res.status(200).json({
      success: true,
      message: "Email verification link sent to your email",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.body;
  console.log("verificationCode", verificationCode);
  try {
    const user = await User.findOne({
      varificationToken: verificationCode,
      varificationExpiresAt: { $gt: Date.now() },
    });
    console.log("user", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    user.isVarified = true;
    user.varificationToken = null;
    user.varificationExpiresAt = null;
    await user.save();

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: user,
    });
  } catch (error) {
    console.log("error in verifyEmail", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  console.log("logout", req.cookies);
  try {
    const { auth_token } = req.cookies;
    console.log("logout auth_token", auth_token);
    if (!auth_token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.clearCookie("auth_token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const setup2FA = async (req, res) => {
  const { userId } = req;
  try {
    console.log("userId", userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.is2FAEnabled) {
      return res.status(400).json({ message: "2FA already enabled" });
    }

    const secret = speakeasy.generateSecret();

    user.twoFactorAuthSecret = secret.base32;
    user.isMFAEnabled = true;
    await user.save();

    const QRCodeDataURL = speakeasy.otpauthURL({
      secret: secret.base32,
      label: user.email,
      issuer: "Suneel",
      encoding: "base32",
    });

    const qrImageUrl = await QRCode.toDataURL(QRCodeDataURL);
    const generateSecret = secret.base32;

    res
      .status(200)
      .json({ success: true, qrImageUrl: qrImageUrl, secret: generateSecret });

    res.send("setup2FA");
  } catch (error) {}
};

const varify2FA = async (req, res) => {
  const { userId } = req;
  const { token } = req.body;

  console.log("token", token);

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    console.log("user", user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.twoFactorAuthSecret) {
      return res
        .status(400)
        .json({ success: false, message: "2FA is not set up for this user" });
    }

    // Verify the provided token with the user's stored secret
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorAuthSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    console.log("verified", verified);

    if (!verified) {
      return res.status(400).json({
        success: false,
        message: "Invalid 2FA token Please try again",
      });
    }

    // Token is valid
    res
      .status(200)
      .json({ success: true, message: "2FA verified successfully" });
  } catch (error) {
    console.error("Error in verify2FA", error);
    res.status(500).json({
      success: false,
      message: "Internal server error:" + error.message,
    });
  }
};

const reset2FA = async (req, res) => {
  const { userId } = req;
  console.log("userId", userId);

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    console.log("user", user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.isMFAEnabled) {
      return res
        .status(400)
        .json({ success: false, message: "2FA is not enabled for this user" });
    }

    user.is2FAEnabled = false;
    user.twoFactorAuthSecret = null;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "2FA disabled successfully" });
  } catch (error) {
    console.error("Error in reset2FA", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error :" + error.message,
    });
  }
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
module.exports = {
  checkAuth,
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout,
  setup2FA,
  varify2FA,
  reset2FA,
  isAuthenticated,
};
