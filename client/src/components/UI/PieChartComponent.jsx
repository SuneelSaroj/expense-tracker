import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function PieChartComponent({ categories }) {
  const pieData = categories.map((cat, index) => ({
    id: index,
    value: parseFloat(cat.total_amount?.replace(/,/g, "")),
    label: cat.name,
  }));

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#f8f9fa",
        p: 3,
        borderRadius: "10px",
        border: "1px solid rgba(128, 0, 128, 0.2)",
        textAlign: "center",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: 750,
        mx: "auto",
        minHeight: 430, // 👈 Match height to bar chart visually
      }}
    >
      <Typography variant="h6" sx={{ color: "#666", mb: 3 }}>
        Expenses by Category
      </Typography>
      <Stack direction="column" spacing={2} alignItems="center">
        <PieChart
          series={[
            {
              data: pieData,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { additionalRadius: -30, color: "gray" },
            },
          ]}
          height={300}
          width={650}
        />
      </Stack>
    </Paper>
  );
}
