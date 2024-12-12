import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function WaterUsageForm() {
  const [formData, setFormData] = useState({
    // New fields added
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    productName: "",
    productImage: null,

    // Existing fields from previous version
    beverageType: "",
    annualProduction: "",
    annualWaterUsage: "",
    waterSources: [],
    trackIndividualProcesses: false,
    waterUsageByProcess: {
      ingredientSourcing: "",
      processing: "",
      packaging: "",
      cleaningAndMaintenance: "",
      other: "",
    },
    hasRecyclingSystem: false,
    recycledWaterPercentage: "",
    usesWaterMeters: false,
    implementsRainwaterHarvesting: false,
    rainwaterHarvestedVolume: "",
    advancedWaterSavingTechniques: [],
    // documents: {
    //   annualWaterUsageReport: null,
    //   waterSavingMeasuresEvidence: null,
    //   productWaterFootprintReports: null,
    // },
    timestamp: new Date().toISOString(),

    totalScore: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const handleCheckboxChange = (name) => (checked) => {
    if (
      name === "trackIndividualProcesses" ||
      name === "hasRecyclingSystem" ||
      name === "usesWaterMeters" ||
      name === "implementsRainwaterHarvesting"
    ) {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), name]
          : (prev[name] || []).filter((item) => item !== name),
      }));
    }
  };

  const handleProcessInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      waterUsageByProcess: { ...prev.waterUsageByProcess, [name]: value },
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  function calculateTotalScore(e) {
    e.preventDefault();
    let efficiencyScore = 0;
    let recyclingScore = 0;
    let savingMeasuresScore = 0;
    console.log("hello World");
    // Water efficiency score calculation
    const industryBenchmarkUsage = 2; // Example benchmark (liters/unit)
    const actualEfficiency =
      formData.annualWaterUsage / formData.annualProduction; // Assuming volume is provided
    efficiencyScore = (industryBenchmarkUsage / actualEfficiency) * 0.4;
    // Water recycling score calculation
    const recycledWaterPercentage = parseFloat(
      formData.recycledWaterPercentage || 0
    );
    recyclingScore = (recycledWaterPercentage / 100) * 0.3;

    // Water-saving measures score calculation
    // if (formData.rainwaterHarvesting === "Yes") {
    //   savingMeasuresScore += 0.1; // Example bonus for rainwater harvesting
    // }
    // if (formData.advancedTechniques) {
    //   savingMeasuresScore += 0.1; // Example bonus for advanced water-saving techniques
    // }

    // // Documentation score calculation
    // if (formData.documentsUpload) {
    //   documentationScore = 0.1; // Fixed value for document verification
    // }
    // Total score
    formData.totalScore =
      efficiencyScore + recyclingScore + savingMeasuresScore;
    // documentationScore;

    console.log(formData.totalScore);
    navigate("/certificateprogress", { state: formData.totalScore });
  }

  // Rest of the component remains exactly the same as in the original code
  return (
    <form
      // method="POST"
      // encType="multipart/form-data"

      onSubmit={calculateTotalScore}
      className="space-y-8 max-w-4xl mx-auto p-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            Water Usage Assessment Form
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. General Information
            </h2>
            <div className="space-y-4">
              {/* New fields added */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="companyName" className="text-sm font-medium">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="companyEmail" className="text-sm font-medium">
                    Company Email
                  </Label>
                  <Input
                    id="companyEmail"
                    name="companyEmail"
                    type="email"
                    placeholder="Enter company email"
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productName" className="text-sm font-medium">
                    Product Name
                  </Label>
                  <Input
                    id="productName"
                    name="productName"
                    placeholder="Enter product name"
                    value={formData.productName}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                {/* <div>
                  <Label htmlFor="productImage" className="text-sm font-medium">
                    Product Image
                  </Label>
                  <Input
                    id="productImage"
                    name="productImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1"
                  />
                </div> */}
              </div>

              {/* Existing beverage type and production fields */}
              <div className="bg-secondary/10 p-4 rounded-lg">
                <Label className="text-lg font-medium mb-2 block">
                  What is the primary type of beverage your company produces?
                </Label>
                <RadioGroup
                  name="beverageType"
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, beverageType: value }))
                  }
                  className="grid grid-cols-2 gap-2"
                >
                  {[
                    "softDrinks",
                    "bottledWater",
                    "juices",
                    "alcoholicBeverages",
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={type} />
                      <Label htmlFor={type} className="capitalize">
                        {type.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="annualProduction"
                    className="text-sm font-medium"
                  >
                    Total annual production volume
                  </Label>
                  <Input
                    id="annualProduction"
                    name="annualProduction"
                    placeholder="Enter volume in liters or units"
                    value={formData.annualProduction}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="annualWaterUsage"
                    className="text-sm font-medium"
                  >
                    Total annual water usage
                  </Label>
                  <Input
                    id="annualWaterUsage"
                    name="annualWaterUsage"
                    placeholder="Enter volume in liters"
                    value={formData.annualWaterUsage}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Process-Specific Water Usage
            </h2>
            <div className="space-y-4">
              <div>
                <Label className="text-lg font-medium mb-2 block">
                  Does your company track water usage for individual production
                  processes?
                </Label>
                <RadioGroup
                  name="trackIndividualProcesses"
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      trackIndividualProcesses: value === "yes",
                    }))
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="track-yes" />
                    <Label htmlFor="track-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="track-no" />
                    <Label htmlFor="track-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.trackIndividualProcesses && (
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <Label className="font-semibold block">
                      Please specify the water usage (in liters) for each of the
                      following processes:
                    </Label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {Object.entries(formData.waterUsageByProcess).map(
                        ([key, value]) => (
                          <div key={key}>
                            <Label
                              htmlFor={key}
                              className="text-sm font-medium capitalize"
                            >
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </Label>
                            <Input
                              id={key}
                              name={key}
                              placeholder="Enter volume in liters"
                              value={value}
                              onChange={handleProcessInputChange}
                              className="mt-1"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Water Recycling and Reuse
            </h2>
            <div className="space-y-4">
              <div>
                <Label className="text-lg font-medium mb-2 block">
                  Does your facility have a water recycling or reuse system in
                  place?
                </Label>
                <RadioGroup
                  name="hasRecyclingSystem"
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      hasRecyclingSystem: value === "yes",
                    }))
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="recycle-yes" />
                    <Label htmlFor="recycle-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="recycle-no" />
                    <Label htmlFor="recycle-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.hasRecyclingSystem && (
                <Card>
                  <CardContent className="pt-6">
                    <Label
                      htmlFor="recycledWaterPercentage"
                      className="text-sm font-medium"
                    >
                      What percentage of your total water usage is recycled or
                      reused?
                    </Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Input
                        id="recycledWaterPercentage"
                        name="recycledWaterPercentage"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Enter percentage"
                        value={formData.recycledWaterPercentage}
                        onChange={handleInputChange}
                        className="w-24"
                      />
                      <span>%</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Water-Saving Measures
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-lg font-medium mb-2 block">
                    Does your company monitor water usage with water meters?
                  </Label>
                  <RadioGroup
                    name="usesWaterMeters"
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        usesWaterMeters: value === "yes",
                      }))
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="meters-yes" />
                      <Label htmlFor="meters-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="meters-no" />
                      <Label htmlFor="meters-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label className="text-lg font-medium mb-2 block">
                    Does your facility implement rainwater harvesting?
                  </Label>
                  <RadioGroup
                    name="implementsRainwaterHarvesting"
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        implementsRainwaterHarvesting: value === "yes",
                      }))
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="rainwater-yes" />
                      <Label htmlFor="rainwater-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="rainwater-no" />
                      <Label htmlFor="rainwater-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {formData.implementsRainwaterHarvesting && (
                <Card>
                  <CardContent className="pt-6">
                    <Label
                      htmlFor="rainwaterHarvestedVolume"
                      className="text-sm font-medium"
                    >
                      What is the annual volume of rainwater harvested?
                    </Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Input
                        id="rainwaterHarvestedVolume"
                        name="rainwaterHarvestedVolume"
                        type="number"
                        min="0"
                        placeholder="Enter volume"
                        value={formData.rainwaterHarvestedVolume}
                        onChange={handleInputChange}
                        className="w-40"
                      />
                      <span>liters</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div>
                <Label className="text-lg font-medium mb-2 block">
                  Advanced water-saving techniques used in production
                </Label>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        "Closed-Loop Recycling Systems",
                        "Advanced Filtration Techniques",
                        "AI-Driven Water Optimization Tools",
                      ].map((technique) => (
                        <div
                          key={technique}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={technique}
                            checked={formData.advancedWaterSavingTechniques.includes(
                              technique
                            )}
                            onCheckedChange={(checked) => {
                              setFormData((prev) => ({
                                ...prev,
                                advancedWaterSavingTechniques: checked
                                  ? [
                                      ...prev.advancedWaterSavingTechniques,
                                      technique,
                                    ]
                                  : prev.advancedWaterSavingTechniques.filter(
                                      (t) => t !== technique
                                    ),
                              }));
                            }}
                          />
                          <Label htmlFor={technique} className="text-sm">
                            {technique}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <Separator />

          {/* <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Document Verification
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Please upload the following documents to validate the data
              provided:
            </p>
            <div className="space-y-4">
              {[
                "annualWaterUsageReport",
                "waterSavingMeasuresEvidence",
                "productWaterFootprintReports",
              ].map((doc) => (
                <div key={doc}>
                  <Label
                    htmlFor={doc}
                    className="text-sm font-medium capitalize"
                  >
                    {doc.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <Input
                    id={doc}
                    name={doc}
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
          </section> */}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Submit Assessment
        </Button>
      </div>
    </form>
  );
}
