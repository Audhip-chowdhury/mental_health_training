// import { useEffect, useRef } from "react";
// "use client";

// import { Carousel } from "flowbite-react";

// export default function Disclaimer() {
//   return (
//     <div className="">
//   <h1 class="flex items-center justify-center text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
//     Disclaimer
//   </h1>

//       <div className="mt-24 h-56 sm:h-64 xl:h-80 2xl:h-96">
//         <Carousel>
//           <div className="flex h-full items-center justify-center bg-gray-700 text-white">
//             You are a full-time HR professional/manages at a thriving
//             Organization- ABC Pvt. Ltd Recently some talented employees in your
//             team are showing signs of distress.
//           </div>
//           <div className="flex h-full items-center justify-center bg-gray-700 text-white">
//             Slide 1
//           </div>
//           <div className="flex h-full items-center justify-center bg-gray-700 text-white">
//             Slide 1
//           </div>
//         </Carousel>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Carousel } from "flowbite-react";
import { div, nav } from "motion/react-client";
import { useNavigate } from "react-router-dom";
import WebFont from "webfontloader";
import { useQuiz } from "../../context/QuizContext";
import database from "../../config/configuration";
import { collection, addDoc } from "firebase/firestore";
// import "./style.css";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import { getDatabase, ref, get, update  } from "firebase/database";

// public\backgrounds\Background (1) crop.png

const Disclaimer = () => {
  const cards = [
    "You are a full-time HR professional/manages at a thriving Organization- ABC Pvt. Ltd Recently some talented employees in your team are showing signs of distress.The company has entrusted you with acquiring 1000 MEDICONS by choosing the appropriate choices and creating a supportive environment thus helping the access to people resources.",
    `With every correct decision, you earn MEDICOINs that can be used for "Mental Health Support" such as therapy session, wellness program or stress management workshop. The Game is not just about a single employee any medicoins you earn can be redeemed for broader medical benefits like arranging team wellness activity funding health insurance upgrades or securing wellness retreat for the entire team.`,
    "Will you be able to strike the right balance between a supportive leader and managing company resources efficiently?",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [usernameper, setuserNameper] = useState("");
  const { username, setUsername, userkey, setuserkey } = useQuiz();
  const navigate = useNavigate();
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Press Start 2P", "serif"],
      },
    });
  }, []);

  const addDatatoDb = async () => {
      console.log("here i am");
      try {
        const database = getDatabase(); // Initialize the database
        const userRef = ref(database, `users/${userkey}`); // Reference to the specific user by key
  
        // Fetch the user's current data
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          await update(userRef, { GamingName: username });
  
        
        } else {
          console.error(`User with key ${userkey} does not exist.`);
        }
      } catch (e) {
        console.error("Error updating user level: ", e);
      }
    };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFading(true); // Trigger fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1); // Update card
        setIsFading(false); // Reset fade-out
      }, 500); // Match the duration of the fade-out animation
    }
  };
  const handleBack = () => {
    if (currentIndex > 0) {
      setIsFading(true); // Trigger fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex - 1); // Update to the previous card
        setIsFading(false); // Reset fade-out
      }, 500); // Match the duration of the fade-out animation
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    if (username === "") {
      toast.error("Enter your name please!", {
        position: "top-center",
        autoClose: 3000, // 3 seconds
      });
      return;
    }

    addDatatoDb()
    navigate("/")
  };
  const styles = {
    container: {
      backgroundImage: `url('/backgrounds/background_main_blur.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      height: "100vh",
      width: "100%",
    },
    containerMobile: {
      "@media (max-width: 768px)": {
        backgroundImage: `url('/backgrounds/background_main_blur_mobile.jpg')`,
      },
    },
    card: {
      transition: "opacity 0.7s ease-in-out",
      opacity: isFading ? 0 : 1,
    },
  };

  return (
    <div className="bg-container bg-opacity-20 flex flex-col min-h-screen" style={styles.container}>
    <ToastContainer></ToastContainer>
    <div className="lg:w-[75%]">
      <h1 className="text-head font-bebas flex items-center justify-center pt-16 text-6xl  md:text-5xl lg:text-8xl">
        Background
      </h1>
      <div className="font-openSans mt-16 flex flex-col items-center justify-center leading-loose">
        <div
          className={`bg-hover flex w-[90%] flex-col rounded-3xl bg-opacity-70 p-8 text-center text-lg font-bold text-white shadow-md transition-opacity duration-700 ease-in-out lg:w-[50%] lg:text-xl ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {cards[currentIndex]}
          {currentIndex === cards.length - 1 && (
            <div className="">
              <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your gaming name"
                  className="focus:ring-hover text-para w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2"
                />
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-head hover:bg-hover rounded-md p-4 text-white transition duration-300"
                    onClick={() => handleFormSubmit()}
                  >
                    Let's Go
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <span>
        {currentIndex > 0 && (
            <button
              onClick={handleBack}
              className="bg-head hover:bg-hover mt-6 rounded-md px-4 py-2 text-white transition duration-300 "
            >
              Back
            </button>
          )}
        {/* Next Button */}
        {currentIndex < cards.length - 1 && (
          <button
            onClick={handleNext}
            className="bg-head hover:bg-hover mt-6 rounded-md px-4 py-2 text-white transition duration-300 ml-4"
          >
            Next
          </button>
        )}
        </span>
      </div>
    </div>
  
    {/* This will keep the NEWDISCLAIMER div at the bottom */}
    <div className="NEWDISCLAIMER font-openSans mt-20 flex flex-col items-center justify-center leading-loose mt-auto mb-8">
      <div
        className={`bg-hover flex w-[90%] flex-col rounded-3xl bg-opacity-70 p-2 text-center text-sm font-bold text-white shadow-md transition-opacity duration-700 ease-in-out lg:w-[90%] lg:text-base`}
      >
        Disclaimer : This game is only meant to play in Learning and Development class of Dr.Suruchi Pandey , not to be tested in real life scenario
      </div>
    </div>
  </div>
  
  );
};

export default Disclaimer;
