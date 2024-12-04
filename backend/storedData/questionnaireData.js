// controllers/questionnaireData.js
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
                    options: ["Yes, Daily", "Yes, Weekly", "Yes, Monthly", "No"],

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

module.exports = questionnaire;