import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet } from "lucide-react";

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

      if (answers[0] === "Once per day") {
        total += 4; // 4 liters per day
      } else if (answers[0] === "Twice per day") {
        total += 6; // 6 liters per day
      } else if (answers[0] === "After every meal or multiple times per day") {
        total += 8; // 8 liters per day
      }

      if (answers[1] === "Yes") {
        total -= 1; // Assume 1 liters saved in a day
      }

      if (answers[2] === "1 bucket") {
        total += 15; // 15 liters per bath
      } else if (answers[2] === "2 buckets") {
        total += 30; // 30 liters per bath
      } else if (answers[2] === "More than 2 buckets") {
        total += 45; // 45 liters per bath
      }

      if (answers[3] === "Less than 5 minutes") {
        total += 50; // 50 liters per shower
      } else if (answers[3] === "5–10 minutes") {
        total += 100; // 100 liters per shower
      } else if (answers[3] === "More than 10 minutes") {
        total += 150; // 150 liters per shower
      }

      if (answers[4] === "Yes") {
        total -= 15;
      }

      if (answers[5] === "After every meal") {
        total += 30; // 30 liters per day
      } else if (answers[5] === "Twice") {
        total += 20; // 20 liters per day
      } else if (answers[5] === "Once") {
        total += 15; // 15 liters per day
      }

      if (answers[6] === "By Hand") {
        total += 10;
      } else if (answers[6] === "Dishwasher") {
        total += 15;
      }
      let laundryWater = 0;
      if (answers[7] === "Hand Washing") {
        laundryWater += 30; // 30 liters per wash
      } else if (answers[7] === "Semi-Automatic Washing Machine") {
        laundryWater += 60; // 60 liters per wash
      } else if (answers[7] === "Fully Automatic Washing Machine") {
        laundryWater += 100; // 100 liters per wash
      }
      if (answers[8] === "1–2 times") {
        laundryWater *= 2; // 2 washes per week (total for 7 days)
      } else if (answers[8] === "3–5 times") {
        laundryWater *= 4; // 4 washes per week
      } else if (answers[8] === "More than 5 times") {
        laundryWater *= 6; // 6 washes per week
      }

      total += laundryWater;

      if (answers[9] === "Daily") {
        total += 5; // 5 liters per day
      } else if (answers[9] === "Every Alternate Day") {
        total += 3; // 3 liters every alternate day (convert to daily)
      } else if (answers[9] === "Weekly") {
        total += 2 / 7; // 2 liters per week (convert to daily)
      }

      if (answers[10] === "Yes, Daily") {
        total += 20; // 20 liters per day
      } else if (answers[10] === "Yes, Weekly") {
        total += 70 / 7; // 20 liters per week (convert to daily)
      } else if (answers[10] === "Yes, Monthly") {
        total += 100 / 30; // 4 liters per month (convert to daily)
      }

      if (answers[11] === "Yes, Daily") {
        total += 15; // 20 liters per day
      } else if (answers[11] === "Yes, Weekly") {
        total += 30 / 7; // 20 liters per week (convert to daily)
      } else if (answers[11] === "Yes, Monthly") {
        total += 50 / 30; // 4 liters per month (convert to daily)
      }
      if (answers[12] === "Yes") {
        total += 50 / 7; // 50 liters per week (convert to daily)
      }

      if (answers[13] === "Yes") {
        total += 5; // 5 liters per day for pets
      }

      if (answers[14]) {
        total = Number(answers[14]) * total;
      }

      if (answers[15] === "Urban Area") {
        total *= 1.2;
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
            width="84"
            height="84"
            viewBox="0 0 84 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5001 65.988C18.5001 64.6169 19.129 62.5974 22.1603 60.7185C22.8595 60.2771 23.7892 60.4998 24.2306 61.199C24.672 61.8982 24.4493 62.8279 23.7501 63.2693C22.3009 64.1677 21.5118 65.1404 21.5118 65.9998C21.5118 68.7107 29.3126 72.4998 42.0118 72.4998C54.711 72.4998 62.5118 68.7107 62.5118 65.9998C62.5118 65.1404 61.711 64.1717 60.2735 63.2693C59.5743 62.8279 59.3516 61.9099 59.793 61.199C60.2344 60.4998 61.1524 60.2771 61.8633 60.7185C64.8828 62.5974 65.5235 64.6287 65.5235 65.988C65.5235 72.1599 53.4145 75.488 42.0235 75.488C30.6285 75.488 18.5001 72.1599 18.5001 65.988ZM68.9301 52.578C68.1488 52.3085 67.2895 52.7187 67.0199 53.4999C66.7503 54.2812 67.1605 55.1405 67.9418 55.4101C75.8129 58.1718 80.5118 62.1289 80.5118 65.9881C80.5118 72.9881 65.0428 80.4881 42.0118 80.4881C18.9808 80.4881 3.51176 72.9881 3.51176 65.9881C3.51176 62.117 8.21096 58.1678 16.0818 55.4101C16.863 55.1406 17.2732 54.2812 17.0036 53.4999C16.7341 52.7187 15.8747 52.3085 15.0934 52.578C5.69504 55.8788 0.523438 60.6366 0.523438 66C0.523438 75.8086 18.7534 83.5 42.0234 83.5C65.2934 83.5 83.5234 75.8086 83.5234 66C83.5 60.6406 78.321 55.871 68.9301 52.578ZM42.0001 55.4882C42.8282 55.4882 43.5001 54.8164 43.5001 53.9882C43.5001 53.1601 42.8282 52.4882 42.0001 52.4882C35.1095 52.4882 29.5001 46.8788 29.5001 39.9882C29.5001 39.1601 28.8282 38.4882 28.0001 38.4882C27.172 38.4882 26.5001 39.1601 26.5001 39.9882C26.5001 48.539 33.4493 55.4882 42.0001 55.4882ZM18.5001 39.6292C18.5001 29.0902 26.0509 16.0782 40.9301 0.938231C41.4887 0.367921 42.5004 0.367921 43.0707 0.938231C57.9497 16.0712 65.5007 29.0902 65.5007 39.6292C65.5007 52.7892 54.9617 63.5002 42.0007 63.5002C29.0397 63.5002 18.5001 52.7812 18.5001 39.6292ZM21.5001 39.6292C21.5001 51.1412 30.6993 60.5002 42.0001 60.5002C53.3009 60.5002 62.5001 51.1408 62.5001 39.6292C62.5001 30.1487 55.6017 18.2192 42.0001 4.14123C28.3981 18.2112 21.5001 30.1492 21.5001 39.6292Z"
              fill="#2563eb"
            />
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
