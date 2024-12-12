const FarmQuestionnaire = {
    sections: [
        {
            section: "Farm Overview",
            questions: [
                {
                    question: "Enter the crop name?",
                    inputType: "dropdown",
                    options: ["eggplant", "jawara", "Rice"],
                },
                {
                    question: "Select your location?",
                    inputType: "dropdown",
                    options: [
                        "Delhi",
                        "Mumbai",
                        "up",
                        "MP",
                        "add sarthak)",
                    ],
                },
                {
                    question: "SOWING DATE ?",
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
                    question: "If yes, what is the motor's horsepower (HP)?",
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
                    question: "What is the usual time interval between irrigation sessions during each crop initial(after sowing) phase?",
                    options: [
                        "Every 2 Days",
                        "Every 3 Days",
                        "Once a Week"
                    ],
                },
                {
                    question: "What is the usual time interval between irrigation sessions during each crop growth phase?",
                    options: [
                        "Every 2 Days",
                        "Every 3 Days",
                        "Once a Week"
                    ],
                },
                {
                    question: "What is the usual time interval between irrigation sessions during each crop maturity phase?",
                    options: [
                        "Every 2 Days",
                        "Every 3 Days",
                        "Once a Week"
                    ],
                },                
            ],
        },
        ],
    };
    


module.exports = questionnaire; 
