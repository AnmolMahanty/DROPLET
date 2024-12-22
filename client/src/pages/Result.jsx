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

const Result = () => {
  const location = useLocation();
  const { data } = location.state || {};

  const parseIngredientsWaterFootprint = () => {
    if (!data?.Ingredientswaterfootprint) return [];

    if (Array.isArray(data.Ingredientswaterfootprint)) {
      return data.Ingredientswaterfootprint;
    }

    return Object.entries(data.Ingredientswaterfootprint).map(
      ([ingredientName, ingredientFootprint]) => ({
        ingredientName,
        ingredientFootprint,
      })
    );
  };

  const parseAlternativeRecommendations = () => {
    if (!data?.Alternativerecommendations) return [];

    const alternatives = Array.isArray(data.Alternativerecommendations)
      ? data.Alternativerecommendations
      : [data.Alternativerecommendations];

    return alternatives.map((alt) => ({
      DishName: alt.DishName || "Unknown Dish",
      TotalWaterFootprint:
        alt.TotalWaterFootprint ||
        alt.Totalwaterfootprint ||
        alt["Total Water Footprint"] ||
        "N/A",
    }));
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <p className="text-xl text-gray-600 text-center">
          No result data available
        </p>
      </div>
    );
  }

  const ingredients = parseIngredientsWaterFootprint();
  const alternativeDishes = parseAlternativeRecommendations();

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Dish Water Footprint and Ingredients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Dish Water Footprint Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Waves className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                Dish Water Footprint
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-base md:text-lg font-semibold">
                  {data.DishName || "Unknown Dish"}
                </span>
                <span className="text-base md:text-lg">
                  {data.Totalwaterfootprint || "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients Water Footprint Card */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Droplet className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
                Ingredients Water Footprint
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {ingredients.length > 0 ? (
                  <Table className="w-full text-sm md:text-base">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ingredient</TableHead>
                        <TableHead className="text-right">
                          Water Footprint
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ingredients.map((ingredient, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium truncate">
                            {ingredient.ingredientName || "Unknown"}
                          </TableCell>
                          <TableCell className="text-right">
                            {ingredient.ingredientFootprint || "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-gray-500 text-xs md:text-sm text-center">
                    No ingredient details available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Alternative Dishes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Alternative Dishes
          </h2>
          {alternativeDishes.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {alternativeDishes.map((altDish, index) => (
                <Card key={index} className="w-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-base md:text-lg">
                      <span className="truncate mr-2">{altDish.DishName}</span>
                      <Droplet
                        className={`h-4 w-4 md:h-5 md:w-5 ${
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
                    <div className="flex items-center justify-between text-sm md:text-base">
                      <span className="text-gray-600">Water Footprint:</span>
                      <span className="text-base md:text-lg font-semibold">
                        {altDish.TotalWaterFootprint} liters
                      </span>
                    </div>
                    <div className="mt-2 md:mt-4 bg-gray-200 h-1.5 md:h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          index === 0
                            ? "bg-blue-500"
                            : index === 1
                            ? "bg-blue-400"
                            : "bg-blue-300"
                        }`}
                        style={{
                          width: `${
                            altDish.TotalWaterFootprint &&
                            data.Totalwaterfootprint &&
                            parseFloat(data.Totalwaterfootprint) > 0
                              ? (parseFloat(altDish.TotalWaterFootprint) /
                                  parseFloat(data.Totalwaterfootprint)) *
                                100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-xs md:text-sm text-center">
              No alternative dishes available
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Result;
