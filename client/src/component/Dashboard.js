import React, { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import { Grid, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import axios from "../utils/axios";
import Header from "./Header";
import logo from "../assets/logo.png";
import MovingDotLoader from "../component/UI/movingDotLoader";
import { Alert, Button, Snackbar } from "@mui/material"; // Avoid duplicating AppBar and Box here
import { DataGrid } from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
// import { DataGridPro } from "@mui/x-data-grid-pro";
import Footer from "./Footer";

// import { LicenseInfo } from "@mui/x-data-grid-pro";

// LicenseInfo.setLicenseKey(
//   "6c128a169ce009ec686d2e99f2d76686T1JERVI6MzI3NDIsRVhQSVJZPTE2Njg2OTE2MzIwMDAsS0VZVkVSU0lPTj0x"
// );

// LicenseInfo.setLicenseKey(
//   "6c128a169ce009ec686d2e99f2d76686T1JERVI6MzI3NDIsRVhQSVJZPTE2Njg2OTE2MzIwMDAsS0VZVkVSU0lPTj0x"
// );

export default function Dashboard() {
  const [fetchData, setFetchData] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null); // State to store the error message
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [open, setOpen] = useState(false);

  const [openAddChargeModel, setOpenAddChargeModel] = React.useState(false);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const date = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${month}-${date}-${year}_${hours}-${minutes}-${seconds}`;
  };

  const [ferrous, setFerrous] = useState("");
  const [nonFerrous, setNonFerrous] = useState("");
  const [lightGauge, setLightGauge] = useState("");
  const [oscillate, setOscillate] = useState("");
  const [longProduct, setLongProduct] = useState("");
  const [totals, setTotals] = useState("");
  const [date, setDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filename = `backlog_report_${getCurrentDateTime()}.xlsx`;

  const ExportData = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    let formattedDate;
    let formattedendDate;
    if (date) {
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const year = date.getFullYear();
      formattedDate = `${month}/${day}/${year}`;
      // console.log("Formatted Date (MM/dd/yyyy):", formattedDate);
    }

    if (endDate) {
      const month = (endDate.getMonth() + 1).toString().padStart(2, "0");
      const day = endDate.getDate().toString().padStart(2, "0");
      const year = endDate.getFullYear();
      formattedendDate = `${month}/${day}/${year}`;
      // console.log("Formatted Date (MM/dd/yyyy):", formattedDate);
    }

    const payload = {
      date: formattedDate,
      endDate: formattedendDate,
    };
    try {
      const response = await axios.get("/export", {
        responseType: "blob",
        params: payload,
      });

      // Check if the response is successful
      if (response.status === 200) {
        // Create a Blob from the response data
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setErrorMessage(response.data.message || "Failed to export data.");
        setOpen(true); // Open the Snackbar
      }
      // setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
      // Set the error message to display in the Material UI Alert
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to export data. Please try again."
      );
      setOpen(true); // Open the Snackbar for error notification
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  const SearchData = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    setFetchData([]);
    let formattedDate;
    let formattedendDate;
    if (date) {
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const year = date.getFullYear();
      formattedDate = `${month}/${day}/${year}`;
      // console.log("Formatted Date (MM/dd/yyyy):", formattedDate);
    }
    if (endDate) {
      const month = (endDate.getMonth() + 1).toString().padStart(2, "0");
      const day = endDate.getDate().toString().padStart(2, "0");
      const year = endDate.getFullYear();
      formattedendDate = `${month}/${day}/${year}`;
      // console.log("Formatted Date (MM/dd/yyyy):", formattedDate);
    }

    let payload = {
      date: formattedDate,
      endDate: formattedendDate,
    };

    try {
      const response = await axios.get("/datesearch", {
        params: payload, // Pass data as query parameters
      });

      // Check if the response is successful
      if (response.status === 200) {
        setFetchData(response.data.data);
      } else {
        setFetchData([]);
        setErrorMessage(response.data.message || "Failed to export data.");
        setOpen(true);
      }
    } catch (error) {
      setFetchData([]);
      setIsLoading(false);
      console.error("Error fetching data:", error);
      // Set the error message to display in the Material UI Alert
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to get data Based of filter. Please try again."
      );
      setOpen(true); // Open the Snackbar for error notification
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const getLimit = async () => {
    setOpenAddChargeModel(true);
    setIsLoading(true);
    setFerrous("");
    setNonFerrous("");
    setLightGauge("");
    setOscillate("");
    setLongProduct("");
    setTotals("");
    try {
      const response = await axios.get("/getlimit");
      if (response.status === 200) {
        setFerrous(response.data.data.ferrous || 0);
        setNonFerrous(response.data.data.nonferrous || 0);
        setLightGauge(response.data.data.lightgauge || 0);
        setOscillate(response.data.data.oscillate || 0);
        setLongProduct(response.data.data.longproduct || 0);
        setTotals(response.data.data.totals || 0);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      isFetching.current = false;
      setIsLoading(false);
    }
  };

  const isFetching = useRef(false);

  const fetchDataFromApi = async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    setIsLoading(true);
    try {
      const response = await axios.get("/data");
      if (response.status === 200) {
        console.error("data:", response.data.data);
        setFetchData(response.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      isFetching.current = false;
      setIsLoading(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const columns = [
    {
      field: "cust_id",
      headerName: "Customer #",

      flex: 1,
      sortable: true,
    },
    {
      field: "cust_nm",
      headerName: "Customer Name",

      flex: 1.4,
      sortable: true,
    },
    {
      field: "due_dt",
      headerName: "Due Date",

      flex: 1,
      sortable: true,
    },
    {
      field: "ord",
      headerName: "Order/Item",

      flex: 1,
      sortable: true,
    },
    {
      field: "sls_cat",
      headerName: "Sales Category",

      flex: 0.9,
      sortable: true,
    },
    {
      field: "orh_shpg_whs",
      headerName: "Warehouse",

      flex: 0.9,
      sortable: true,
    },
    {
      field: "frm",
      headerName: "Form",

      flex: 0.9,
      sortable: true,
    },
    {
      field: "grd",
      headerName: "Grade",

      flex: 1,
      sortable: true,
    },
    {
      field: "size",
      headerName: "Size",

      flex: 0.9,
      sortable: true,
    },
    {
      field: "fns",
      headerName: "Finish",

      flex: 0.9,
      sortable: true,
    },
    {
      field: "wdt",
      headerName: "Width",

      flex: 0.9,
      sortable: true,
    },
    {
      field: "lngh",
      headerName: "Length",

      flex: 1,
      sortable: true,
    },

    {
      field: "ord_wgt",
      headerName: "Order Weight",

      flex: 1,
      sortable: true,
    },
    {
      field: "bal_wgt",
      headerName: "Balance Weight",

      flex: 1,
      sortable: true,
    },
  ];

  function generateRandom() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  const handleDateChange = (selectedDate) => {
    // console.log("selected date", selectedDate);
    // if (selectedDate) {
    // const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    // const day = selectedDate.getDate().toString().padStart(2, "0");
    // const year = selectedDate.getFullYear();
    // const formattedDate = `${month}/${day}/${year}`;
    // console.log("Formatted Date (MM/dd/yyyy):", formattedDate);

    setDate(selectedDate); // This is now the Date object, not the string
    // }
  };

  const handleCloseChargeModel = () => {
    setOpenAddChargeModel(false);
  };

  const handeSaveLimit = async () => {
    setIsLoading(true);
    setOpenAddChargeModel(false);
    let payload = {
      ferrous: ferrous,
      nonFerrous: nonFerrous,
      lightGauge: lightGauge,
      oscillate: oscillate,
      longProduct: longProduct,
      totals: totals,
    };
    try {
      const response = await axios.post("/setlimit", payload);
      setIsLoading(false);
      // Check if the response is successful
      if (response.status === 200) {
        setErrorMessage(response.data.message || "Data successfully updated.");
        setOpen(true);
      } else {
        setErrorMessage(response.data.message || "Failed to update data.");
        setOpen(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
      // Set the error message to display in the Material UI Alert
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to get data Based of filter. Please try again."
      );
      setOpen(true); // Open the Snackbar for error notification
    } finally {
      setIsLoading(false); // Stop loading state
    }

    console.log("payload", payload);
  };

  return (
    <>
      <AppBar
        position="absolute"
        sx={{ backgroundColor: "#f8f9fa", padding: "5px" }}>
        <Header title="Backlog Report" />
      </AppBar>

      <Grid container spacing={2} sx={{ marginTop: "64px" }}>
        {/* Error Message */}
        {errorMessage && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}>
            <Alert onClose={handleClose} sx={{ width: "100%" }}>
              {errorMessage}
            </Alert>
          </Snackbar>
        )}

        {/* Loader */}
        {isLoading && (
          <Grid
            item
            xs={12}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}>
            <MovingDotLoader />
          </Grid>
        )}

        {/* Export Button */}
        <Grid
          item
          xs={4.2}
          container
          justifyContent="flex-end"
          sx={{ paddingRight: "20px" }}></Grid>
        <Grid
          item
          xs={1}
          container
          justifyContent="flex-end"
          alignItems="center">
          <label
            style={{
              marginRight: "8px",
              fontSize: "17px",
            }}>
            Start Date
          </label>
        </Grid>
        <Grid
          item
          xs={1.5}
          container
          justifyContent="flex-end"
          alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              slotProps={{
                textField: {
                  inputProps: {
                    style: {
                      padding: "8px", // Adjust the padding value as needed
                      margin: "1px",
                    },
                  },
                },
              }}
              size="small"
              value={date || null} // Use null instead of ""
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid
          item
          xs={0.8}
          container
          justifyContent="flex-end"
          alignItems="center">
          <label
            style={{
              marginRight: "8px",
              fontSize: "17px",
            }}>
            End Date
          </label>
        </Grid>
        <Grid
          item
          xs={1.5}
          container
          justifyContent="flex-end"
          alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              slotProps={{
                textField: {
                  inputProps: {
                    style: {
                      padding: "8px", // Adjust the padding value as needed
                      margin: "1px",
                    },
                  },
                },
              }}
              size="small"
              value={endDate || null} // Use null instead of ""
              onChange={(dt) => setEndDate(dt)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small" // Avoid overriding InputProps if not necessary
                />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid
          item
          xs={1}
          container
          justifyContent="flex-end"
          sx={{ paddingRight: "20px" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={SearchData}
            sx={{
              height: "40px",
              width: "110px",
              "&:hover": {
                backgroundColor: "#26a69a",
                color: "white",
                borderColor: "black",
              },
              color: "black",
            }}
            startIcon={<SearchIcon />}>
            Search
          </Button>
        </Grid>

        <Grid
          item
          xs={1}
          container
          justifyContent="flex-center"
          sx={{ paddingRight: "20px" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={ExportData}
            sx={{
              height: "40px",
              width: "110px",
              "&:hover": {
                backgroundColor: "#26a69a",
                color: "white",
                borderColor: "black",
              },
              color: "black",
            }}
            startIcon={<SaveIcon />}>
            Export
          </Button>
        </Grid>

        <Grid
          item
          xs={1}
          container
          justifyContent="flex-center"
          sx={{ paddingRight: "20px" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={getLimit}
            sx={{
              height: "40px",
              width: "110px",
              "&:hover": {
                backgroundColor: "#26a69a",
                color: "white",
                borderColor: "black",
              },
              color: "black",
            }}
            startIcon={<SaveIcon />}>
            Set Limit
          </Button>
        </Grid>

        {/* Data Grid */}
        <Grid
          item
          xs={12}
          sx={{
            height: "calc(100vh - 230px)",
            width: "100%",
            marginTop: "12px",
            "& .super-app-theme--header": {
              // backgroundColor: "#002349",
            },
            flex: 1,
          }}>
          <DataGrid
            rows={fetchData}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={5}
            disableColumnMenu
            rowsPerPageOptions={[5]}
            localeText={{
              noRowsLabel: "",
            }}
            sx={{
              "& .MuiDataGrid-columnHeader": {
                fontWeight: "bold !important",
                fontSize: "16px !important",
              },
              "& .MuiDataGrid-cell:hover": {
                color: "secondary.main",
              },
              borderColor: "grey.400",
            }}
            disableSelectionOnClick
          />
        </Grid>

        <Dialog
          open={openAddChargeModel}
          onClose={handleCloseChargeModel}
          fullWidth={true}
          maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 600 }}>
            Update Limit
            <IconButton
              sx={{
                position: "absolute",
                right: 8,
                top: 11,
                color: (theme) => theme.palette.grey[500],
              }}
              onClick={handleCloseChargeModel}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box className="ixBrowseGridLayout">
              <Grid container spacing={4}>
                {/* Left Part */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Ferrous"
                    type="number"
                    size="small"
                    value={ferrous}
                    onChange={(e) => setFerrous(e.target.value)}
                    InputProps={{
                      inputProps: { min: 0, step: "0.0001" },
                    }}
                    sx={{
                      '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      '& input[type="number"]': {
                        MozAppearance: "textfield",
                      },
                    }}
                  />
                </Grid>

                {/* Left Part */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Light Gauge"
                    id="lightGauge"
                    value={lightGauge}
                    name="lightGauge"
                    size="small"
                    onChange={(e) => setLightGauge(e.target.value)}
                    type="number"
                    InputProps={{
                      inputProps: { min: 0, step: "0.0001" },
                    }}
                    sx={{
                      '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      '& input[type="number"]': {
                        MozAppearance: "textfield",
                      },
                    }}
                  />
                </Grid>

                {/* Left Part */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Long Product"
                    id="longProduct"
                    name="longProduct"
                    size="small"
                    onChange={(e) => setLongProduct(e.target.value)}
                    value={longProduct}
                    type="number"
                    InputProps={{
                      inputProps: { min: 0, step: "0.0001" },
                    }}
                    sx={{
                      '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      '& input[type="number"]': {
                        MozAppearance: "textfield",
                      },
                    }}
                  />
                </Grid>

                {/* Left Part */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Non Ferrous"
                    id="nonFerrous"
                    name="nonFerrous"
                    type="number"
                    onChange={(e) => setNonFerrous(e.target.value)}
                    value={nonFerrous}
                    size="small"
                    InputProps={{
                      inputProps: { min: 0, step: "0.0001" },
                    }}
                    sx={{
                      '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      '& input[type="number"]': {
                        MozAppearance: "textfield",
                      },
                    }}
                  />
                </Grid>

                {/* Left Part */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Oscillate"
                    id="oscillate"
                    name="oscillate"
                    onChange={(e) => setOscillate(e.target.value)}
                    value={oscillate}
                    type="number"
                    size="small"
                    InputProps={{
                      inputProps: { min: 0, step: "0.0001" },
                    }}
                    sx={{
                      '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      '& input[type="number"]': {
                        MozAppearance: "textfield",
                      },
                    }}
                  />
                </Grid>

                {/* Left Part */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Totals"
                    id="totals"
                    name="totals"
                    type="number"
                    onChange={(e) => setTotals(e.target.value)}
                    value={totals}
                    size="small"
                    InputProps={{
                      inputProps: { min: 0, step: "0.0001" },
                    }}
                    sx={{
                      '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      '& input[type="number"]': {
                        MozAppearance: "textfield",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                border: "1px solid rgba(160, 187, 202, 0.5) !important",
                width: "auto",
                background: "info",
              }}
              onClick={handeSaveLimit}>
              <SaveIcon style={{ color: "info", mb: 1 }} /> Update
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>

      <Footer />
    </>
  );
}
