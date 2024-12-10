import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DailyCalculator = () => {
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [calculationResult, setCalculationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize questionnaire data
  useEffect(() => {
    const FarmQuestionnaire = {
      sections: [
        {
          section: "Farm Overview",
          questions: [
            {
              question: "Enter the crop name?",
              inputType: "dropdown",
              options: ["Tomato","Broccoli", "Brussel Sprouts", "Cabbage", "Carrots", "Cauliflower", "Celery", "Garlic", "Lettuce", "Spinach", "Radish", "Egg Plant", "Sweet Peppers (bell)", "Sweet Potato", "Chick pea", "Beans, green", "Beans, dry and Pulses", "Cacao", "Kiwi", "Date Palms", "Coffee"],
            },
            {
              question: "Select your location?",
              inputType: "dropdown",
              options: [
                "Delhi",
                "Mumbai",
                "Lucknow",
                "Bhopal",
                "Chennai",
                "Hyderabad",
                "Bangalore",
                "Ahmedabad",
                "Kolkata",
                "Pune",
                "Jaipur",
                "Patna",
                "Raipur",
                "Nagpur",
                "Surat",
                "Coimbatore",
                "Chandigarh",
                "Guwahati",
                "Indore",
                "Ludhiana",
                "Amritsar",
                "Vijayawada",
                "Varanasi",
                "Kanpur",
                "Mysore",
                "Thiruvananthapuram",
                "Ranchi",
                "Jodhpur",
                "Allahabad",
                "Madurai",
                "Vellore",
                "Dharwad",
                "Puducherry",
                "Kozhikode",
                "Jamshedpur",
                "Dehradun",
                "Shimla",
                "Shillong",
                "Cuttack",
                "Dibrugarh",
                "Agartala",
                "Panaji",
                "Imphal",
                "Aizawl",
                "Itanagar",
                "Gangtok",
                "Silchar",
                "Udaipur",
                "Bhubaneswar"
              ],
            },
            {
              question: "SOWING DATE?",
              inputType: "date",
            },
            {
              question: "What irrigation system do you use?",
              inputType: "dropdown",
              options: [
                "Drip Irrigation",
                "Sprinkler Irrigation",
                "Surface Irrigation (Basin)",
                "Surface Irrigation (Border)",
                "Surface Irrigation (Furrow)",
              ],
            },
            {
              question: "What is the total area of your farm?(Square Meters)",
              inputType: "number",
            },
            {//TODO : add handling for no motor usage logic
              question: "What is the motor's horsepower (HP)?",
              inputType: "number",
            },
            {
              question: "What is the diameter of the pipe used for irrigation?(inches)",
              inputType: "number",
            },
          ],
        },
        {
          section: "Irrigation Scheduling",
          questions: [
            {
              question: "How many hours do you irrigate in one session?",
              inputType: "number",
              unit: "Hours",
            },
            {
              question: "How often do you irrigate your field in a week?",
              inputType: "number",
            },
            {
              question:
                "What is the usual time interval between irrigation sessions during each crop initial(after sowing) phase?",
              inputType: "dropdown",
              options: ["Every 2 Days", "Every 3 Days", "Once a Week"],
            },
            {
              question:
                "What is the usual time interval between irrigation sessions during each crop growth phase?",
              inputType: "dropdown",
              options: ["Every 2 Days", "Every 3 Days", "Once a Week"],
            },
            {
              question:
                "What is the usual time interval between irrigation sessions during each crop maturity phase?",
              inputType: "dropdown",
              options: ["Every 2 Days", "Every 3 Days", "Once a Week"],
            },
            
          ],
        },
      ],
    };

    setQuestionnaire(FarmQuestionnaire);
    setIsLoading(false);
  }, []);

  // Memoize the questions
  const questions = useMemo(
    () =>
      questionnaire
        ? questionnaire.sections.flatMap((section) => section.questions)
        : [],
    [questionnaire]
  );

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleAnswerChange = useCallback(
    (answer) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: answer,
      }));
    },
    [currentQuestionIndex]
  );

  // Submit handler
  const handleSubmit = useCallback(() => {
    const payload = {
      answers,
      timestamp: new Date().toISOString(), // optional metadata
    };

    // Log the payload to the console for testing
    console.log("Payload to be submitted:", payload);
    sendToServer(payload);

    // You can also display a mock success message
    setCalculationResult({ message: "Data submission simulated successfully!" });
  }, [answers]);

  const sendToServer = async (payload) => {
    await axios.post("http://localhost:5000/api/getData", payload).then(response => {
      console.log(response);
      navigate("/dashboard/farmerResult", { state: { ideal: [20, 20, 20, 20] } });
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen bg-blue-50"
      >
        <p>Loading...</p>
      </motion.div>
    );
  }

  // Result view
  if (calculationResult) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Submission Successful!</h2>
          <p className="text-xl mb-4">Thank you for your submission.</p>
          <button
            onClick={() => setCalculationResult(null)}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  // Current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-3/4">
        <h2 className="text-xl font-bold mb-4">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p className="mb-4">{currentQuestion.question}</p>

        <AnimatePresence mode="wait">
          {currentQuestion.inputType === "number" && (
            <input
              type="number"
              value={answers[currentQuestionIndex] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
          )}
          {currentQuestion.inputType === "dropdown" && (
            <select
              value={answers[currentQuestionIndex] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            >
              <option value="" disabled>
                Select an option
              </option>
              {currentQuestion.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {currentQuestion.inputType === "date" && (
            <input
              type="date"
              value={answers[currentQuestionIndex] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
          )}
        </AnimatePresence>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-300 py-2 px-4 rounded disabled:opacity-50"
          >
            Back
          </button>
          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyCalculator;
