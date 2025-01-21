import { useQuestions } from "../context/QuestionsProvider";
import { useQuiz } from "../context/QuizContext";
import Button from "./Button";
import Option from "./Option";
import Progress from "./Progress";
import { quizData } from "../data";
import Category1 from "./uiCategories/Category1";
import Category2 from "./uiCategories/Category2";
import Category3 from "./uiCategories/Category3";
import { AiFillDollarCircle } from "react-icons/ai";
import { GiRibbonMedal } from "react-icons/gi";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get, update } from "firebase/database";
import LevelEnded from "./levelended/LevelEnded";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

function Question() {
  // const { dispatch, answer, index, questionsNum, secondRemaining } =
  //   useQuestions();
  const {
    points,
    setPoints,
    questionIndex,
    setQuestionIndex,
    currentLevel,
    setCurrentLevel,
    levelEnded,
    setLevelEnded,
    badge,
    setBadge,
    username,
    userkey,
    isadded,
    setisadded
  } = useQuiz();
  const [isVisible, setIsVisible] = useState(true);
  const currentQuiz = quizData.quizzes[currentLevel]; // Current level data
  const currentQuestion = currentQuiz.questions[questionIndex]; // Current question data
  const navigate = useNavigate();

  const addPointstodb = async (pptionpoints) => {
    console.log("here i am");
    try {
      const database = getDatabase(); // Initialize the database
      const userRef = ref(database, `users/${userkey}`); // Reference to the specific user by key

      // Fetch the user's current data
      const snapshot = await get(userRef);
      var queslvl = currentLevel + 1;
      var quesind = questionIndex + 1;
      var questionandlevel = "Level:" + queslvl + " Question:" + quesind;
      if (snapshot.exists()) {
        const userData = snapshot.val(); // Get the user's data as an object

        // Check if the questionandlevel key already exists
        const currentPoints = userData[questionandlevel] || 0; // Default to 0 if it doesn't exist

        // Update the value (add to existing points or create a new entry)
        const newPoints = currentPoints + pptionpoints;
        await update(userRef, { [questionandlevel]: newPoints });

        console.log(
          `User with key ${userkey} updated with ${questionandlevel}: ${newPoints}`,
        );
      } else {
        console.error(`User with key ${userkey} does not exist.`);
      }
    } catch (e) {
      console.error("Error updating user level: ", e);
    }
  };

  const addFinalPointstodb = async () => {
    console.log("here i am");
    try {
      const database = getDatabase(); // Initialize the database
      const userRef = ref(database, `users/${userkey}`); // Reference to the specific user by key

      // Fetch the user's current data
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        await update(userRef, { Final_Points: points });

        console.log(`User with key ${userkey} updated with : ${points}`);
      } else {
        console.error(`User with key ${userkey} does not exist.`);
      }
    } catch (e) {
      console.error("Error updating user level: ", e);
    }
  };

  const handleOptionClick = (optionPoints) => {
    setPoints(points + optionPoints);
    if(Math.sign(optionPoints)==1) // Update points
    setisadded(1)
    else if(Math.sign(optionPoints) == -1)
    setisadded(0)
    addPointstodb(optionPoints);
  };
  const handleNextQuestion = () => {
    setIsVisible(false);
    // if (questionIndex < quizData.quizzes[currentLevel].questions.length - 1) {
    //   setQuestionIndex(questionIndex + 1);
    //   // Move to the next question
    // } else {
    //   setLevelEnded(true); // End the level
    // }
    setTimeout(() => {
      if (questionIndex < quizData.quizzes[currentLevel].questions.length - 1) {
        setQuestionIndex(questionIndex + 1); // Move to next question
      } else {
        setLevelEnded(true); // End the level
      }
      setIsVisible(true); // Show the new question
    }, 300); // Wait for the exit animation to complete
  };
  const handleNextLevel = () => {
    if (currentLevel < quizData.quizzes.length - 1) {
      setCurrentLevel(currentLevel + 1); // Move to the next level
      setQuestionIndex(0); // Reset question index
      setLevelEnded(false); // Reset levelEnded
    } else {
      addFinalPointstodb();
      // const data = [{ Name: username, Badge: badge, Points: points }];
      // const worksheet = XLSX.utils.json_to_sheet(data);

      // // Create a workbook and append the worksheet
      // const workbook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // // Export the workbook to an Excel file
      // XLSX.writeFile(workbook, "DataExport.xlsx");
      navigate("/finish");
      //insert in db
    }
  };

  useEffect(() => {
    if (levelEnded) {
      setBadge((prevBadge) => prevBadge + 1);
    }
  }, [levelEnded]);
  useEffect(() => {
    if (username === "") {
      navigate("/disclaimer");
    }
  }, []);
  const renderCategoryComponent = () => {
    switch (currentQuestion.Category) {
      case 1:
        return (
          <Category1
            question={currentQuestion.question}
            options={currentQuestion.options}
            points={currentQuestion.points}
            handleOptionClick={handleOptionClick}
            handleNextQuestion={handleNextQuestion}
          />
        );

      case 2:
        return (
          <Category2
            question={currentQuestion.question}
            options={currentQuestion.options}
            points={currentQuestion.points}
            correctAnswers={currentQuestion.correctanswers} // Index of correct options
            handleOptionClick={handleOptionClick}
            handleNextQuestion={handleNextQuestion}
            ytVideos={currentQuestion.ytVideos}
          />
        );

      case 3:
        return (
          <Category3
            question={currentQuestion.question}
            options={currentQuestion.options}
            points={currentQuestion.points}
            correctAnswers={currentQuestion.correctanswers} // Index of correct options
            handleOptionClick={handleOptionClick}
            handleNextQuestion={handleNextQuestion}
          />
        );
      default:
        return <p>Category not defined.</p>;
    }
  };
  if (levelEnded) {
    return (
      <LevelEnded
        currentQuiz={currentQuiz}
        points={points}
        handleNextLevel={handleNextLevel}
      />
    );
  }

  return (
    <div>
      <AnimatePresence initial={false}>
        {isVisible ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            key="question-box"
          >
            {renderCategoryComponent()}
          </motion.div>
        ) : null}
      </AnimatePresence>
      {/* <div>{points}</div>
      <button onClick={handleNextQuestion}>Next Question</button> */}
      {/* {username} */}
    </div>
  );
}

