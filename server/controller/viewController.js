const db = require("../db/index").pool;

const getExpenses = async (req, res) => {
  console.log("**************getExpenses*****************");
  try {
    const userId = req.userId; // from middleware
    console.log("userId", userId);

    const query = `
      SELECT 
        e.id, 
        e.user_id,
        e.category_id,
        c.name AS category_name,
        e.amount,
        e.description,
        TO_CHAR(e.date, 'YYYY-MM-DD') AS date, -- Format date nicely
        TO_CHAR(e.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM expenses e
      LEFT JOIN categories c 
        ON e.category_id = c.id 
      WHERE e.user_id = $1
      ORDER BY e.date DESC; -- latest expenses first
    `;

    const response = await db.query(query, [userId]);

    const expenses = response.rows;

    console.log("expenses:", expenses);

    res.status(200).json({
      success: true,
      expenses: expenses,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses",
    });
  }
};

const getCategories = async (req, res) => {
  console.log("**************getCategories*****************");
  try {
    const userId = req.userId; // Assuming userId is set in the middleware
    console.log("userId", userId);

    // SQL query to get categories along with the sum of amounts
    const query = `
      SELECT 
        c.id, 
        c.user_id, 
        c.name, 
        c.cat_description, 
        COALESCE(
          TO_CHAR(SUM(e.amount), 'FM999,999,999') 
          , '0') AS total_amount
      FROM categories c
      LEFT JOIN expenses e ON c.id = e.category_id AND e.user_id = c.user_id
      WHERE c.user_id = $1
      GROUP BY c.id;
    `;

    console.log("query", query);

    // Execute the query
    const response = await db.query(query, [userId]);

    // Extract categories and sum of amounts from the response
    const categories = response.rows;

    console.log("categories with total amount:", categories);

    // Send the response back
    res.status(200).json({
      success: true,
      categories: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

module.exports = { getExpenses, getCategories };
