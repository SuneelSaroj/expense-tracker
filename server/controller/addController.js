const db = require("../db/index").pool;

const addExpense = async (req, res) => {
  console.log("**************addExpense*****************");

  try {
    const { amount, category, description, date } = req.body;

    console.log("req.body", req.body);
    const user_id = req.userId;
    console.log("user_id from middleware:", req.userId); // Assuming user_id is attached to req.user

    // Validate the input data
    if (!amount || !category || !description || !date) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: amount, category, description, and date.",
      });
    }

    const created_dt = new Date().toISOString(); // Current date-time

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is missing. Please log in first.",
      });
    }

    const query = `
        INSERT INTO expenses (amount, category_id, description, date, user_id, created_at) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *;
      `;

    // Execute the query
    const response = await db.query(query, [
      amount,
      category?.id,
      description,
      date,
      user_id, // Pass the user ID from the middleware
      created_dt, // Pass the current date-time
    ]);

    // Return the newly created expense data
    res.status(201).json({
      success: true,
      data: response.rows[0],
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateExpense = async (req, res) => {
  console.log("**************updateExpense*****************");

  try {
    const { expense_id, amount, category, description, date } = req.body;

    console.log("req.body", req.body);
    const user_id = req.userId; // Assuming user_id is attached to req.user in the middleware
    console.log("user_id from middleware:", req.userId);

    // Validate the input data
    if (
      !expense_id ||
      !amount ||
      !category ||
      !category.id ||
      !description ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: expense_id, amount, category (with id), description, and date.",
      });
    }

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is missing. Please log in first.",
      });
    }

    // Check if the expense exists and belongs to the user
    const checkExpenseQuery = `
      SELECT * FROM expenses WHERE id = $1 AND user_id = $2;
    `;
    const expenseResult = await db.query(checkExpenseQuery, [
      expense_id,
      user_id,
    ]);

    if (expenseResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Expense not found or you do not have permission to update this expense.",
      });
    }

    console.log("Expense found, proceeding to update.");

    // Now that we know the expense exists, let's update it
    const query = `
      UPDATE expenses
      SET amount = $1, category_id = $2, description = $3, date = $4
      WHERE id = $5
      RETURNING *;
    `;

    // Logging the actual query and parameters being passed to identify any issues
    console.log("Update query:", query);
    console.log("Parameters:", [
      amount,
      category.id, // Use category.id here instead of the full category object
      description,
      date,
      expense_id, // Expense ID to identify the record to update
    ]);

    const response = await db.query(query, [
      amount,
      category.id,
      description,
      date,
      expense_id,
    ]);

    console.log("Update successful, response:", response.rows[0]);

    // Return the updated expense data
    res.status(200).json({
      success: true,
      data: response.rows[0],
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addCategory = async (req, res) => {
  console.log("************** addCategory ***************");

  try {
    const { name, description } = req.body;
    const userId = req.userId; // assuming you're extracting userId from middleware

    console.log("req.body", req.body);
    console.log("description", description);
    // Validate input
    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found.",
      });
    }

    // Insert category
    const insertQuery = `
      INSERT INTO categories (user_id, name, cat_description) 
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await db.query(insertQuery, [
      userId,
      name.trim(),
      description || null,
    ]);

    const newCategory = result.rows[0];

    res.status(201).json({
      success: true,
      message: "Category added successfully.",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error adding category:", error.message);

    // Handle unique name error (duplicate)
    if (error.code === "23505") {
      // PostgreSQL unique violation
      return res.status(400).json({
        success: false,
        message: "Category name already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const updateCategory = async (req, res) => {
  console.log("**************updateCategory*****************");

  try {
    const { category_id, name, description } = req.body;
    const user_id = req.userId; // Set by authentication middleware

    console.log("Request body:", req.body);
    console.log("User ID from middleware:", user_id);

    // Validate input fields
    if (!category_id || !name || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: category_id, name, and description.",
      });
    }

    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated. Please log in.",
      });
    }

    // Check that the category exists and belongs to the current user
    const checkQuery = `
      SELECT * FROM categories WHERE id = $1 AND user_id = $2;
    `;
    const categoryResult = await db.query(checkQuery, [category_id, user_id]);

    if (categoryResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found or you do not have permission to update it.",
      });
    }

    // Perform the update
    const updateQuery = `
      UPDATE categories
      SET name = $1, cat_description = $2
      WHERE id = $3 AND user_id = $4
      RETURNING *;
    `;
    const updateParams = [name, description, category_id, user_id];

    console.log("Executing update:", updateQuery);
    console.log("With parameters:", updateParams);

    const updateResult = await db.query(updateQuery, updateParams);

    res.status(200).json({
      success: true,
      data: updateResult.rows[0],
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};


module.exports = { addExpense, updateExpense, addCategory , updateCategory };
