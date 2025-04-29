import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCategoryModal from "../components/AddCategoryModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Category = ({
  categories,
  onSubmit,
  isModalOpen,
  handleAOpenCategoryClick,
  onCloseModal,
  deleteCategory,
  expense,
  handleEditCategory,
  category,
  onUpdate,
}) => {
  // Function to generate a random blue gradient for each card
  const generateRandomBlueGradient = () => {
    const blueShades = [
      ["#1e3c72", "#2a5298"], // Dark to light blue
      ["#1e2a47", "#3a5a7c"], // Navy blue to light blue
      ["#005c97", "#363795"], // Royal blue to deep blue
      ["#3b8d99", "#6b9ab8"], // Teal to light blue
      ["#0f4b6e", "#2a7db0"], // Blue-gray to ocean blue
    ];
    const randomIndex = Math.floor(Math.random() * blueShades.length);
    return `linear-gradient(to right, ${blueShades[randomIndex][0]}, ${blueShades[randomIndex][1]})`;
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {/* Render existing categories */}

      {categories.map((cat, index) => (
        <Card
          key={index}
          sx={{
            width: 300,
            height: 150,
            p: 2,
            background: generateRandomBlueGradient(),
            borderRadius: 1,
            boxShadow: 3,
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 6,
            },
            position: "relative",
          }}
        >
          <CardContent>
            {/* Icon Buttons for Edit, Delete, and Add at top-right corner */}
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "#fff",
              }}
              onClick={() => handleEditCategory(cat)} // Add edit logic
            >
              <EditIcon />
            </IconButton>

            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 40,
                color: "#fff",
              }}
              onClick={() => deleteCategory(cat.id)}
            >
              <DeleteIcon />
            </IconButton>

            {/* Amount at the top with larger font */}
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                marginBottom: 1, // Adding some spacing between amount and category name
              }}
            >
              Rs {cat.total_amount} {/* Displaying amount with Rs */}
            </Typography>

            {/* Category name below the amount */}
            <Typography variant="h6" sx={{ color: "#fff", marginBottom: 0.5 }}>
              {cat.name}
            </Typography>

            {/* Category description */}
            <Typography variant="body2" sx={{ color: "#f1f1f1", mb: 1 }}>
              {cat.cat_description}
            </Typography>
          </CardContent>
        </Card>
      ))}
      {/* Add new category card (with plus symbol) */}
      <Card
        sx={{
          width: 300,
          height: 150,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          background: generateRandomBlueGradient(),
          borderRadius: 1,
          boxShadow: 3,
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 6,
          },
          "&:hover .hoverText": {
            opacity: 1,
            transform: "translateY(0)",
          },
        }}
        onClick={handleAOpenCategoryClick}
      >
        <IconButton>
          <AddIcon sx={{ fontSize: 40, color: "#ffffff", marginTop: 3 }} />
        </IconButton>
        <Typography
          className="hoverText"
          sx={{
            mt: 1,
            fontSize: 16,
            color: "#ffffff",
            opacity: 0,
            transform: "translateY(10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          Add Category
        </Typography>
      </Card>
      {/* AddCategoryModal component */}
      <AddCategoryModal
        open={isModalOpen}
        onClose={onCloseModal}
        onSubmit={onSubmit}
        category={category}
        onUpdate={onUpdate}
      />
    </Box>
  );
};

export default Category;
