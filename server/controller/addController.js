const db = require("../db/index").pool;


const addExpense = async (req, res) => {
    console.log("**************addExpense*****************");
  
    try {
      const { amount, category_id, description, date } = req.body;
  
      // Validate the input data
      if (!amount || !category_id || !description || !date) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: amount, category_id, description, and date.",
        });
      }
  
      const query = `
        INSERT INTO expenses (amount, category_id, description, date) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *;
      `;
  
      // Execute the query
      const response = await db.query(query, [amount, category_id, description, date]);
  
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
  
  const addCategory = async (req, res) => {
    console.log("**************addCategory*****************");
  
    try {
      // Extract the required fields from the request body
      const { name } = req.body;
  
      // Validate the input data
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Missing required field: name.",
        });
      }
  
      // Prepare the query to insert the new category into the database
      const query = `
        INSERT INTO categories (name) 
        VALUES ($1) 
        RETURNING *;
      `;
  
      // Execute the query
      const response = await db.query(query, [name]);
  
      // Return the newly created category data
      res.status(201).json({
        success: true,
        data: response.rows[0],
      });
    } catch (error) {
      console.error("Error adding category:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  


  module.exports = { addExpense, addCategory };