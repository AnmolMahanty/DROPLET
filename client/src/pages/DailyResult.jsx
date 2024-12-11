// import React from "react";
// import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// import { useLocation } from "react-router-dom";


// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const useStyles = makeStyles({
//   root: {
//     backgroundColor: "#f5f5f5",
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "20px",
//   },
//   card: {
//     width: "100%",
//     maxWidth: 800,
//     borderRadius: "12px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//     marginBottom: "20px",
//   },
//   header: {
//     backgroundColor: "#3f51b5",
//     color: "#fff",
//     padding: "10px 20px",
//     textAlign: "center",
//     borderTopLeftRadius: "12px",
//     borderTopRightRadius: "12px",
//   },
//   value: {
//     color: "#3f51b5",
//     fontWeight: "bold",
//   },
//   chartContainer: {
//     padding: "20px",
//   },
// });

// const WaterFootprintComparison = ({
//   personUsage,
//   householdUsage,
//   avgPersonUsage,
//   avgHouseholdUsage,
//   breakdown,
// }) => {
//   const classes = useStyles();

//   // Data for the bar chart
//   const data = {
//     labels: ["Drinking and Cooking", "Bathing", "Laundry", "Cleaning Utensils"],
//     datasets: [
//       {
//         label: "Your Usage (liters)",
//         data: breakdown.map((item) => item.usage),
//         backgroundColor: "#3f51b5",
//       },
//       {
//         label: "Average Usage (liters)",
//         data: breakdown.map((item) => item.avgUsage),
//         backgroundColor: "#ff5722",
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Water Usage Comparison by Activity" },
//     },
//   };

//   return (
//     <Box className={classes.root}>
//       {/* Summary Card */}
//       <Card className={classes.card}>
//         <Typography variant="h5" className={classes.header}>
//           Daily Water Footprint Summary
//         </Typography>
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="h6">
//                 Your Water Usage (Person):{" "}
//                 <span className={classes.value}>{personUsage} liters</span>
//               </Typography>
//               <Typography variant="h6">
//                 Average Water Usage (Person):{" "}
//                 <span className={classes.value}>{avgPersonUsage} liters</span>
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="h6">
//                 Your Water Usage (Household):{" "}
//                 <span className={classes.value}>{householdUsage} liters</span>
//               </Typography>
//               <Typography variant="h6">
//                 Average Water Usage (Household):{" "}
//                 <span className={classes.value}>{avgHouseholdUsage} liters</span>
//               </Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Breakdown Chart */}
//       <Card className={classes.card}>
//         <CardContent className={classes.chartContainer}>
//           <Bar data={data} options={options} />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// // Sample usage
// const DailyResult = () => {
//   const location=useLocation();
//   const data=location.state;
//   console.log(data);
//   let answers=data;

//   let total = 0;
//   let drinking = 0;

//   if (answers[0] === "Once per day") {
//     drinking += 4; // 4 liters per day
//   } else if (answers[0] === "Twice per day") {
//     drinking += 6; // 6 liters per day
//   } else if (answers[0] === "After every meal or multiple times per day") {
//     drinking += 8; // 8 liters per day
//   }

//   total += drinking;
//   if (answers[1] === "Yes") {
//     total -= 1; // Assume 1 liters saved in a day
//   }
//   let bathing=0;

//   if (answers[2] === "1 bucket") {
//     bathing += 15; // 15 liters per bath
//   } else if (answers[2] === "2 buckets") {
//     bathing += 30; // 30 liters per bath
//   } else if (answers[2] === "More than 2 buckets") {
//     bathing += 45; // 45 liters per bath
//   }

//   if (answers[3] === "Less than 5 minutes") {
//     bathing += 50; // 50 liters per shower
//   } else if (answers[3] === "5–10 minutes") {
//     bathing += 100; // 100 liters per shower
//   } else if (answers[3] === "More than 10 minutes") {
//     bathing += 150; // 150 liters per shower
//   }

//   total += bathing;
//   if (answers[4] === "Yes") {
//     total -= 15;
//   }

