import React from "react";
import { useQuestions } from "../context/QuestionsProvider";
import StartScreen from "../components/StartScreen";
import Question from "../components/Question";
import FinishScreen from "../components/FinishScreen";
import Header from "./Header";
import { useQuiz } from "../context/QuizContext";
import { quizData } from "../data";

const QuizApp = () => {
  const {
    questionIndex,
    setQuestionIndex,
    currentLevel,
    setCurrentLevel,
    badge,
    setBadge,
    username,
    userkey,
  } = useQuiz();
  const backgroundImage =
    quizData.quizzes[currentLevel].questions[questionIndex].Category == 1
      ? ""
      : quizData.quizzes[currentLevel]?.icon;

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover", // Ensures the image covers the whole div
        backgroundPosition: "center", // Centers the background image
        height: "100vh", // Full height
        width: "100%", // Full width
      }}
      className="bg-[#ddb2aa]"
    >
      <Header />
      <div className="flex min-h-[calc(100vh-70px)] items-center justify-center">
        <Question />
      </div>
    </div>
  );
};

export default QuizApp;
