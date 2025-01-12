import React, { createContext, useContext, useState } from "react";

// Create the context
const QuizContext = createContext();

// Provide the context
export function QuizProvider({ children }) {
  const [points, setPoints] = useState(100); // Initial points
  const [questionIndex, setQuestionIndex] = useState(0); // Start at question 0
  const [currentLevel, setCurrentLevel] = useState(0); // Track the current level
  const [levelEnded, setLevelEnded] = useState(false); // Track if the level has ended
  const [username, setUsername] = useState("");
  const [badge, setBadge] = useState(0);
  const [userkey, setuserkey] = useState("");
  return (
    <QuizContext.Provider
      value={{
        points,
        setPoints,
        questionIndex,
        setQuestionIndex,
        currentLevel,
        setCurrentLevel,
        levelEnded,
        setLevelEnded,
        username,
        setUsername,
        badge,
        setBadge,
        userkey,
        setuserkey,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// Hook to use the context
export function useQuiz() {
  return useContext(QuizContext);
}
