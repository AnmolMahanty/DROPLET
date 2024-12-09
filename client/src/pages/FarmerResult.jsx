import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const FarmerResult = () => {
  const location = useLocation();
  const data = location.state?.ideal ? { ideal: location.state.ideal } : { ideal: [20, 60, 60, 80] };

  // Data for canopy development line chart
  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Canopy Development (Ideal)",
        data: data.ideal,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
      {
        label: "Canopy Development (Farmer's Info)",
        data: [15, 35, 55, 75],
        borderColor: "#f44336",
        backgroundColor: "rgba(244, 67, 54, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const tableDataIdeal = [
    { date: "01", month: "Jan", dpa: 5, irrigation: 10 },
    { date: "02", month: "Jan", dpa: 4, irrigation: 8 },
  ];

  const tableDataFarmer = [
    { date: "01", month: "Jan", dpa: 6, irrigation: 12 },
    { date: "02", month: "Jan", dpa: 5, irrigation: 10 },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      <p>hello world</p>
      {/* Ideal Crop Values Section */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Ideal Crop Values</h2>
        <ul className="list-disc pl-5 mb-6">
          <li>Water Usage: 50 liters</li>
          <li>Yield: 500 kg/ha</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Irrigation Events</h3>
        <table className="w-full border border-gray-200 text-left mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Month</th>
              <th className="border px-4 py-2">DPA</th>
              <th className="border px-4 py-2">Irrigation (mm)</th>
            </tr>
          </thead>
          <tbody>
            {tableDataIdeal.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{row.date}</td>
                <td className="border px-4 py-2">{row.month}</td>
                <td className="border px-4 py-2">{row.dpa}</td>
                <td className="border px-4 py-2">{row.irrigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="text-xl font-semibold mb-2">Canopy Development</h3>
        <Line data={chartData} options={{ responsive: true }} />
      </div>

      {/* Farmer's Crop Information Section */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Farmer's Crop Information</h2>
        <ul className="list-disc pl-5 mb-6">
          <li>Water Usage: 55 liters</li>
          <li>Yield: 480 kg/ha</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Irrigation Events</h3>
        <table className="w-full border border-gray-200 text-left mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Month</th>
              <th className="border px-4 py-2">DPA</th>
              <th className="border px-4 py-2">Irrigation (mm)</th>
            </tr>
          </thead>
          <tbody>
            {tableDataFarmer.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{row.date}</td>
                <td className="border px-4 py-2">{row.month}</td>
                <td className="border px-4 py-2">{row.dpa}</td>
                <td className="border px-4 py-2">{row.irrigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="text-xl font-semibold mb-2">Canopy Development</h3>
        <Line data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default FarmerResult;