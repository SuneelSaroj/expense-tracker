import { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar";
import CategoryCard from "../CategoryCard";
import api from "../../service/api";
import { usePopUpContext } from "../../context/PopupMessage";
import ExpensesList from "../ExpensesList";
import { PieChart, PieArc, PieArcLabel, PieArcLabelPlot } from "@mui/x-charts";
import BarChartComponent from "../UI/BarChartComponent";
import PieChartComponent from "../UI/PieChartComponent";

const drawerWidth = 239.2;

export default function Dashboard() {
  const { setPopupMessage, setLoading } = usePopUpContext();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [categories, setCategories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  const [expenses, setExpenses] = useState([]);

  const [expense, setExpense] = useState(null);

  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const [openModal, setOpenModal] = useState(null);
  const [category, setCategory] = useState(null);

  // Toggle the sidebar
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle the "Add Category" button click, opening the modal
  const handleAOpenCategoryClick = () => {
    console.log("Add Category button clicked", isModalOpen);
    setIsModalOpen(true);
    setCategoryToEdit(null);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setExpense(null); // Reset the expense state when closing the modal
  };

  const handleAddCategory = async (category) => {
    console.log("category", category);
    setLoading(true);
    try {
      // Call the backend API to add the category
      const response = await api.post("/add-category", {
        name: category.name,
        description: category.description,
      });

      if (response.data.success) {
        // Update local state only if API success
        setCategories((prevCategories) => [
          ...prevCategories,
          response.data.category,
        ]);
        setIsModalOpen(false); // Close modal
        setPopupMessage({
          state: true,
          type: "success",
          message: "Expense added successfully!",
        });
        setLoading(false);
        // alert(Category "${response.data.category.name}" added successfully!);
      } else {
        // alert(response.data.message || "Failed to add category.");
        setPopupMessage({
          state: true,
          type: "error",
          message: response.data.message || "Failed to add category.",
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setPopupMessage({
        state: true,
        type: "error",
        message: error.response?.data?.message || "Server error. Try again!",
      });
      console.error("Error adding category:", error);
      alert(error.response?.data?.message || "Server error. Try again!");
    }
  };
  useEffect(() => {
    const fetchInitialData = async () => {
      await getCategories();
      await fetchExpenses();
    };

    fetchInitialData();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/view-expenses");
      if (response.data.success) {
        console.log("response.data.expenses", response.data.expenses);
        setExpenses(response.data.expenses);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await api.get("/categories");

      if (response.data.success) {
        console.log("categories", response.data.categories);
        setCategories(response.data.categories);
      } else {
        console.error("Failed to fetch categories:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    setLoading(true); // Set loading state to true while the API request is in progress
    try {
      // Call the backend API to delete the category
      const response = await api.delete(`/delete-category/${categoryId}`);

      if (response.data.success) {
        // Update local state only if API success (remove category from list)
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== categoryId)
        );
        setPopupMessage({
          state: true,
          type: "success",
          message: "Category deleted successfully!",
        });
        setLoading(false);
      } else {
        setPopupMessage({
          state: true,
          type: "error",
          message: response.data.message || "Failed to delete category.",
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setPopupMessage({
        state: true,
        type: "error",
        message: error.response?.data?.message || "Server error. Try again!",
      });
      console.error("Error deleting category:", error);
      alert(error.response?.data?.message || "Server error. Try again!");
    }
  };

  const handleEditExpense = (expense) => {
    console.log("Edit clicked for:", expense);
    setOpenModal(true);
    setExpense(expense); // Open the modal for editing
  };
  const handleDeleteExpense = async (id) => {
    setLoading(true); // Start the loading spinner or state
    try {
      const response = await api.delete(`/delete-expense/${id}`); // Call the delete endpoint with the expense ID

      if (response.data.success) {
        getCategories(); // Refresh categories if necessary
        setPopupMessage({
          state: true,
          type: "success",
          message: "Expense deleted successfully!", // Show success message
        });
      } else {
        setPopupMessage({
          state: true,
          type: "warning",
          message: response.data.message || "Failed to delete expense", // Show failure message if delete fails
        });
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      setPopupMessage({
        state: true,
        type: "error",
        message: error.response?.data?.message || "Server error. Try again!", // Show error message if server fails
      });
    } finally {
      await fetchExpenses(); // Refresh the expenses list after deleting
      setLoading(false); // Stop the loading spinner or state
    }
  };

  const handleViewExpensesClick = async () => {
    console.log("view expenseeess");
    try {
      setSelectedMenu("view-expenses"); // Set the selected menu first
      setLoading(true);
      const response = await api.get("/view-expenses");
      if (response.data.success) {
        console.log("response.data.expenses", response.data.expenses);
        setExpenses(response.data.expenses);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setPopupMessage({
        state: true,
        type: "error",
        message: error.response?.data?.message || "Logout failed",
      });
      setLoading(false);
    }
  };

  const handleSubmitAddExpense = async (payload) => {
    setLoading(true);
    try {
      const response = await api.post("/add-expense", {
        amount: payload.amount,
        category: payload.category,
        description: payload.description,
        date: payload.date,
      });

      if (response.data.success) {
        getCategories();
        setPopupMessage({
          state: true,
          type: "success",
          message: "Expense added successfully!",
        });
      } else {
        setPopupMessage({
          state: true,
          type: "warning",
          message: response.data.message || "Failed to add expense",
        });
      }
    } catch (error) {
      console.error("Error submitting expense:", error);
      setPopupMessage({
        state: true,
        type: "error",
        message: error.response?.data?.message || "Server error. Try again!",
      });
    } finally {
      await fetchExpenses(); // Refresh the expenses list after adding/updating
      setLoading(false);
    }
  };
  const handleUpdateExpense = async (payload) => {
    setLoading(true);
    try {
      const response = await api.put("/update-expense", {
        amount: payload.amount,
        category: payload.category,
        description: payload.description,
        date: payload.date,
        expense_id: payload.expense_id,
      });

      if (response.data.success) {
        getCategories();
        setPopupMessage({
          state: true,
          type: "success",
          message: "Expense added successfully!",
        });
      } else {
        setPopupMessage({
          state: true,
          type: "warning",
          message: response.data.message || "Failed to add expense",
        });
      }
    } catch (error) {
      console.error("Error submitting expense:", error);
      setPopupMessage({
        state: true,
        type: "error",
        message: error.response?.data?.message || "Server error. Try again!",
      });
    } finally {
      await fetchExpenses(); // Refresh the expenses list after adding/updating
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (payload) => {
    setLoading(true);
    try {
      const response = await api.put("/update-category", {
        category_id: payload.id,
        name: payload.name,
        description: payload.cat_description,
      });

      if (response.data.success) {
        getCategories(); // Refresh the category list
        setPopupMessage({
          state: true,
          type: "success",
          message: "Category updated successfully!",
        });
        setIsModalOpen(false); // Close the modal
      } else {
        setPopupMessage({
          state: true,
          type: "warning",
          message: response.data.message || "Failed to update category",
        });
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setPopupMessage({
        state: true,
        type: "error",
        message: error.response?.data?.message || "Server error. Try again!",
      });
    } finally {
      await getCategories(); // Refresh categories if needed
      setLoading(false);
    }
  };

  const handleEditCategory = (cat) => {
    console.log("Edit clicked for:", cat);
    // setOpenModal(true);
    setIsModalOpen(true); // Open the modal for editing
    setCategoryToEdit(cat); // Set the category to edit
    // setCategory(cat);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#EEF2FF" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#333793",
          ml: { sm: `calc(${drawerWidth}px - 10px)` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: "80px",
        }}
      >
        <Toolbar sx={{ minHeight: "80px" }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div" mt={2}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, mt: "64px" }}
      >
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          categories={categories}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setExpenses={setExpenses}
          expense={expense}
          setExpense={setExpense}
          handleViewExpensesClick={handleViewExpensesClick}
          handleSubmitAddExpense={handleSubmitAddExpense}
          handleUpdateExpense={handleUpdateExpense}
        />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: "11px",
          backgroundColor: "#EEF2FF",
        }}
      >
        <Toolbar />
        {selectedMenu === "dashboard" && (
          <>
            <Typography variant="h4" gutterBottom>
              Welcome to Your Expense Tracker!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Here you can add your expenses, view history, and manage your
              spending easily.
            </Typography>

            <CategoryCard
              categories={categories}
              onSubmit={handleAddCategory}
              handleAOpenCategoryClick={handleAOpenCategoryClick}
              isModalOpen={isModalOpen}
              onCloseModal={handleCloseModal}
              deleteCategory={handleDeleteCategory}
              EditCategory={handleEditCategory}
              handleUpdateCategory={handleUpdateCategory}
              category={categoryToEdit}
            />

            {/* Box for charts at the bottom */}
            <Box
              sx={{
                mt: 4,
                minHeight: "55vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                backgroundColor: "#e4e7ff",
              }}
            >
              {/* Grid for Chart Layout */}
              <Grid container spacing={2}>
                {/* Monthly Expenses Bar Chart */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    display: "flex", // To center the chart
                    flexDirection: "column", // Ensures content is stacked
                    alignItems: "center", // Vertical centering
                    justifyContent: "center", // Horizontal centering
                    ml: 2,
                  }}
                >
                  <BarChartComponent expenses={expenses} />
                </Grid>

                {/* Category Distribution Pie Chart */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    display: "flex", // To center the chart
                    flexDirection: "column", // Ensures content is stacked
                    alignItems: "center", // Vertical centering
                    justifyContent: "center", // Horizontal centering
                    marginLeft: "auto", // Aligns the chart to the right
                    mr: 2, // Adds extra space on the right side to shift more
                  }}
                >
                  {/* <PieChart data={getCategoryChartData()} /> */}
                  <PieChartComponent categories={categories} />
                </Grid>
              </Grid>
            </Box>
          </>
        )}

        {selectedMenu === "view-expenses" && (
          <>
            <Typography variant="h4" gutterBottom>
              Your Expense History
            </Typography>
            <ExpensesList
              expenses={expenses}
              expense={expense}
              onEdit={(expense) => handleEditExpense(expense)}
              onDelete={(id) => handleDeleteExpense(id)}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
