import React from "react";
import { motion } from "framer-motion";
import { Droplet, Waves } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocation } from "react-router-dom";

const ingredients = [
  { name: "Chicken", amount: "500g" },
  { name: "Yogurt", amount: "200ml" },
  { name: "Tomato Puree", amount: "400g" },
  { name: "Heavy Cream", amount: "200ml" },
  { name: "Garam Masala", amount: "2 tbsp" },
  { name: "Turmeric", amount: "1 tsp" },
  { name: "Cumin", amount: "1 tsp" },
  { name: "Coriander", amount: "1 tsp" },
  { name: "Ginger", amount: "1 tbsp" },
  { name: "Garlic", amount: "3 cloves" },
];

const waterFootprintDishes = [
  { name: "Chicken Tikka Masala", waterFootprint: 1600 },
  { name: "Vegetable Biryani", waterFootprint: 1100 },
  { name: "Palak Paneer", waterFootprint: 900 },
];

const Result = () => {
  const location = useLocation();
  const resultData = location.state.data;
  console.log(resultData);
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row items-start justify-start w-full gap-6 mb-6"
      >
        <div className="relative w-full lg:w-2/3 aspect-video bg-slate-100 rounded-lg overflow-hidden">
          <img
            src="\src\assets\Chicken.jpg"
            alt="Chicken Tikka Masala"
            layout="fill"
            objectfit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-3xl font-bold mb-2">{resultData.DishName}</h1>
            <div className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-blue-400" />
              <span>Water Footprint: {resultData.Totalwaterfootprint}</span>
            </div>
          </div>
        </div>
        <Card className="w-full lg:w-1/3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-blue-500" />
              Ingredients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ingredient</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resultData.Ingredientswaterfootprint.map(
                    (ingredient, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {ingredient.ingredientName}
                        </TableCell>
                        <TableCell className="text-right">
                          {ingredient.ingredientFootprint}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Water Footprint Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resultData.Alternativerecommendations.map((altDish, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{altDish.DishName}</span>
                  <Droplet
                    className={`h-5 w-5 ${
                      index === 0
                        ? "text-blue-500"
                        : index === 1
                        ? "text-blue-400"
                        : "text-blue-300"
                    }`}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Water Footprint:</span>
                  <span className="text-lg font-semibold">
                    {altDish.Totalwaterfootprint} liters
                  </span>
                </div>
                <div className="mt-4 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      index === 0
                        ? "bg-blue-500"
                        : index === 1
                        ? "bg-blue-400"
                        : "bg-blue-300"
                    }`}
                    style={{
                      width: `${(altDish.Totalwaterfootprintt / 1600) * 100}%`,
                    }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Result;
