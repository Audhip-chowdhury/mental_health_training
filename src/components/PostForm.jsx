import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css"; // Import the styles
import { toast, ToastContainer } from "react-toastify";
import { getDatabase, ref, get, update  } from "firebase/database";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";




const questions= [
    {
      "question": "In the game, how did you identify Sara was in distress?",
      "options": [
        "A. She explicitly told the HR manager about her struggles.",
        "B. Her performance metrics dropped significantly.",
        "C. She exhibited noticeable behavioral changes like withdrawal and mood swings.",
        "D. She skipped work frequently without notice."
      ]
    },
    {
      "question": "What was the first step taken as an HR manager when addressing Sara's situation?",
      "options": [
        "A. Publicly addressing the issue during a team meeting.",
        "B. Having a private conversation to understand her concerns.",
        "C. Sending an email to the entire team about mental health.",
        "D. Ignoring the signs and focusing on work deadlines."
      ]
    },
    {
      "question": "During the interaction with Sara, what approach ensured better communication?",
      "options": [
        "A. Using direct and authoritative language to set expectations.",
        "B. Asking open-ended questions to encourage her to share.",
        "C. Providing quick solutions without listening to her fully.",
        "D. Delegating the issue to her immediate supervisor."
      ]
    },
    {
      "question": "How did Rahul and Jatin, the bystanders, contribute to the resolution process?",
      "options": [
        "A. They reported Sara’s issues to the HR manager without her consent.",
        "B. They helped create a supportive environment by reducing work pressure.",
        "C. They ignored the signs of distress and focused on their work.",
        "D. They criticized Sara for her lack of performance."
      ]
    },
    {
      "question": "What measure was taken to ensure Sara’s privacy during the resolution?",
      "options": [
        "A. Discussing her issues openly with the entire team.",
        "B. Keeping her concerns confidential and involving only necessary personnel.",
        "C. Sharing her challenges with her family and close friends.",
        "D. Posting a memo about workplace challenges to the company notice board."
      ]
    },
    {
      "question": "What follow-up action was taken to ensure Sara’s well-being?",
      "options": [
        "A. Monitoring her performance daily and reporting failures.",
        "B. Encouraging her to attend regular counseling sessions and checking in periodically.",
        "C. Reducing her workload indefinitely without further support.",
        "D. Avoiding further interaction to respect her privacy."
      ]
    }
  ]

const PostForm = () => {
      const { username, setUsername, userkey, setuserkey } = useQuiz();
    
  
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (questionIndex, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };
const addDatatoDb = async () => {
      console.log("here i am");
      try {
        const database = getDatabase(); // Initialize the database
        const userRef = ref(database, `users/${userkey}`); // Reference to the specific user by key
  
        // Fetch the user's current data
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          await update(userRef, { PostForm_Answers: selectedAnswers });
  
        
        } else {
          console.error(`User with key ${userkey} does not exist.`);
        }
      } catch (e) {
        console.error("Error updating user level: ", e);
      }
    };
  const handleSubmit =async () => {
    // Validate personal information and answers
   

    if (Object.keys(selectedAnswers).length < questions.length) {
      toast.error("Please answer all the questions.");
      return;
    }

    setSubmitted(true);
    addDatatoDb()
    alert("Your answers have been recorded , you can close the game now ")
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#f8e5d0]">
      <h1 className="text-3xl font-semibold text-[#5A3D36] mb-4">Post Game Questions</h1>
      
      <form>
        {questions.map((question, index) => (
          <div key={index} className="mb-6 bg-white p-4 rounded-lg shadow-lg">
            <p className="font-semibold text-[#6B4F41] text-lg">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className="block text-[#6B4F41] hover:text-[#9a6a5d] cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={selectedAnswers[index] === option}
                    onChange={() => handleChange(index, option)}
                    className="mr-2 text-[#333333]"
                  />
                  {option}
                </label>
              ))}
            </div>
            
          </div>
        ))}
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#5A3D36] text-white px-4 py-2 rounded hover:bg-[#9a6a5d] transition duration-200"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PostForm;
