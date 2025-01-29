import React from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const LevelEnded = () => {
  const { points } = useQuiz();
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url("backgrounds/bg_fiish.png")`, // Background Image
        backgroundSize: "cover", // Ensures the image covers the whole div
        backgroundPosition: "center", // Centers the background image
        height: "100vh", // Full height
        width: "100%", // Full width
      }}
      className="grid items-center lg:grid-cols-2"
    >
      {/* Left Half for Content */}
      <div className="flex h-full items-center justify-center">
        <div
          className="w-full max-w-lg rounded-3xl bg-opacity-90 p-6"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
          }}
        >
          <div className="relative flex text-lg font-bold text-white lg:text-2xl">
            <div className="flex items-center">
              <iframe
                src="https://giphy.com/embed/1wX5TJZPqVw3HhyDYn"
                width="60"
                height="60"
                style={{ marginRight: "8px" }}
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
                title="Confetti Left"
              ></iframe>
              <span className="text-center text-4xl text-head">
                Congratulations, Game Completed !
              </span>
              <iframe
                src="https://giphy.com/embed/1wX5TJZPqVw3HhyDYn"
                width="60"
                height="60"
                style={{ marginLeft: "8px" }}
                className="giphy-embed"
                allowFullScreen
                title="Confetti Right"
              ></iframe>
            </div>
           
          </div>

          {/* <p className="pb-4 text-xl text-para lg:text-2xl">
            You successfully helped Sarita
          </p> */}
          {points >= 600 ? (
              <div>
                {/* Success Message */}
                <p className="pb-4 text-xl text-para lg:text-2xl">
                  You successfully helped Sarita!
                </p>
              </div>
            ) : (
              <div>
                {/* Failure Message */}
                <p className="pb-4 text-xl text-para lg:text-2xl text-center">
                  Better luck next time! You could've made better choices to help Sarita.
                </p>
              </div>
            )}
          <div className="flex pr-8 text-2xl lg:text-5xl">
            <AiFillDollarCircle className="text-3xl text-yellow-300 lg:text-5xl" />
            <div className="font-bold text-head">{points}</div>
          </div>

          <p className="text-para">Final Medicoins</p>
          <button
            className="mt-4 rounded-lg bg-[#f8996d] px-6 py-2 text-lg font-bold text-white hover:bg-para"
            type="button"
            onClick={() => {
              navigate("/postform");
            }}
          >
            Post Game Questions
          </button>
        </div>
      </div>

      {/* Empty Right Half */}
      <div className="hidden lg:block"></div>
    </div>
  );
};

export default LevelEnded;
