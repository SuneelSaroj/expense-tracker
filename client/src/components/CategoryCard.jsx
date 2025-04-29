import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCategoryModal from "../components/AddCategoryModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryCard = ({
  categories,
  onSubmit,
  isModalOpen,
  handleAOpenCategoryClick,
  onCloseModal,
  deleteCategory,
  EditCategory,
  handleUpdateCategory,
  category,
}) => {
  const generateRandomBlueGradient = () => {
    const blueShades = [
      ["#1e3c72", "#2a5298"],
      ["#1e2a47", "#3a5a7c"],
      ["#005c97", "#363795"],
      ["#3b8d99", "#6b9ab8"],
      ["#0f4b6e", "#2a7db0"],
    ];
    const randomIndex = Math.floor(Math.random() * blueShades.length);
    return `linear-gradient(to right, ${blueShades[randomIndex][0]}, ${blueShades[randomIndex][1]})`;
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {/* Render existing categories if any */}
      {categories.length > 0 &&
        categories.map((cat, index) => (
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
              <IconButton
                sx={{ position: "absolute", top: 8, right: 8, color: "#fff" }}
                onClick={() => EditCategory(cat)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{ position: "absolute", top: 8, right: 40, color: "#fff" }}
                onClick={() => deleteCategory(cat.id)}
              >
                <DeleteIcon />
              </IconButton>

              <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: "bold", mb: 1 }}
              >
                Rs {cat.total_amount}
              </Typography>
              <Typography variant="h6" sx={{ color: "#fff", mb: 0.5 }}>
                {cat.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#f1f1f1" }}>
                {cat.cat_description}
              </Typography>
            </CardContent>
          </Card>
        ))}

      {/* Always show Add Category card */}
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

      {/* Add Category Modal */}
      <AddCategoryModal
        open={isModalOpen}
        onClose={onCloseModal}
        onSubmit={onSubmit}
        handleUpdateCategory={handleUpdateCategory}
        category={category}
      />
    </Box>
  );
};

export default CategoryCard;
