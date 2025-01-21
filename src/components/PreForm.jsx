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
    ]
  },
  {
    question: "What are three behavioral signs that may indicate a colleague is in emotional distress?",
    options: [
      "Withdrawal from group activities or discussions.",
      "Sudden decline in performance or missing deadlines.",
      "Visible signs of stress, such as fidgeting, irritability, or avoiding eye contact."
    ]
  },
  {
    question: "What is the first step you would take if you suspect someone is facing a personal or emotional crisis in the workplace?",
    options: [
      "Approach the person privately and express concern in a non-judgmental way.",
      "Listen actively without interrupting or offering immediate solutions.",
      "Avoid making assumptions or pressuring the person to talk."
    ]
  },
  {
    question: "How would you address bystanders in a workplace crisis to ensure they contribute positively instead of worsening the situation?",
    options: [
      "Ignore their presence",
      "Ask them to leave",
      "Involve them in a supportive",
      "Let them decide what to do"
    ]
  },
  {
    question: "What workplace policies or guidelines can assist in responding to a mental health crisis?",
    options: [
      "Familiarity with Employee Assistance Programs (EAPs).",
      "Knowledge of mental health leave policies or accommodations.",
      "Awareness of workplace harassment or grievance procedures that might indirectly affect mental health."
    ]
  },
  {
    question: "Which among the following is the best technique among the MHFA when coping anxiety at workplace?",
    options: [
      "5-4-3-2-1 technique",
      "Drink water",
      "Give Ventilation",
      "Panic yourself and let others handle it."
    ]
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
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (questionIndex, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
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
          RollNumber: formData.rollNumber,
          Specialization: formData.specialization,
          PreForm_Answers: selectedAnswers,
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
    <div className="max-w-4xl mx-auto p-6 bg-[#f8e5d0]">
      <h1 className="text-3xl font-semibold text-[#5A3D36] mb-4">MCQ Questions</h1>
      
      <div className="mb-6">
        <label className="block text-[#6B4F41] font-bold">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
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
          className="mt-1 p-2 border border-[#333333] rounded w-full lg:w-[60%] text-gray-600"
        />
      </div>

      <div className="mb-6">
        <label className="block text-[#6B4F41] font-bold">Roll Number:</label>
        <input
          type="text"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleInputChange}
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

export default MCQPage;
