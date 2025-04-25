const db = require("../db/index").pool;

const getData = async (req, res) => {
  console.log("**************getData*****************");
  try {
const query = ``;

    console.log("query", query);

    const response = await db.query(query);
    // console.log("response", response.rows);
    const records = response.rows;
    console.log("records", records);

    if (records.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No records found" });
    }

    res.status(200).json({ success: true, data: records });
  } catch (error) {
    console.error("Error retrieving records:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = { getData };
