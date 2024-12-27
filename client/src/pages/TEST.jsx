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
  const data = location.state;
  console.log(data);
  const waterFootprintIdeal = data[2];
  const waterFootprintFarmer = data[0];
  const ccIdeal = data[3];
  const ccFarmer = data[1];
  const yieldIdeal = data[5];
  const yieldFarmer = data[4];
  const tableDataIdeal = data[7] || [];
  const tableDataFarmer = data[6] || [];

  const labels = Array.from(
    { length: ccIdeal.length },
    (_, i) => `Day ${i + 1}`
  );

  // Data for canopy development line chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Canopy Development (Ideal)",
        data: ccIdeal,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
      {
        label: "Canopy Development (Farmer's Info)",
        data: ccFarmer,
        borderColor: "#f44336",
        backgroundColor: "rgba(244, 67, 54, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex flex-col  gap-6 py-8 px-24 bg-gray-100 min-h-screen">
      {/* Ideal Crop Values Section */}
      <div className="flex flex-col w-full px-21 justify-center items-center">
        <h3 className="text-3xl font-semibold mb-2 pb-4">Crop Development</h3>
        <Line data={chartData} options={{ responsive: true }} />
      </div>
      <div className="flex flex-row gap-8">
        {" "}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Ideal Crop Values</h2>
          <ul className="list-disc pl-5 mb-6">
            <li>Water Usage: {waterFootprintIdeal.toFixed(2)} liters</li>
            <li>Yield: {yieldIdeal.toFixed(2)} kg/ha</li>
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
                  <td className="border font-medium px-4 py-2">{row.day}</td>
                  <td className="border font-medium px-4 py-2">{row.month}</td>
                  <td className="border font-medium px-4 py-2">{row.dap}</td>
                  <td className="border font-medium` px-4 py-2">{row.irri}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Farmer's Crop Information Section */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Farmer's Crop Information
          </h2>
          <ul className="list-disc pl-5 mb-6">
            <li>Water Usage: {waterFootprintFarmer.toFixed(2)} liters</li>
            <li>Yield: {yieldFarmer.toFixed(2)} kg/ha</li>
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
                  <td className="border px-4 py-2">{row.day}</td>
                  <td className="border px-4 py-2">{row.month}</td>
                  <td className="border px-4 py-2">{row.dap}</td>
                  <td className="border px-4 py-2">{row.irri}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FarmerResult;
