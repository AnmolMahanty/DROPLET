import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import DishCalculator from "./pages/DishCalculator";
import DailyCalculator from "./pages/DailyCalculator";
import FarmersCorner from "./pages/FarmerCorner";
import NotFound from "./pages/NotFound";
import Result from "./pages/Result";
import FarmerResult from "./pages/FarmerResult";
import Blog from "./pages/BlogManagement";
import IndustryOutputCertificate from "./pages/Industry";
import DailyResult from "./pages/DailyResult";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/industry" element={<IndustryOutputCertificate />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="blog" element={<Blog />} />
            <Route path="dailyResult" element={<DailyResult />} />
            <Route path="result" element={<Result />} />
            <Route path="dishCalculator" element={<DishCalculator />} />
            <Route path="dailyCalculator" element={<DailyCalculator />} />
            <Route path="farmersCorner" element={<FarmersCorner />} />
            <Route path="farmerResult" element={<FarmerResult />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
