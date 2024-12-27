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
import { useState, useEffect } from "react";

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
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const FarmerResult = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const [loading, setLoading] = useState(false);
  const [llmloading, setLlmLoading] = useState(true);
  const [llmData, setLlmData] = useState();

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

  const llmResponse = async () => {
    try {
      setLoading(true);
      setLlmLoading(true);

      const prompt = `Given the following:
        Ideal Values: ${JSON.stringify(tableDataIdeal)}
        Farmer Values: ${JSON.stringify(tableDataFarmer)}
        Analyze the data and respond as if you are directly talking to the farmer. 
        Provide:
        Recommendations (2-4 actionable steps) to help you improve your yield and reduce water usage.
        Keep the response generalized and straightforward, avoiding overly detailed or technical explanations.
        
        Rule: The response must be in valid JSON format like this:
        {
          "recommendations": [
            {
              "step": "string",
              "description": "string"
            }
          ]
        }`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Extract JSON from response if needed
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : text;

      try {
        const parsedData = JSON.parse(jsonStr);
        if (!parsedData?.recommendations?.length) {
          throw new Error("Invalid response format");
        }
        setLlmData(parsedData);
        console.log("LLM Response:", parsedData);
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        setLlmData({ recommendations: [] }); // Set default empty state instead of null
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setLlmData({ recommendations: [] }); // Set default empty state instead of null
    } finally {
      setLoading(false);
      setLlmLoading(false);
    }
  };

  useEffect(() => {
    if (tableDataIdeal && tableDataFarmer) {
      llmResponse();
    }
  }, []);

  return (
    <div className="flex flex-col  gap-6 py-8 px-24 bg-gray-100 min-h-screen">
      {/* Ideal Crop Values Section */}
      <div className="flex flex-col w-full px-21 justify-center items-center">
        <h3 className="text-3xl font-semibold mb-2 pb-4">Canopy Development</h3>
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
      {llmloading ? (
        <p className="text-gray-600 text-base">Generating LLM Response</p>
      ) : (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
          <ul className="space-y-4">
            {llmData?.recommendations?.map((rec) => (
              <li
                key={rec.step}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <h3 className="text-lg font-bold">{rec.step}</h3>
                <p className="text-gray-700">{rec.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default FarmerResult;