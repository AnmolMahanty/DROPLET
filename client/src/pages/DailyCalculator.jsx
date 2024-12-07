import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DailyCalculator = () => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [calculationResult, setCalculationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [waterUsage, setWaterUsage] = useState(0);

  // Fetch questionnaire on component mount
  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await fetch("http://localhost:5000/dwf/questions");
        const data = await response.json();
        setQuestionnaire(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchQuestionnaire();
  }, []);

  // Calculate water usage dynamically as questions are answered
  useEffect(() => {
    const calculateIntermediateWaterUsage = () => {
      let total = 0;

      // Shower duration calculation
      if (answers[0]) {
        total += Number(answers[0]) * 10; // Assume 10 liters per minute of shower
      }

      // Dishwashing method
      if (answers[1] === "Dishwasher") {
        total += 15; // Average dishwasher load
      } else if (answers[1] === "Hand washing") {
        total += 40; // Higher water usage for hand washing
      }

      // Laundry frequency
      if (answers[2]) {
        const laundryFrequencyMap = {
          Daily: 50,
          "Every other day": 25,
          "Twice a week": 15,
          "Once a week": 10,
        };
        total += laundryFrequencyMap[answers[2]] || 0;
      }

      // Toilet flushing
      if (answers[3]) {
        total += Number(answers[3]) * 6; // Assume 6 liters per flush
      }

      // Teeth brushing
      if (answers[4] === "Tap running") {
        total += 12; // Water running while brushing
      }

      setWaterUsage(Math.round(total));
    };

    calculateIntermediateWaterUsage();
  }, [answers]);

  // Memoize questions to avoid unnecessary re-renders
  const questions = useMemo(
    () =>
      questionnaire
        ? questionnaire.sections.flatMap((section) => section.questions)
        : [],
    [questionnaire]
  );

  // Navigation handlers with animations
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

  // Answer change handler
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
  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/dwf/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });
      const data = await response.json();
      setCalculationResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [answers]);

  // Loading state
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-screen bg-blue-50"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" />
            <path d="M18 14V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v10" />
            <path d="M14 14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2z" />
          </svg>
        </motion.div>
      </motion.div>
    );
  }

  // Result view
  if (calculationResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-white shadow-2xl rounded-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Your Water Footprint
          </h2>
          <div className="text-6xl font-extrabold text-blue-500 mb-4">
            {calculationResult.totalWaterUsage}
            <span className="text-2xl ml-2">liters/day</span>
          </div>
          <p className="text-gray-600 mb-6">
            Based on your daily activities and consumption patterns
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCalculationResult(null)}
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            Calculate Again
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // Question view
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div
      className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-4xl flex">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-3/4 bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">
              Question {currentQuestionIndex + 1}/{questions.length}
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl text-gray-700"
            >
              {currentQuestion.question}
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentQuestion.inputType === "number" ? (
                <input
                  type="number"
                  value={answers[currentQuestionIndex] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter your value"
                />
              ) : (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <motion.label
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`block p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        answers[currentQuestionIndex] === option
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={option}
                        checked={answers[currentQuestionIndex] === option}
                        onChange={() => handleAnswerChange(option)}
                        className="hidden"
                      />
                      {option}
                    </motion.label>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            <motion.button
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </motion.button>

            {currentQuestionIndex === questions.length - 1 ? (
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                Submit
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </motion.button>
            ) : (
              <motion.button
                onClick={handleNext}
                disabled={!answers[currentQuestionIndex]}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </motion.button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-1/4 pl-6 flex items-center"
        >
          <div className="flex flex-col justify-end text-white rounded-2xl text-center shadow-2xl h-full">
            <div className="bg-blue-500 h-40 p-6 justify-center items-end rounded-2xl">
              <svg
                width="29"
                height="42"
                viewBox="0 0 29 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto mb-4"
              >
                <path
                  d="M6.33687 39.1332C8.8399 40.7837 11.6381 41.6526 14.4033 41.6526C15.1028 41.6526 15.8106 41.598 16.4937 41.4859C18.1661 41.2209 19.7947 40.6115 21.3414 39.6743C26.5387 36.5181 29.072 30.2717 27.629 24.1367C27.3285 22.7732 26.8257 21.4588 26.1398 20.2264L15.5291 1.12055C15.2067 0.541237 14.6001 0.175049 13.9333 0.175049H13.9197C13.2557 0.175049 12.6408 0.533018 12.3047 1.12055L1.88014 19.9151C1.10407 21.306 0.565768 22.8035 0.278816 24.3501C-0.855212 30.1787 1.53025 35.9768 6.33687 39.1332ZM2.35004 24.7436C2.59597 23.4156 3.05777 22.1339 3.72177 20.9453L13.9197 2.5739L24.3009 21.251C24.8884 22.3003 25.3147 23.4261 25.5797 24.5956C26.8121 29.8504 24.6698 35.1734 20.2566 37.8512C18.9477 38.641 17.5705 39.152 16.1632 39.3842C13.2749 39.8542 10.1953 39.1383 7.50357 37.3567C3.40467 34.6842 1.38544 29.7306 2.35004 24.7436Z"
                  fill="white"
                />
                <path
                  d="M14.4039 36.7395C14.4585 36.7395 14.5159 36.7313 14.5706 36.7258C15.8221 36.5236 18.2213 35.8732 20.2571 33.7528C22.159 31.7744 22.7547 29.52 22.9432 28.3532C23.0334 27.7793 22.6426 27.2328 22.0688 27.1426C21.4895 27.0442 20.9484 27.4432 20.8582 28.017C20.7106 28.9406 20.2352 30.725 18.7377 32.2908C17.1282 33.9631 15.2264 34.4796 14.2399 34.6409C13.6661 34.731 13.2753 35.2776 13.3655 35.8514C13.4447 36.3706 13.8983 36.7395 14.4039 36.7395Z"
                  fill="white"
                />
              </svg>

              <div className="text-4xl font-bold">{waterUsage}</div>
              <div className="text-sm">liters/person</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DailyCalculator;
