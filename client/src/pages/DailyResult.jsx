import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: 800,
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    marginBottom: "20px",
  },
  header: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    padding: "10px 20px",
    textAlign: "center",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
  },
  value: {
    color: "#3f51b5",
    fontWeight: "bold",
  },
  chartContainer: {
    padding: "20px",
  },
});

const WaterFootprintComparison = ({
  personUsage,
  householdUsage,
  avgPersonUsage,
  avgHouseholdUsage,
  breakdown,
}) => {
  const classes = useStyles();

  // Data for the bar chart
  const data = {
    labels: ["Drinking and Cooking", "Bathing", "Laundry", "Cleaning Utensils"],
    datasets: [
      {
        label: "Your Usage (liters)",
        data: breakdown.map((item) => item.usage),
        backgroundColor: "#3f51b5",
      },
      {
        label: "Average Usage (liters)",
        data: breakdown.map((item) => item.avgUsage),
        backgroundColor: "#ff5722",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Water Usage Comparison by Activity" },
    },
  };

  return (
    <Box className={classes.root}>
      {/* Summary Card */}
      <Card className={classes.card}>
        <Typography variant="h5" className={classes.header}>
          Daily Water Footprint Summary
        </Typography>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">
                Your Water Usage (Person):{" "}
                <span className={classes.value}>{personUsage} liters</span>
              </Typography>
              <Typography variant="h6">
                Average Water Usage (Person):{" "}
                <span className={classes.value}>{avgPersonUsage} liters</span>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">
                Your Water Usage (Household):{" "}
                <span className={classes.value}>{householdUsage} liters</span>
              </Typography>
              <Typography variant="h6">
                Average Water Usage (Household):{" "}
                <span className={classes.value}>{avgHouseholdUsage} liters</span>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Breakdown Chart */}
      <Card className={classes.card}>
        <CardContent className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </CardContent>
      </Card>
    </Box>
  );
};

// Sample usage
const App = () => {
  // Replace these with your calculated values
  const personUsage = 150;
  const householdUsage = 450;
  const avgPersonUsage = 170;
  const avgHouseholdUsage = 500;

  const breakdown = [
    { name: "Drinking and Cooking", usage: 40, avgUsage: 50 },
    { name: "Bathing", usage: 70, avgUsage: 80 },
    { name: "Laundry", usage: 30, avgUsage: 40 },
    { name: "Cleaning Utensils", usage: 10, avgUsage: 20 },
  ];

  return (
    <WaterFootprintComparison
      personUsage={personUsage}
      householdUsage={householdUsage}
      avgPersonUsage={avgPersonUsage}
      avgHouseholdUsage={avgHouseholdUsage}
      breakdown={breakdown}
    />
  );
};

export default App;