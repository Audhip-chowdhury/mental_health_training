import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import icons
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Toastify styles

const Category3 = ({
  question,
  options,
  points,
  correctAnswers,
  handleOptionClick,
  handleNextQuestion,
}) => {
  const [selectedOption, setSelectedOption] = useState(null); // Only one option can be selected
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    setSelectedOption(null); // Reset selected option
    setSubmitted(false); // Reset submission state
  }, [question]); // Trigger reset when question changes

  // Handle selection of a single option
  const handleOptionSelect = (index) => {
    if (!submitted) {
      setSelectedOption(index); // Set selected option
    }
  };

  // Handle Submit
  const handleSubmit = () => {
    if (!submitted) {
      if (selectedOption === null) {
        // Alert if no options are selected
        toast.error("Nope, submitting nothing? Not on my watch. Pick one! 👀", {
          position: "top-center",
          autoClose: 3000, // 3 seconds
        });
        return;
      }
      const totalPoints = points[selectedOption] || 0; // Add points of selected option
      handleOptionClick(totalPoints); // Update global points
      setSubmitted(true); // Mark as submitted
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="container mx-auto px-[10px] md:w-[80%]">
        <div className="flex min-h-[45vh] w-full flex-col items-center justify-around gap-[20px] p-[20px] md:flex-row md:justify-between">
          {/* Question and Points Display */}
          <div className="flex h-[20vh] w-full flex-col items-start justify-center gap-[20px]  md:w-[50%] md:justify-between lg:h-[40vh] ">
            <p className="text-left font-openSans text-lg font-bold text-head lg:text-[27px]">
              {question}
            </p>
          </div>

          {/* Options */}
          <div className="flex w-full flex-col items-center gap-[10px] text-sm sm:gap-[20px] sm:text-base md:w-[50%]">
            {options.map((option, index) => (
              <div
                key={index}
                className={` flex w-full items-center justify-between gap-4 rounded-lg border bg-[#D78859] bg-opacity-90 px-4 py-2 text-white hover:bg-[#f8996d] ${
                  selectedOption === index
                    ? "bg-opselect  hover:bg-opselect"
                    : "bg-[#D78859]" // Highlight selected option
                }`}
              >
                <button
                  className="flex-1 text-left"
                  onClick={() => handleOptionSelect(index)}
                  disabled={submitted} // Disable after submission
                >
                  {option}
                </button>
                {submitted &&
                  (correctAnswers.includes(index) ? (
                    <FaCheckCircle className="text-xl text-green-500" />
                  ) : selectedOption === index ? (
                    <FaTimesCircle className="text-xl text-red-500" />
                  ) : null)}
              </div>
            ))}

            {/* Submit Button */}
            {!submitted && (
              <button
                className="mt-4 rounded-lg bg-[#333333] px-6 py-2 text-lg text-white hover:bg-[#f8996d]"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}

            {/* Next Question Button */}
            {submitted && (
              <button
                className="mt-4 rounded-lg bg-[#4C7C58] px-6 py-2 text-white hover:bg-green-700"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category3;
