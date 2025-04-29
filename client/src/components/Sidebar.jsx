// src/components/Sidebar/Sidebar.jsx

import React, { useState } from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt"; // Correct icon
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { usePopUpContext } from "../context/PopupMessage";
import { logoutUser } from "../service/authApi";

import AddExpenseModal from "./AddExpenseModal";

const drawerWidth = 240;

const Sidebar = ({
  mobileOpen,
  handleDrawerToggle,
  categories,
  selectedMenu,
  setSelectedMenu,
  setExpenses,
  handleViewExpensesClick,
  handleSubmitAddExpense,
  handleUpdateExpense,
  openModal,
  setOpenModal,
  expense,
  setExpense,
}) => {
  const navigate = useNavigate();
  const { setPopupMessage, setLoading } = usePopUpContext();
  const { logout, user } = useSession();

  const [expenseData, setExpenseData] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date(),
  });

  const storedUser = JSON.parse(localStorage.getItem("userSession"));

  const handleLogout = async () => {
    try {
      setLoading(true);
      const logoutRes = await logoutUser();
      if (logoutRes) {
        logout(logoutRes.data);
        setPopupMessage({
          state: true,
          type: "success",
          message: logoutRes.data.message,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setPopupMessage({
        state: true,
        type: "error",
        message: error.response?.data?.message || "Logout failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setExpense(null);
  };

  const drawerContent = (
    <div style={{ backgroundColor: "#333793", height: "100%", color: "#fff" }}>
      <Toolbar>
        <Box sx={{ textAlign: "center", width: "100%", mt: 2 }}>
          <Avatar
            sx={{ width: 64, height: 64, margin: "0 auto", bgcolor: "#1976d2" }}
          >
            {(user?.name || storedUser?.username || "U")
              .charAt(0)
              .toUpperCase()}
          </Avatar>
          <Typography variant="h6" sx={{ mt: 1 }}>
            {user?.name || storedUser?.username || "User Name"}
          </Typography>
        </Box>
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 2 }} />

      <List>
        {/* Dashboard */}
        <ListItem
          button
          onClick={() => setSelectedMenu("dashboard")}
          sx={{
            "&:hover": {
              backgroundColor: "#1565c0",
              cursor: "pointer", // Change cursor to pointer on hover
            },
            color: "#fff",
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Add Expense */}
        <ListItem
          button
          onClick={handleOpenModal}
          sx={{
            "&:hover": {
              backgroundColor: "#1565c0",
              cursor: "pointer", // Change cursor to pointer on hover
            },
            color: "#fff",
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Add Expense" />
        </ListItem>

        {/* View Expenses */}
        <ListItem
          button
          onClick={handleViewExpensesClick}
          sx={{
            "&:hover": {
              backgroundColor: "#1565c0",
              cursor: "pointer", // Change cursor to pointer on hover
            },
            color: "#fff",
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="View Expenses" />
        </ListItem>

        {/* Logout */}
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            "&:hover": {
              backgroundColor: "#1565c0",
              cursor: "pointer", // Change cursor to pointer on hover
            },
            color: "#fff",
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Permanent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Add Expense Modal */}
      <AddExpenseModal
        handleSubmitAddExpense={handleSubmitAddExpense}
        handleUpdateExpense={handleUpdateExpense}
        openModal={openModal}
        setOpenModal={setOpenModal}
        categories={categories}
        onClose={handleCloseModal}
        setExpenseData={setExpenseData}
        expense={expense}
        expenseData={expenseData}
      />
    </>
  );
};

export default Sidebar;
