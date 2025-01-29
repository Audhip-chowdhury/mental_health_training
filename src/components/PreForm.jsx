import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css"; // Import the styles
import { toast, ToastContainer } from "react-toastify";
import { getDatabase, ref, push } from "firebase/database";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";




const questions = [
  {
    question: "What would be your immediate action upon noticing a distressed team member in a high-pressure environment?",
    options: [
      "Confront them publicly",
      "Privately ask if they need help",
      "Ignore it",
      "Report it to a senior"
    ],
    corrAns: 1
  },
  {
    question: "What are three behavioral signs that may indicate a colleague is in emotional distress?",
    options: [
      "Withdrawal from group activities, Sudden decline in performance, Visible signs of stress ",
      "Missing deadlines, attending meetings, enthusiastic",
      "fidgeting, irritability, proactive."
    ],
    corrAns: 0
  },
  {
    question: "What is the first step you would take if you suspect someone is facing a personal or emotional crisis in the workplace?",
    options: [
      "Approach the person privately and express concern in a non-judgmental way.",
      "Listen actively without interrupting or offering immediate solutions.",
      "Avoid making assumptions or pressuring the person to talk."
    ],
    corrAns: 1
  },
  {
    question: "How would you address bystanders in a workplace crisis to ensure they contribute positively instead of worsening the situation?",
    options: [
      "Ignore their presence",
      "Ask them to leave",
      "Involve them in a supportive",
      "Let them decide what to do"
    ],
    corrAns: 2
  },
  {
    question: "What workplace policies or guidelines can assist in responding to a mental health crisis?",
    options: [
      "Familiarity with Employee Assistance Programs (EAPs).",
      "Knowledge of mental health leave policies or accommodations.",
      "Awareness of workplace harassment or grievance procedures that might indirectly affect mental health."
    ],
    corrAns: 0
  },
  {
    question: "Which among the following is the best technique among the MHFA when coping anxiety at workplace?",
    options: [
      "5-4-3-2-1 technique",
      "Drink water",
      "Give Ventilation",
      "Panic yourself and let others handle it."
    ],
    corrAns: 0
  }
];

const MCQPage = () => {
      const { username, setUsername, userkey, setuserkey } = useQuiz();
    
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    institute: "",
    rollNumber: "",
    specialization: "",
    email:""
  });
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [corrAnswers, setcorrAnswers] = useState({});

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (questionIndex, answerIndex , answer) => {
    console.log(questionIndex , answerIndex)
  
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
    setcorrAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex === questions[questionIndex].corrAns ? 1 : 0,
    }));
    console.log( answerIndex === questions[questionIndex].corrAns ? 1 : 0)
  };

  const handleSubmit =async () => {
    // Validate personal information and answers
    if (
      !formData.name ||
      !formData.age ||
      !formData.institute ||
      !formData.rollNumber ||
      !formData.specialization
    ) {
      toast.error("Please fill in all personal information fields.");
      return;
    }

    if (Object.keys(selectedAnswers).length < questions.length) {
      toast.error("Please answer all the questions.");
      return;
    }

    setSubmitted(true);
    try {
        const database = getDatabase(); // Initialize the database
       
        const usersRef = ref(database, "users"); // Reference to "users" node
        const newUserRef = await push(usersRef, {
          Name: formData.name,
          Age: formData.age,
          Institute: formData.institute,
          PNR: formData.rollNumber,
          Specialization: formData.specialization,
          PreForm_Answers: corrAnswers,
        });
  
      
        setuserkey(newUserRef.key);
        setUsername(formData.name)
        console.log("Data stored with key: ", newUserRef.key); // Log the unique key
      } catch (e) {
        toast.error("Error writing to database: ", e);
        console.error("Error writing to database: ", e);
      }
      navigate("/disclaimer")
    console.log("Form Data:", formData);
    console.log("Selected Answers:", selectedAnswers);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const getResult = (index) => {
    return selectedAnswers[index] === questions[index].answer ? "Correct" : "Incorrect";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#f8e5d0] " >
      <h1 className="text-3xl font-semibold text-[#5A3D36] mb-4">Pre Game Questions</h1>
      
      <div className="mb-6">
        <label className="block text-[#6B4F41] font-bold">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="e.g. John Doe"
          className="mt-1 p-2 border border-[#333333] rounded  w-full lg:w-[60%] text-gray-600"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-[#6B4F41] font-bold">Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="35 "
          className="mt-1 p-2 border border-[#333333] rounded w-full lg:w-[60%] text-gray-600"
        />
      </div>

      <div className="mb-6">
        <label className="block text-[#6B4F41] font-bold">Institute:</label>
        <input
          type="text"
          name="institute"
          value={formData.institute}
          onChange={handleInputChange}
          placeholder="e.g. IIM Ahmedabad"
          className="mt-1 p-2 border border-[#333333] rounded w-full lg:w-[60%] text-gray-600"
        />
      </div>

      <div className="mb-6">
        <label className="block text-[#6B4F41] font-bold">PNR:</label>
        <input
          type="text"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleInputChange}
          placeholder="e.g. 1234"
          className="mt-1 p-2 border border-[#333333] rounded w-full lg:w-[60%] text-gray-600"
        />
      </div>

      <div className="mb-6">
        <label className="block text-[#6B4F41] font-bold">Specialization:</label>
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleInputChange}
          placeholder="e.g. HR"
          className="mt-1 p-2 border border-[#333333] rounded w-full lg:w-[60%] text-gray-600"
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#6B4F41] font-bold">Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="e.g. johndoe@gmail.com"
          className="mt-1 p-2 border border-[#333333] rounded  w-full lg:w-[60%] text-gray-600"
        />
      </div>

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
                    onChange={() => handleChange(index, optionIndex , option)}
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

export default MCQPage;
