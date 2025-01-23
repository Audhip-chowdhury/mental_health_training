import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import icons
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import { FaYoutube } from "react-icons/fa"; // Import icons

const Category2 = ({
  question,
  options,
  points,
  correctAnswers,
  handleOptionClick,
  handleNextQuestion,
  ytVideos,
  numofoptions,
  optionsmessage
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [clickedVideos, setClickedVideos] = useState([]);
  const [modalVideo, setModalVideo] = useState(null); // Track the currently opened video in the modal

  useEffect(() => {
    setSelectedOptions([]); // Reset selected option
    setSubmitted(false);
    setClickedVideos([]); // Reset submission state
    setModalVideo(null); // Close modal when question changes
  }, [question]); // Trigger reset when question changes

  // Toggle selection for an option
  const handleVideoClick = (index) => {
    if (!clickedVideos.includes(index)) {
      setClickedVideos((prevClicked) => [...prevClicked, index]);
    }
    setModalVideo(ytVideos[index]);
  };
  const handleCloseModal = () => {
    setModalVideo(null);
  };
  const handleOptionSelect = (index) => {
    if (!submitted) {
      setSelectedOptions((prevSelected) => {
        if (prevSelected.includes(index)) {
          // Deselect if already selected
          return prevSelected.filter((i) => i !== index);
        } else if (numofoptions === 2 && prevSelected.length >= 2) {
          // If the number of options is 2 and the limit is reached, do nothing
          toast.warn("You can only select two options!", {
            position: "top-center",
            autoClose: 2000, // 2 seconds
          });
          return prevSelected;
        } else {
          // Select if not already selected
          return [...prevSelected, index];
        }
      });
    }
  };

  // Handle Submit
  const handleSubmit = () => {
    if (!submitted) {
      if (selectedOptions.length === 0) {
        // Alert if no options are selected
        toast.error("Nope, submitting nothing? Not on my watch. Pick one! 👀", {
          position: "top-center",
          autoClose: 3000, // 3 seconds
        });
        return;
      }
      if (clickedVideos.length !== ytVideos.length) {
        // Alert if not all videos have been clicked
        toast.error(
          "You gotta click all the video links first. They're waiting for you! 🎥",
          {
            position: "top-center",
            autoClose: 3000, // 3 seconds
          },
        );
        return;
      }
      const totalPoints = selectedOptions.reduce(
        (sum, idx) => sum + points[idx],
        0,
      );
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
              <p className="text-center font-openSans text-sm font-bold text-black lg:text-[20px] mt-2 mb-2">
              ({optionsmessage})
            </p>
            </p>
            
          </div>

          {/* Options */}
          <div className="flex w-full flex-col items-center gap-[10px] text-sm sm:gap-[20px] sm:text-base md:w-[50%]">
            {options.map((option, index) => (
              <div
                key={index}
                className={` flex w-full items-center justify-between gap-4 rounded-lg border bg-[#D78859] bg-opacity-90 px-4 py-2 text-white hover:bg-[#f8996d] ${
                  selectedOptions.includes(index)
                    ? "bg-opselect hover:bg-opselect"
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
                {ytVideos[index] && (
                  <button
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600"
                    onClick={() => handleVideoClick(index)}
                  >
                    <FaYoutube
                      className={`text-[24px] lg:text-[27px] ${
                        clickedVideos.includes(index)
                          ? "text-red-300" // Green if clicked
                          : "hover:text-3xl hover:text-red-800" // Red hover if not clicked
                      }`}
                    />
                  </button>
                )}
                {submitted &&
                  (correctAnswers.includes(index) ? (
                    <FaCheckCircle className="text-xl text-green-500" />
                  ) : selectedOptions.includes(index) ? (
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
      {modalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative h-[80%] w-[90%] max-w-4xl">
            <iframe
              src={modalVideo}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="h-full w-full rounded-lg"
            ></iframe>
            <button
              className="absolute right-2 top-2 text-2xl text-white hover:text-red-500"
              onClick={handleCloseModal}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category2;

{
  /* <div
                key={index}
                className={` flex w-full items-center justify-between gap-4 rounded-lg border bg-[#D78859] bg-opacity-90 px-4 py-2 text-white hover:bg-[#f8996d] ${
                  selectedOptions.includes(index)
                    ? "bg-[#333333] bg-opacity-100"
                    : "bg-[#D78859] bg-opacity-90" // Highlight selected option
                }`}
              ></div> */
}
