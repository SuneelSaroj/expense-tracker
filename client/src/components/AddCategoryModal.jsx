import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

/**
 * AddCategoryModal supports both adding and editing a category.
 * Props:
 *  - open: boolean to control dialog visibility
 *  - onClose: function to call when closing the dialog
 *  - onSubmit: function({ name, description }) for adding a new category
 *  - category: optional existing category object { id, name, description }
 *  - onUpdate: function(updatedCategory) for updating an existing category
 */
const AddCategoryModal = ({
  open,
  onClose,
  onSubmit,
  category,
  handleUpdateCategory,
}) => {
  const [cat, setCat] = useState({ name: "", cat_description: "" });

  useEffect(() => {
    if (open) {
      setCat(category || { name: "", cat_description: "" });
    }
  }, [open, category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCat((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (category) {
      // Editing existing category
      handleUpdateCategory(cat);
    } else {
      // Creating new category
      onSubmit(cat);
    }
    onClose();
  };

  const isEditMode = Boolean(category);
  const dialogTitle = isEditMode ? "Edit Category" : "Add New Category";
  const actionButtonText = isEditMode ? "Update Category" : "Add Category";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="category-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="category-dialog-title">{dialogTitle}</DialogTitle>

      <DialogContent dividers>
        <TextField
          autoFocus
          margin="normal"
          label="Category Name"
          variant="outlined"
          name="name"
          fullWidth
          autoComplete="off"
          inputProps={{
            autoComplete: "off", // double layer
            form: {
              autoComplete: "off",
            },
          }}
          value={cat.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          label="Description"
          variant="outlined"
          name="cat_description"
          inputProps={{
            autoComplete: "off", // double layer
            form: {
              autoComplete: "off",
            },
          }}
          fullWidth
          multiline
          rows={3}
          value={cat.cat_description}
          onChange={handleInputChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {actionButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryModal;