export default Question;

// return (
// <div className="container mx-auto px-[10px] md:w-[80%]">
//   <div className="flex min-h-[45vh] w-full flex-col items-center justify-around gap-[20px] p-[20px] md:flex-row md:justify-between">
//     <div className="flex h-[40vh] w-full flex-col items-start justify-center gap-[20px] md:w-[50%] md:justify-between">
//       <p className="text-left text-xl sm:text-2xl">
//         <h2>Points: {points}</h2>
//         {currentQuestion.question}
//       </p>
//       <div className="flex w-full flex-wrap items-center justify-between gap-[10px]">
//         <Progress
//           index={index}
//           questionsNum={questionsNum}
//           answer={answer}
//         />
//         <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
//       </div>
//     </div>

//     <div className="flex w-full flex-col  items-center gap-[10px] text-sm sm:gap-[20px] sm:text-base md:w-[50%]">
//       {currentQuestion.options.map((option, index) => (
//         <button
//           className="option flex items-center justify-between gap-[5px]"
//           onClick={() => handleOptionClick(currentQuestion.points[index])}
//           // disabled={hasAnswered}
//         >
//           <h3>{option}</h3>

//           {/* {answer && (
//             <img
//               src={
//                 question.answer === option ? correctImage : incorrectImage
//               }
//               alt=""
//               className="w-[20px]"
//             />
//           )} */}
//         </button>
//       ))}
//       {/* {currentQuestion?.options?.map((q, i) => {
//         return (
//           <Option
//             key={i}
//             option={currentQuestion?.options[i]}
//             dispatch={dispatch}
//             answer={answer}
//             question={currentQuestion}
//           />
//         );
//       })} */}

//       {/* {answer && index < questionsNum - 1 ? (
//         <Button onClick={() => dispatch({ type: "nextQuestion" })}>
//           Next Question
//         </Button>
//       ) : null}

//       {answer && index === questionsNum - 1 ? (
//         <Button onClick={() => dispatch({ type: "finish" })}>Finish</Button>
//       ) : null} */}
//       <button onClick={handleNextQuestion}>Next Question</button>
//     </div>
//   </div>
// </div>
// );
