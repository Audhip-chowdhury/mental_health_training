import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import { QuestionsProvider } from "./context/QuestionsProvider.jsx";
import { QuizProvider } from "./context/QuizContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuestionsProvider>
      <QuizProvider>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </QuizProvider>
    </QuestionsProvider>
  </React.StrictMode>,
);
