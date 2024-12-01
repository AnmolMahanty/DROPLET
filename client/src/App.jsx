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

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="dishCalculator" element={<DishCalculator />} />
            <Route path="dailyCalculator" element={<DailyCalculator />} />
            <Route path="farmersCorner" element={<FarmersCorner />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
