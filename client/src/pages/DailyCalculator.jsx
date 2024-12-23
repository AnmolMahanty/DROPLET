import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const questionnaire = {
    sections: [
        {
            section: "Water Usage for Daily Activities",
            questions: [
                {
                    id: "drinking",
                    question: "Q1) How often do you use water for drinking and cooking?",
                    options: [
                        "Once per day",
                        "Twice per day",
                        "After every meal or multiple times per day",
                    ],
                },
                {
                    id: "reuse",
                    question: "Q2) Do you reuse water from cooking for other purposes?",
                    options: ["Yes", "No"],
                },
                {
                    id: "bathing",
                    question: "Q3) How do you take your bath?",
                    options: [
                        "1 bucket",
                        "2 buckets",
                        "More than 2 buckets",
                        "Shower - Less than 5 minutes",
                        "Shower - 5–10 minutes",
                        "Shower - More than 10 minutes"
                    ],
                },
                {
                    id: "waterSaving",
                    question: "Q4) Do you use water-saving showerheads or taps?",
                    options: ["Yes", "No"],
                },
                {
                    id: "utensils",
                    question: "Q5) How many times per day are utensils washed?",
                    options: ["Once", "Twice", "After every meal"],
                },
                {
                    id: "washingMethod",
                    question: "Q6) How are utensils washed?",
                    options: ["By Hand", "Dishwasher"],
                },
            ],
        },
        {
            section: "Laundry and Cleaning",
            questions: [
                {
                    id: "laundry",
                    question: "Q7) How many times does your household do laundry in a week?",
                    options: ["1–2 times", "3–5 times", "More than 5 times"],
                },
                {
                    id: "mopping",
                    question: "Q8) How often do you mop the floors?",
                    options: ["Daily", "Every Alternate Day", "Weekly"],
                },
                {
                    id: "vehicle",
                    question: "Q9) Do you clean vehicles at home? If yes, how often?",
                    options: ["Yes, Daily", "Yes, Weekly", "Yes, Monthly", "No"],
                },
                {
                    id: "outdoor",
                    question: "Q10) Do you use water for outdoor cleaning (driveway/spaces)?",
                    options: ["Yes, Daily", "Yes, Weekly", "Yes, Monthly", "No"],
                },
            ],
        },
        {
            section: "Household Overview",
            questions: [
                {
                    id: "household",
                    question: "Q11) How many people live in your household?",
                    options: ["1", "2", "3", "4", "5", "6 or more"],
                },
            ],
        },
    ],
};

const WaterFootprintQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const flattenedQuestions = useMemo(() => {
        return questionnaire.sections.flatMap(section => 
            section.questions.map(q => ({
                ...q,
                sectionName: section.section
            }))
        );
    }, []);

    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));

        if (currentQuestion < flattenedQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const calculateWaterUsage = () => {
        const waterUsage = {
            drinking: 0,
            bathing: 0,
            cleaning: 0,
            laundry: 0
        };

        switch(answers.drinking) {
            case "Once per day":
                waterUsage.drinking = 5;
                break;
            case "Twice per day":
                waterUsage.drinking = 10;
                break;
            case "After every meal or multiple times per day":
                waterUsage.drinking = 15;
                break;
            default:
                break;
        }

        if (answers.reuse === "Yes") {
            waterUsage.drinking -= 2;
        }

        switch(answers.bathing) {
            case "1 bucket":
                waterUsage.bathing = 20;
                break;
            case "2 buckets":
                waterUsage.bathing = 40;
                break;
            case "More than 2 buckets":
                waterUsage.bathing = 60;
                break;
            case "Shower - Less than 5 minutes":
                waterUsage.bathing = 35;
                break;
            case "Shower - 5–10 minutes":
                waterUsage.bathing = 70;
                break;
            case "Shower - More than 10 minutes":
                waterUsage.bathing = 100;
                break;
            default:
                break;
        }

        if (answers.waterSaving === "Yes") {
            waterUsage.bathing *= 0.8;
        }

        let utensilWater = 0;
        switch(answers.utensils) {
            case "Once":
                utensilWater = 20;
                break;
            case "Twice":
                utensilWater = 40;
                break;
            case "After every meal":
                utensilWater = 60;
                break;
            default:
                break;
        }

        if (answers.washingMethod === "Dishwasher") {
            utensilWater *= 1.2;
        }
        waterUsage.cleaning += utensilWater;

        switch(answers.laundry) {
            case "1–2 times":
                waterUsage.laundry = 50;
                break;
            case "3–5 times":
                waterUsage.laundry = 100;
                break;
            case "More than 5 times":
                waterUsage.laundry = 150;
                break;
            default:
                break;
        }

        switch(answers.mopping) {
            case "Daily":
                waterUsage.cleaning += 20;
                break;
            case "Every Alternate Day":
                waterUsage.cleaning += 10;
                break;
            case "Weekly":
                waterUsage.cleaning += 5;
                break;
            default:
                break;
        }

        switch(answers.vehicle) {
            case "Yes, Daily":
                waterUsage.cleaning += 30;
                break;
            case "Yes, Weekly":
                waterUsage.cleaning += 10;
                break;
            case "Yes, Monthly":
                waterUsage.cleaning += 5;
                break;
            default:
                break;
        }

        switch(answers.outdoor) {
            case "Yes, Daily":
                waterUsage.cleaning += 50;
                break;
            case "Yes, Weekly":
                waterUsage.cleaning += 20;
                break;
            case "Yes, Monthly":
                waterUsage.cleaning += 10;
                break;
            default:
                break;
        }

        const totalDaily = Object.values(waterUsage).reduce((a, b) => a + b, 0);
        const householdSize = parseInt(answers.household) || 1;
        const totalHousehold = totalDaily * householdSize;

        const chartData = Object.entries(waterUsage).map(([activity, value]) => ({
            activity: activity.charAt(0).toUpperCase() + activity.slice(1),
            water: Math.round(value)
        }));

        return {
            perPerson: Math.round(totalDaily),
            totalHousehold: Math.round(totalHousehold),
            chartData
        };
    };

    const renderCurrentQuestion = () => {
        const currentQuestionObj = flattenedQuestions[currentQuestion];
        
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{currentQuestionObj.sectionName}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-lg font-semibold">{currentQuestionObj.question}</p>
                        <div className="space-y-2">
                            {currentQuestionObj.options.map((option, index) => (
                                <Button 
                                    key={index}
                                    variant={answers[currentQuestionObj.id] === option ? "default" : "outline"}
                                    className="w-full justify-start"
                                    onClick={() => handleAnswer(currentQuestionObj.id, option)}
                                >
                                    {option}
                                </Button>
                            ))}
                        </div>
                        {currentQuestion === flattenedQuestions.length - 1 && (
                            <Button 
                                className="w-full mt-6"
                                onClick={() => setIsSubmitted(true)}
                                disabled={Object.keys(answers).length !== flattenedQuestions.length}
                            >
                                Calculate Water Footprint
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    };

    const renderResults = () => {
        const results = calculateWaterUsage();
        
        return (
            <div className="container mx-auto max-w-4xl">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle>Your Water Footprint Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Daily Usage Per Person</p>
                                <h3 className="text-2xl font-bold">{results.perPerson} Liters</h3>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Total Household Daily Usage</p>
                                <h3 className="text-2xl font-bold">{results.totalHousehold} Liters</h3>
                            </div>
                        </div>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={results.chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="activity" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="water" fill="#2563eb" name="Water Usage (Liters)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };

    const renderNavigation = () => {
        return (
            <ScrollArea className="h-full">
                <div className="p-4 space-y-6">
                    {questionnaire.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            <h3 className="font-semibold mb-2">{section.section}</h3>
                            <div className="space-y-2">
                                {section.questions.map((question, questionIndex) => {
                                    const globalIndex = flattenedQuestions.findIndex(q => q.id === question.id);
                                    return (
                                        <Button
                                            key={question.id}
                                            variant={currentQuestion === globalIndex ? "default" : 
                                                answers[question.id] ? "secondary" : "outline"}
                                            className="w-full justify-start text-left whitespace-normal h-auto py-2"
                                            onClick={() => setCurrentQuestion(globalIndex)}
                                        >
                                            {question.question}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        );
    };

    return (
        <div className="h-screen">
            {!isSubmitted ? (
                <div className="h-full flex">
                    <div className="w-2/3 p-6">
                        {renderCurrentQuestion()}
                    </div>
                    <div className="w-1/3 border-l bg-gray-50">
                        {renderNavigation()}
                    </div>
                </div>
            ) : (
                <div className="p-6 flex justify-center items-start">
                    {renderResults()}
                </div>
            )}
        </div>
    );
};

export default WaterFootprintQuiz;