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
  const [errorMessage, setErrorMessage] = useState(null);

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
              options: [
                "Broccoli",
                "Brussel Sprouts",
                "Cabbage",
                "Carrots",
                "Cauliflower",
                "Celery",
                "Garlic",
                "Lettuce",
                "Spinach",
                "Radish",
                "Egg Plant",
                "Sweet Peppers (bell)",
                "Sweet Potato",
                "Chick pea",
                "Beans, green",
                "Beans, dry and Pulses",
                "Cacao",
                "Kiwi",
                "Date Palms",
                "Coffee",
              ],
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
                "Bhubaneswar",
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
            {
              question: "What is the motor's horsepower (HP)?",
              inputType: "number",
              constraints: { min: 0, max: 50 },
            },
            {
              question:
                "What is the diameter of the pipe used for irrigation?(inches)",
              inputType: "number",
              constraints: { min: 0, max: 10 },
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
              constraints: { min: 0, max: 24 },
            },
            {
              question:
                "What is the usual time interval between irrigation sessions during each crop phase: initial phase(after sowing) ?",
              inputType: "dropdown",
              options: ["Every 2 Days", "Every 3 Days", "Once a Week"],
            },
            {
              question:
                "What is the usual time interval between irrigation sessions during each crop phase: growth phase?",
              inputType: "dropdown",
              options: ["Every 2 Days", "Every 3 Days", "Once a Week"],
            },
            {
              question:
                "What is the usual time interval between irrigation sessions during each crop phase: maturity phase?",
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

  const questions = useMemo(
    () =>
      questionnaire
        ? questionnaire.sections.flatMap((section) => section.questions)
        : [],
    [questionnaire]
  );

  const handleNext = useCallback(() => {
    const currentAnswer = answers[currentQuestionIndex];
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentAnswer) {
      setErrorMessage("This question is required. Please provide an answer.");
      return;
    }

    setErrorMessage(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, questions, answers]);

  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setErrorMessage(null);
    }
  }, [currentQuestionIndex]);

  const handleAnswerChange = useCallback(
    (answer) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion.constraints) {
        const { min, max } = currentQuestion.constraints;
        if (answer < min || answer > max) {
          setErrorMessage(
            `Invalid input: Please enter a value between ${min} and ${max}.`
          );
          return;
        }
      }
      setAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: answer,
      }));
      setErrorMessage(null);
    },
    [currentQuestionIndex, questions]
  );

  const handleSubmit = useCallback(() => {
    const unansweredQuestions = questions.some((_, index) => !answers[index]);

    if (unansweredQuestions) {
      setErrorMessage(
        "All questions are compulsory. Please complete the questionnaire."
      );
      return;
    }

    const payload = {
      answers,
      timestamp: new Date().toISOString(),
    };

    console.log("Payload to be submitted:", payload);
    sendToServer(payload);

    setCalculationResult({
      message: "Data submission simulated successfully!",
    });
  }, [answers, questions]);

  const sendToServer = async (payload) => {
    await axios
      .post("http://140.245.22.129:3000/api/getData", payload)
      .then((response) => {
        console.log(response.data);
        navigate("/dashboard/farmerResult", { state: response.data });
      });
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen bg-blue-50 px-4"
      >
        <p className="text-lg">Loading...</p>
      </motion.div>
    );
  }

  if (calculationResult) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-8 w-full max-w-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Submission Successful!
          </h2>
          <p className="text-lg md:text-xl mb-4">
            Thank you for your submission.
          </p>
          <button
            onClick={() => setCalculationResult(null)}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full md:w-auto"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4 py-6">
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-8 w-full max-w-lg">
        <h2 className="text-lg md:text-xl font-bold mb-4">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p className="mb-4 text-sm md:text-base">{currentQuestion.question}</p>

        {errorMessage && (
          <p className="text-red-500 mb-4 text-sm md:text-base">
            {errorMessage}
          </p>
        )}

        <AnimatePresence mode="wait">
          {currentQuestion.inputType === "number" && (
            <input
              type="number"
              value={answers[currentQuestionIndex] || ""}
              onChange={(e) => handleAnswerChange(Number(e.target.value))}
              className="w-full p-2 md:p-3 border rounded-lg mb-4 text-sm md:text-base"
            />
          )}
          {currentQuestion.inputType === "dropdown" && (
            <select
              value={answers[currentQuestionIndex] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full p-2 md:p-3 border rounded-lg mb-4 text-sm md:text-base"
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
              className="w-full p-2 md:p-3 border rounded-lg mb-4 text-sm md:text-base"
            />
          )}
        </AnimatePresence>

        <div className="flex justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-300 py-2 px-4 rounded disabled:opacity-50 text-sm md:text-base flex-1 md:flex-none"
          >
            Back
          </button>
          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded text-sm md:text-base flex-1 md:flex-none"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded text-sm md:text-base flex-1 md:flex-none"
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
