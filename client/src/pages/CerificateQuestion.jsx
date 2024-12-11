import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const IndustrialWaterUsage = () => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize questionnaire data
  useEffect(() => {
    const BusinessQuestionnaire = {
      sections: [
        {
          section: "General Information (Baseline Data)",
          questions: [
            {
              question: "What is the primary type of beverage your company produces?",
              inputType: "dropdown",
              options: [
                "Soft Drinks",
                "Bottled Water",
                "Juices",
                "Alcoholic Beverages",
                "Others (please specify)",
              ],
            },
            {
              question: "What is your company's total annual production volume?",
              inputType: "number",
              unit: "liters or units",
            },
            {
              question: "What is your company’s total annual water usage?",
              inputType: "number",
              unit: "liters",
            },
            {
              question: "What are the primary sources of water used in your production?",
              inputType: "checkbox",
              options: [
                "Municipal Supply",
                "Groundwater",
                "Surface Water (e.g., rivers, lakes)",
                "Recycled Water",
                "Rainwater Harvesting",
              ],
            },
          ],
        },
        {
          section: "Process-Specific Water Usage",
          questions: [
            {
              question: "Does your company track water usage for individual production processes?",
              inputType: "dropdown",
              options: ["Yes", "No"],
            },
            {
              question:
                "(If Yes) Please specify the water usage (in liters) for Ingredient Sourcing:",
              inputType: "number",
              unit: "liters",
            },
            {
              question:
                "(If Yes) Please specify the water usage (in liters) for Processing (e.g., mixing, carbonation, pasteurization):",
              inputType: "number",
              unit: "liters",
            },
            {
              question:
                "(If Yes) Please specify the water usage (in liters) for Packaging (e.g., bottle/can cleaning, preparation):",
              inputType: "number",
              unit: "liters",
            },
            {
              question:
                "(If Yes) Please specify the water usage (in liters) for Cleaning and Maintenance:",
              inputType: "number",
              unit: "liters",
            },
            {
              question: "Are there any unique processes in your production that involve significant water usage?",
              inputType: "dropdown",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          section: "Water Recycling and Reuse",
          questions: [
            {
              question: "Does your facility have a water recycling or reuse system in place?",
              inputType: "dropdown",
              options: ["Yes", "No"],
            },
            {
              question: "If yes, what percentage of your total water usage is recycled or reused?",
              inputType: "number",
              unit: "%",
            },
            {
              question: "Please provide a brief description of your water recycling/reuse system:",
              inputType: "textarea",
            },
          ],
        },
        {
          section: "Water-Saving Measures",
          questions: [
            {
              question: "Does your company monitor water usage with water meters?",
              inputType: "dropdown",
              options: ["Yes", "No"],
            },
            {
              question: "Does your facility implement rainwater harvesting?",
              inputType: "dropdown",
              options: ["Yes", "No"],
            },
            {
              question: "If yes, what is the annual volume of rainwater harvested?",
              inputType: "number",
              unit: "liters",
            },
            {
              question: "Are any advanced water-saving techniques used in your production?",
              inputType: "checkbox",
              options: [
                "Closed-Loop Recycling Systems",
                "Advanced Filtration Techniques",
                "AI-Driven Water Optimization Tools",
                "Others (please specify)",
              ],
            },
          ],
        },
      ],
    };

    setQuestionnaire(BusinessQuestionnaire);
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

  const handleSubmit = useCallback(() => {
    const payload = {
      answers,
      timestamp: new Date().toISOString(),
    };

    // Send the payload to the backend
    fetch("http://your-backend-endpoint.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Submission successful:", data);
        setSubmissionSuccess(true);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  }, [answers]);

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

  if (submissionSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Submission Successful!</h2>
          <p className="text-xl mb-4">Thank you for your submission.</p>
          <button
            onClick={() => setSubmissionSuccess(false)}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

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
          {currentQuestion.inputType === "textarea" && (
            <textarea
              value={answers[currentQuestionIndex] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
          )}
          {currentQuestion.inputType === "checkbox" && (
            <>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="mb-2">
                  <label>
                    <input
                      type="checkbox"
                      value={option}
                      checked={(answers[currentQuestionIndex] || []).includes(option)}
                      onChange={(e) => {
                        const newAnswers = answers[currentQuestionIndex] || [];
                        const updatedAnswers = e.target.checked
                          ? [...newAnswers, option]
                          : newAnswers.filter((ans) => ans !== option);
                        handleAnswerChange(updatedAnswers);
                      }}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </div>
              ))}
            </>
          )}
        </AnimatePresence>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white py-2 px-4 rounded"
            disabled={currentQuestionIndex === 0}
          >
            Back
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndustrialWaterUsage;
