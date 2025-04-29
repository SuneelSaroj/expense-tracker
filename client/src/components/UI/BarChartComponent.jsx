import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import moment from "moment";

export default function BarChartComponent({ expenses }) {
  const monthlyTotals = {};

  expenses.forEach((expense) => {
    const month = moment(expense.date).format("MMM YYYY"); // e.g., "Apr 2025"
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = 0;
    }
    monthlyTotals[month] += parseFloat(expense.amount);
  });

  const monthlyDataset = Object.entries(monthlyTotals)
    .map(([month, total]) => ({
      month,
      total,
      dateObj: moment(month, "MMM YYYY").toDate(),
    }))
    .sort((a, b) => a.dateObj - b.dateObj)
    .map(({ month, total }) => ({
      month,
      total,
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
        mb: 1,
      }}
    >
      <Typography variant="h6" sx={{ color: "#666", mb: 3 }}>
        Amount of Expenses per Month in ($)
      </Typography>
      <Stack direction="column" spacing={2} alignItems="center">
        <BarChart
          dataset={monthlyDataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            {
              dataKey: "total",
              label: "Monthly Expenses",
              color: "rgba(57, 73, 171, 0.85)", // same purple-blue tone
              barSize: 20,
            },
          ]}
          height={300}
          width={650}
          slotProps={{
            legend: {
              direction: "horizontal",
              position: { vertical: "bottom", horizontal: "center" },
            },
          }}
          borderRadius={4}
        />
      </Stack>
    </Paper>
  );
}
