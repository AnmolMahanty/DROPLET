import React from "react";
import { useState } from "react";

const questionnaire = {
  sections: [
    {
      section: "Household Overview",
      questions: [
        {
          question: "How many people live in your household?",
          inputType: "number",
        },
        {
          question: "Where is your household located?",
          options: ["Urban Area", "Rural Area"],
        },
        {
          question:
            "Do you have any pets in your household that require water (e.g., for drinking or cleaning)?",
          options: ["Yes", "No"],
        },
      ],
    },
    {
      section: "Water Usage for Daily Activities",
      questions: [
        {
          question: "How often do you use water for drinking and cooking?",
          options: [
            "Once per day",
            "Twice per day",
            "After every meal or multiple times per day",
          ],
        },
        {
          question:
            "Do you reuse water from cooking (e.g., washing rice or vegetables) for other purposes?",
          options: ["Yes", "No"],
        },
        {
          question: "What method does your household use for bathing?",
          options: ["Bucket Bath", "Shower", "Both"],
        },
        {
          question:
            "If using a bucket, how many buckets are used per person per bath?",
          options: ["1 bucket", "2 buckets", "More than 2 buckets"],
        },
        {
          question:
            "If using a shower, how long does an average shower last per person?",
          options: [
            "Less than 5 minutes",
            "5–10 minutes",
            "More than 10 minutes",
          ],
        },
        {
          question: "Do you use water-saving showerheads or taps?",
          options: ["Yes", "No"],
        },
        {
          question:
            "How many times per day are utensils washed in your household?",
          options: ["Once", "Twice", "After every meal"],
        },
        {
          question: "How are utensils washed?",
          options: ["By Hand", "Dishwasher"],
        },
      ],
    },
    {
      section: "Laundry and Cleaning",
      questions: [
        {
          question: "What method does your household use for washing clothes?",
          options: [
            "Hand Washing",
            "Semi-Automatic Washing Machine",
            "Fully Automatic Washing Machine",
          ],
        },
        {
          question: "How many times does your household do laundry in a week?",
          options: ["1–2 times", "3–5 times", "More than 5 times"],
        },
        {
          question: "How often do you mop the floors in your household?",
          options: ["Daily", "Every Alternate Day", "Weekly"],
        },
        {
          question: "Do you clean your vehicles at home? If yes, how often?",
          options: ["Yes, Daily", "Yes, Weekly", "Yes, Monthly", "No"],
        },
        {
          question:
            "Do you use water for other household activities, such as washing the driveway or cleaning outdoor spaces?",
          options: [
            "No",
            {
              Yes: ["Daily", "Weekly", "Monthly"],
            },
          ],
        },
      ],
    },
    {
      section: "Gardening and Outdoor Activities",
      questions: [
        {
          question:
            "Do you have a garden or outdoor plants? How often do you water them?",
          options: ["Yes, Daily", "Yes, Weekly", "Yes, Monthly", "No"],
        },
        {
          question: "Do you use any irrigation system for gardening?",
          options: [
            "Yes (e.g., sprinklers or drip irrigation)",
            "No, I water manually",
          ],
        },
      ],
    },
  ],
};

const DailyCalculator = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const questions = questionnaire.sections.flatMap(
    (section) => section.questions
  );

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-black">
        <div className="w-3/4 flex justify-center items-center h-full">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
              Question {currentQuestionIndex + 1}:
            </h2>
            <p className="text-lg mb-4">{currentQuestion.question}</p>
            {currentQuestion.inputType === "number" ? (
              <input
                type="number"
                value={answers[currentQuestionIndex] || ""}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="border p-2 mb-4 w-full"
              />
            ) : (
              currentQuestion.options?.map((option, index) => (
                <label key={index} className="block mb-2">
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={answers[currentQuestionIndex] === option}
                    onChange={() => handleAnswerChange(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))
            )}
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/4 flex justify-end items-end h-[calc(100vh-64px)] border">
          <div className="w-full h-60 flex items-center justify-center bg-blue-500 text-3xl">
            3000 <span className="text-sm">ltr/person</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyCalculator;
