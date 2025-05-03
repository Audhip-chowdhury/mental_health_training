import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css"; // Import the styles
import { toast, ToastContainer } from "react-toastify";
import { getDatabase, ref, push } from "firebase/database";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question:
      "What would be your immediate action upon noticing a distressed team member in a high-pressure environment?",
    options: [
      "Confront them publicly",
      "Privately ask if they need help",
      "Ignore it",
      "Report it to a senior",
    ],
    corrAns: 1,
  },
  {
    question:
      "What are three behavioral signs that may indicate a colleague is in emotional distress?",
    options: [
      "Withdrawal from group activities, Sudden decline in performance, Visible signs of stress ",
      "Missing deadlines, attending meetings, enthusiastic",
      "Fidgeting, irritability, proactive.",
    ],
    corrAns: 0,
  },
  {
    question:
      "What is the first step you would take if you suspect someone is facing a personal or emotional crisis in the workplace?",
    options: [
      "Approach the person privately and express concern in a non-judgmental way.",
      "Listen actively without interrupting or offering immediate solutions.",
      "Avoid making assumptions or pressuring the person to talk.",
    ],
    corrAns: 1,
  },
  {
    question:
      "How would you address bystanders in a workplace crisis to ensure they contribute positively instead of worsening the situation?",
    options: [
      "Ignore their presence",
      "Ask them to leave",
      "Involve them in a supportive",
      "Let them decide what to do",
    ],
    corrAns: 2,
  },
  {
    question:
      "What workplace policies or guidelines can assist in responding to a mental health crisis?",
    options: [
      "Familiarity with Employee Assistance Programs (EAPs).",
      "Knowledge of mental health leave policies or accommodations.",
      "Awareness of workplace harassment or grievance procedures that might indirectly affect mental health.",
    ],
    corrAns: 0,
  },
  {
    question:
      "Which among the following is the best technique among the MHFA when coping anxiety at workplace?",
    options: [
      "5-4-3-2-1 technique",
      "Drink water",
      "Give Ventilation",
      "Panic yourself and let others handle it.",
    ],
    corrAns: 0,
  },
];

const MCQPage = () => {
  const { username, setUsername, userkey, setuserkey } = useQuiz();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    institute: "",
    rollNumber: "",
    specialization: "",
    email: "",
  });

  const [step, setStep] = useState(1); // 1 = Personal Info, 2 = Quiz
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [corrAnswers, setcorrAnswers] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const { name, age, institute, rollNumber, specialization } = formData;
    if (!name || !age || !institute || !rollNumber || !specialization) {
      toast.error("Please fill in all personal information fields.");
      return;
    }
    setUsername(name);
    setStep(2);
  };

  const handleChange = (questionIndex, answerIndex, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
    setcorrAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex === questions[questionIndex].corrAns ? 1 : 0,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      toast.error("Please answer all the questions.");
      return;
    }

    try {
      const database = getDatabase();
      const usersRef = ref(database, "users");
      const newUserRef = await push(usersRef, {
        Name: formData.name,
        Age: formData.age,
        Institute: formData.institute,
        PNR: formData.rollNumber,
        Specialization: formData.specialization,
        Email: formData.email,
        PreForm_Answers: corrAnswers,
      });

      setuserkey(newUserRef.key);
      navigate("/disclaimer");
    } catch (error) {
      toast.error("Error writing to database.");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-[#f8e5d0] p-6">
      <h1 className="mb-6 text-3xl font-semibold text-[#5A3D36]">
        {step === 1 ? "Personal Details" : "Pre Game Questions"}
      </h1>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <div>
          {[
            { key: "name", label: "Name" },
            { key: "age", label: "Age", type: "number" },
            { key: "institute", label: "Institute/Company" },
            { key: "rollNumber", label: "Work Experience" },
            { key: "specialization", label: "Specialization" },
            { key: "email", label: "Email", type: "email" },
          ].map(({ key, label, type }) => (
            <div key={key} className="mb-4">
              <label className="mb-1 block font-bold text-[#6B4F41]">
                {label}
              </label>
              <input
                type={type || "text"}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-400 p-2 text-gray-700 lg:w-[60%]"
                placeholder={`Enter your ${label}`}
              />
            </div>
          ))}

          <button
            onClick={handleNext}
            className="mt-4 rounded bg-[#5A3D36] px-4 py-2 text-white transition duration-200 hover:bg-[#9a6a5d]"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: MCQs */}
      {step === 2 && (
        <form>
          {questions.map((question, index) => (
            <div key={index} className="mb-6 rounded-lg bg-white p-4 shadow">
              <p className="text-lg font-semibold text-[#6B4F41]">
                {question.question}
              </p>
              <div className="mt-2 space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className="block cursor-pointer text-[#6B4F41]"
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={selectedAnswers[index] === option}
                      onChange={() => handleChange(index, optionIndex, option)}
                      className="mr-2"
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
            className="rounded bg-[#5A3D36] px-4 py-2 text-white transition duration-200 hover:bg-[#9a6a5d]"
          >
            Submit
          </button>
        </form>
      )}

      <ToastContainer />
    </div>
  );
};

export default MCQPage;
