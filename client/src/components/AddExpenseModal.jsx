import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";

const AddExpenseModal = ({
  openModal,
  setOpenModal,
  onClose,
  handleSubmitAddExpense,
  handleUpdateExpense, // function to handle expense update
  categories,
  setExpenseData,
  expenseData,
  expense, // passed in prop (if exists)
}) => {
  useEffect(() => {
    if (expense) {
      // If there is an expense, populate the form with the existing data
      setExpenseData({
        amount: expense.amount,
        category: categories?.find((cat) => cat.id === expense.category_id), // Set category to full object
        description: expense.description,
        date: expense.date ? new Date(expense.date) : null,
      });
    } else {
      // If no expense, clear the form data
      setExpenseData({
        amount: "",
        category: "", // Initially category is an empty string
        description: "",
        date: null,
      });
    }
  }, [expense, setExpenseData, categories]); // Runs when expense or categories changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle category change separately since it's an object
    if (name === "category") {
      const selectedCategory = categories.find((cat) => cat.id === value);
      setExpenseData((prev) => ({ ...prev, category: selectedCategory }));
    } else {
      setExpenseData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (newDate) => {
    if (newDate) {
      setExpenseData((prev) => ({ ...prev, date: newDate }));
    }
  };

  const handleSubmit = () => {
    const payload = {
      ...expenseData,
      date: expenseData.date ? format(expenseData.date, "MM/dd/yyyy") : null,
      expense_id: expense ? expense?.id : null, // Include expense ID if updating
    };
    console.log("payload", payload);

    if (expense) {
      // If there's an expense, call the update function
      handleUpdateExpense(payload);
    } else {
      // If no expense, call the add function
      handleSubmitAddExpense(payload);
    }
    onClose();
  };

  return (
    <Dialog open={openModal} onClose={onClose}>
      <DialogTitle>{expense ? "Update Expense" : "Add Expense"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Amount"
          name="amount"
          type="number"
          placeholder="Enter amount"
          fullWidth
          value={expenseData.amount}
          onChange={handleInputChange}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={expenseData.category ? expenseData.category.id : ""}
            onChange={handleInputChange}
            label="Category"
          >
            <MenuItem value="" disabled>
              Select category
            </MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Description"
          name="description"
          placeholder="Enter description"
          fullWidth
          value={expenseData.description}
          onChange={handleInputChange}
          margin="normal"
          inputProps={{
            autoComplete: "off", // double layer
            form: {
              autoComplete: "off",
            },
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <DatePicker
            label="Expense Date"
            value={expenseData.date}
            onChange={handleDateChange}
            format="dd/MM/yyyy"
            disablePortal
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                placeholder: "Select date",
              },
            }}
          />
        </LocalizationProvider>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setExpenseData({
              amount: "",
              category: "", // Clear category when canceling
              description: "",
              date: null,
            });
            onClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {expense ? "Update Expense" : "Add Expense"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseModal;