//   let utensils = 0;
//   if (answers[5] === "After every meal") {
//     utensils += 45; // 30 liters per day
//   } else if (answers[5] === "Twice") {
//     utensils += 35; // 20 liters per day
//   } else if (answers[5] === "Once") {
//     utensils += 18; // 15 liters per day
//   }

//   if (answers[6] === "By Hand") {
//     utensils *= 2.5;
//   } else if (answers[6] === "Dishwasher") {
//     utensils *= 1;
//   }
//   let laundryWater = 0;
//   if (answers[7] === "Hand Washing") {
//     laundryWater += 30; // 30 liters per wash
//   } else if (answers[7] === "Semi-Automatic Washing Machine") {
//     laundryWater += 60; // 60 liters per wash
//   } else if (answers[7] === "Fully Automatic Washing Machine") {
//     laundryWater += 100; // 100 liters per wash
//   }
//   if (answers[8] === "1–2 times") {
//     laundryWater *= 2; // 2 washes per week (total for 7 days)
//   } else if (answers[8] === "3–5 times") {
//     laundryWater *= 4; // 4 washes per week
//   } else if (answers[8] === "More than 5 times") {
//     laundryWater *= 6; // 6 washes per week
//   }

//   total += laundryWater;

//   if (answers[9] === "Daily") {
//     total += 5; // 5 liters per day
//   } else if (answers[9] === "Every Alternate Day") {
//     total += 3; // 3 liters every alternate day (convert to daily)
//   } else if (answers[9] === "Weekly") {
//     total += 2 / 7; // 2 liters per week (convert to daily)
//   }

//   if (answers[10] === "Yes, Daily") {
//     total += 20; // 20 liters per day
//   } else if (answers[10] === "Yes, Weekly") {
//     total += 70 / 7; // 20 liters per week (convert to daily)
//   } else if (answers[10] === "Yes, Monthly") {
//     total += 100 / 30; // 4 liters per month (convert to daily)
//   }

//   if (answers[11] === "Yes, Daily") {
//     total += 15; // 20 liters per day
//   } else if (answers[11] === "Yes, Weekly") {
//     total += 30 / 7; // 20 liters per week (convert to daily)
//   } else if (answers[11] === "Yes, Monthly") {
//     total += 50 / 30; // 4 liters per month (convert to daily)
//   }
//   let AvgPersonusage=0;
//   if (answers[12] === "Yes") {
//     total += 50 / 7; // 50 liters per week (convert to daily)
//   }else if (answers[12] === "No") {
//     total += 0; // 0 liters per week (convert to daily)
    
//   }
//   AvgPersonusage +=total;

//   if (answers[13] === "Yes") {
//     total += 5; // 5 liters per day for pets
//   }

//   if (answers[14]) {
//     total = Number(answers[14]) * total;
//   }

//   if (answers[15] === "Urban Area") {
//     total *= 1.2;
//   }



//   // Replace these with your calculated values
//   const personUsage = AvgPersonusage;
//   const householdUsage = answers[14] * AvgPersonusage;
//   const avgPersonUsage = 170;
//   const avgHouseholdUsage =answers[14] * 170;

//   const breakdown = [
//     { name: "Drinking and Cooking", usage:drinking, avgUsage: 50 },
//     { name: "Bathing", usage: bathing, avgUsage: 80 },
//     { name: "Laundry", usage: laundryWater, avgUsage: 40 },
//     { name: "Cleaning Utensils", usage: utensils, avgUsage: 20 },
//   ];

//   return (
//     <WaterFootprintComparison
//       personUsage={personUsage}
//       householdUsage={householdUsage}
//       avgPersonUsage={avgPersonUsage}
//       avgHouseholdUsage={avgHouseholdUsage}
//       breakdown={breakdown}
//     />
//   );
// };

// export default DailyResult;

