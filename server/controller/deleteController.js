const db = require("../db/index").pool;

const deleteExpense = async (req, res) => {
    console.log("**************deleteExpense*****************");
    try {
      const { id } = req.params;  
      const query = 'DELETE FROM expenses WHERE id = $1';
  
      console.log("query", query);
      const response = await db.query(query, [id]);
      if (response.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "No record found with the given id",
        });
      }
  
      // Successfully deleted
      res.status(200).json({
        success: true,
        message: "Expense deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting expense:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  const deleteCategory = async (req, res) => {
    console.log("**************deleteCategory*****************");
    try {
      const { id } = req.params; 
      const query = 'DELETE FROM categories WHERE id = $1';
  
      console.log("query", query);
      const response = await db.query(query, [id]);
  
      // If no rows were deleted, return a 404 error
      if (response.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "No category found with the given id",
        });
      }
  
      // Successfully deleted
      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  


module.exports = { deleteExpense, deleteCategory };
