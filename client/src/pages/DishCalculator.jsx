import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UploadCloud,
  Search,
  Droplet,
  Leaf,
  TrendingUp,
  Info,
} from "lucide-react";

const DishCalculator = () => {
  const [file, setFile] = useState(null);
  const products = [
    { product: "Sandwich", waterFootprint: "150 liters", date: "2024-11-25" },
    { product: "Paneer", waterFootprint: "250 liters", date: "2024-11-26" },
    { product: "Apple", waterFootprint: "50 liters", date: "2024-11-27" },
    { product: "Chole Puri", waterFootprint: "300 liters", date: "2024-11-28" },
    { product: "Kheer", waterFootprint: "800 liters", date: "2024-11-29" },
    { product: "Veg Burger", waterFootprint: "200 liters", date: "2024-11-30" },
    { product: "Biryani", waterFootprint: "500 liters", date: "2024-12-01" },
    { product: "Wada pav", waterFootprint: "150 liters", date: "2024-11-25" },
    {
      product: "Paneer Tikka",
      waterFootprint: "250 liters",
      date: "2024-11-26",
    },
    { product: "Apple juice", waterFootprint: "50 liters", date: "2024-11-27" },
    {
      product: "Chicken Tikka",
      waterFootprint: "300 liters",
      date: "2024-11-28",
    },
  ];

  const waterSavingTips = [
    {
      tip: "Choose Plant-Based Options",
      description:
        "Plant-based foods generally have a lower water footprint than animal products.",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
    },
    {
      tip: "Seasonal Eating",
      description:
        "Opt for seasonal produce to reduce the water footprint from greenhouse cultivation.",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
    },
    {
      tip: "Local Sourcing",
      description:
        "Choose locally sourced ingredients to minimize water used in transportation.",
      icon: <Info className="h-5 w-5 text-purple-500" />,
    },
  ];

  return (
    <div className=" container flex flex-col justify-center mx-auto p-6 space-y-6 min-h-[calc(100vh-64px)]">
      <div className="grid gap-6 md:grid-cols-2 justify-center h-full w-full max-w-[1280px]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-blue-500" />
              Your Water Footprint History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add `max-h` and `overflow-y-auto` to make it scrollable */}
            <div className="max-h-72 overflow-y-auto scrollbar-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Products</TableHead>
                    <TableHead className="text-right">
                      Water Footprint
                    </TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.product}>
                      <TableCell className="font-medium">
                        {product.product}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.waterFootprint}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-green-500" />
              Dish Footprint
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Calculate the water footprint of any dishes or products by
              entering a name or uploading a photo.
            </p>

            <div className="space-y-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input id="product-name" placeholder="Type name of the product" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors duration-300 cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setFile(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <UploadCloud className="h-10 w-10 text-muted-foreground mb-2 mx-auto" />
              <p className="text-sm text-muted-foreground mb-1">
                {file
                  ? file.name
                  : "Drag & drop an image of the dish here, or click to upload"}
              </p>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    setFile(file);
                    console.log("Uploaded file:", file);
                  } else {
                    console.error("No file uploaded or invalid input");
                  }
                }}
              />
              {file && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                  Remove file
                </Button>
              )}
            </div>
            <Button className="w-full bg-blue-950">
              Calculate Water Footprint
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {waterSavingTips.map((tip, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                {tip.icon}
                {tip.tip}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DishCalculator;