import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useLocation } from "react-router-dom";

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
const DailyResult = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  let answers = data;
  let total = 0;
  let drinking = 0;

  // Drinking and Cooking Calculation
  if (answers[0] === "Once per day") {
    drinking += 4; // 4 liters per day
  } else if (answers[0] === "Twice per day") {
    drinking += 6; // 6 liters per day
  } else if (answers[0] === "After every meal or multiple times per day") {
    drinking += 8; // 8 liters per day
  }

  total += drinking;
  if (answers[1] === "Yes") {
    total -= 1; // Assume 1 liter saved in a day
  }

  // Bathing Calculation
  let bathing = 0;
  if (answers[2] === "1 bucket") {
    bathing += 15; // 15 liters per bath
  } else if (answers[2] === "2 buckets") {
    bathing += 30; // 30 liters per bath
  } else if (answers[2] === "More than 2 buckets") {
    bathing += 45; // 45 liters per bath
  }

  if (answers[3] === "Less than 5 minutes") {
    bathing += 50; // 50 liters per shower
  } else if (answers[3] === "5–10 minutes") {
    bathing += 100; // 100 liters per shower
  } else if (answers[3] === "More than 10 minutes") {
    bathing += 150; // 150 liters per shower
  }

  total += bathing;
  if (answers[4] === "Yes") {
    total -= 15;
  }

  // Utensils Calculation
  let utensils = 0;
  if (answers[5] === "After every meal") {
    utensils += 45; // 45 liters per day
  } else if (answers[5] === "Twice") {
    utensils += 35; // 35 liters per day
  } else if (answers[5] === "Once") {
    utensils += 18; // 18 liters per day
  }

  if (answers[6] === "By Hand") {
    utensils *= 2.5;
  } else if (answers[6] === "Dishwasher") {
    utensils *= 1;
  }

  // Laundry Calculation
  let laundryWater = 0;
  if (answers[7] === "Hand Washing") {
    laundryWater += 30; // 30 liters per wash
  } else if (answers[7] === "Semi-Automatic Washing Machine") {
    laundryWater += 60; // 60 liters per wash
  } else if (answers[7] === "Fully Automatic Washing Machine") {
    laundryWater += 100; // 100 liters per wash
  }
  if (answers[8] === "1–2 times") {
    laundryWater *= 2; // 2 washes per week (total for 7 days)
  } else if (answers[8] === "3–5 times") {
    laundryWater *= 4; // 4 washes per week
  } else if (answers[8] === "More than 5 times") {
    laundryWater *= 6; // 6 washes per week
  }

  total += laundryWater;

  // Other calculations
  if (answers[9] === "Daily") {
    total += 5; // 5 liters per day
  } else if (answers[9] === "Every Alternate Day") {
    total += 3; // 3 liters every alternate day
  } else if (answers[9] === "Weekly") {
    total += 2 / 7; // 2 liters per week (convert to daily)
  }

  if (answers[10] === "Yes, Daily") {
    total += 20; // 20 liters per day
  } else if (answers[10] === "Yes, Weekly") {
    total += 70 / 7; // 70 liters per week
  } else if (answers[10] === "Yes, Monthly") {
    total += 100 / 30; // 100 liters per month
  }

  if (answers[11] === "Yes, Daily") {
    total += 15; // 15 liters per day
  } else if (answers[11] === "Yes, Weekly") {
    total += 30 / 7; // 30 liters per week
  } else if (answers[11] === "Yes, Monthly") {
    total += 50 / 30; // 50 liters per month
  }

  // Check for person usage average
  let avgPersonUsage = 0;
  if (answers[12] === "Yes") {
    total += 50 / 7; // 50 liters per week
  } else if (answers[12] === "No") {
    total += 0; // No usage for water
  }

  avgPersonUsage += total;

  // Handle multiplier for household
  const householdMultiplier = Number(answers[14]) || 1; // Default to 1 if not a valid number
  const householdUsage = householdMultiplier * avgPersonUsage;
  const avgHouseholdUsage = householdMultiplier * 170;

  // Breakdown data
  const breakdown = [
    { name: "Drinking and Cooking", usage: drinking, avgUsage: 50 },
    { name: "Bathing", usage: bathing, avgUsage: 80 },
    { name: "Laundry", usage: laundryWater, avgUsage: 40 },
    { name: "Cleaning Utensils", usage: utensils, avgUsage: 20 },
  ];

  return (
    <WaterFootprintComparison
      personUsage={total}
      householdUsage={householdUsage}
      avgPersonUsage={avgPersonUsage}
      avgHouseholdUsage={avgHouseholdUsage}
      breakdown={breakdown}
    />
  );
};

export default DailyResult;
