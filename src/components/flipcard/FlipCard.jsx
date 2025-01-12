// import React from "react";
// import { motion } from "framer-motion";
// import "./styles.css";

// const FlipCard = () => {
//   return (
//     <div className="App">
//       <motion.div
//         className="flip-card-container"
//         style={{
//           width: "200px",
//           height: "300px",
//           perspective: "1000px", // Allows the 3D flip effect
//         }}
//       >
//         <motion.div
//           className="flip-card"
//           whileHover={{ rotateY: 180 }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           style={{
//             width: "100%",
//             height: "100%",
//             transformStyle: "preserve-3d", // This keeps the child elements in 3D space
//             position: "relative",
//             transform: "rotateY(0deg)",
//           }}
//         >
//           {/* Front Side */}
//           <motion.div
//             className="front"
//             style={{
//               position: "absolute",
//               width: "100%",
//               height: "100%",
//               backfaceVisibility: "hidden", // Ensures the back side is not visible when flipped
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               background: "#4ecca3",
//               color: "#fff",
//               fontSize: "24px",
//               fontWeight: "bold",
//             }}
//           >
//             Front Side
//           </motion.div>

//           {/* Back Side */}
//           <motion.div
//             className="back"
//             style={{
//               position: "absolute",
//               width: "100%",
//               height: "100%",
//               backfaceVisibility: "hidden", // Ensures the front side is not visible when flipped
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               background: "#f56a79",
//               color: "#fff",
//               fontSize: "20px",
//               fontWeight: "bold",
//               transform: "rotateY(180deg)", // Initially hides the back side behind the front
//             }}
//           >
//             Back Side
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default FlipCard;

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import "./styles.css"; // Assuming you are importing your Tailwind styles
// import { useNavigate } from "react-router-dom";
// const FlipCard = ({
//   imgsrc,
//   username,
//   point,
//   operation,
//   para,
//   points,
//   setPoints,
// }) => {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const navigate = useNavigate(); // Hook for programmatic navigation

//   const updatePoints = () => {
//     setPoints((prevPoints) => {
//       const newPoints =
//         operation === "+" ? prevPoints + point : prevPoints - point;
//       // Save the new points to localStorage
//       localStorage.setItem("points", JSON.stringify(newPoints));
//       console.log(point, points, operation, username, newPoints); // Save to localStorage

//       return newPoints; // Return new points to update the state
//     });

//     if (username === "Sarita") {
//       navigate("/"); // Redirect to home page if username is Sarita
//     }

//     // Save to localStorage
//   };
//   const handleClick = () => {
//     setIsFlipped((prev) => !prev); // Toggle the flip state on click
//   };

//   return (
//     <div className="App flex flex-col items-center justify-center">
//       <motion.div
//         className="flip-card-container h-[200px] w-[200px] lg:h-[300px] lg:w-[300px] "
//         style={{
//           perspective: "1000px", // Allows the 3D flip effect
//         }}
//       >
//         <motion.div
//           className="flip-card  "
//           animate={{ rotateY: isFlipped ? 180 : 0 }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           style={{
//             width: "100%",
//             height: "100%",
//             transformStyle: "preserve-3d", // This keeps the child elements in 3D space
//             position: "relative",
//             cursor: "pointer",
//           }}
//           onClick={handleClick} // Trigger flip on click
//         >
//           {/* Front Side */}
//           <motion.div
//             className="front rounded-lg"
//             style={{
//               position: "absolute",
//               width: "100%",
//               height: "100%",
//               backfaceVisibility: "hidden", // Ensures the back side is not visible when flipped
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               background: "#4ecca3",
//               color: "#fff",
//               fontSize: "24px",
//               fontWeight: "bold",
//             }}
//           >
//             <img
//               src={imgsrc} // Replace with your image URL
//               alt="Front Side"
//               className="h-full w-full object-cover" // Ensures the image covers the entire card area
//             />
//           </motion.div>

//           {/* Back Side */}
//           <motion.div
//             className="back rounded-lg bg-purple text-center"
//             style={{
//               position: "absolute",
//               width: "100%",
//               height: "100%",
//               backfaceVisibility: "hidden", // Ensures the front side is not visible when flipped
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",

//               color: "#fff",
//               fontSize: "20px",
//               fontWeight: "bold",
//               transform: "rotateY(180deg)", // Initially hides the back side behind the front
//             }}
//           >
//             {para}
//           </motion.div>
//         </motion.div>
//       </motion.div>
//       <button
//         class="mb-8 mt-4 rounded-full bg-purple px-4 py-2 font-bold text-white hover:bg-blue-700"
//         onClick={() => updatePoints()}
//       >
//         Select {username}
//       </button>
//     </div>
//   );
// };

// export default FlipCard;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./styles.css"; // Assuming you are importing your Tailwind styles
import { useNavigate } from "react-router-dom";
const FlipCard = ({
  idx,
  imgsrc,
  username,
  handleOptionClick,
  point,
  operation,
  para,
  points,
  setPoints,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped((prev) => !prev); // Toggle the flip state on click
  };

  return (
    <div className=" flex flex-col items-center justify-center">
      <motion.div
        className="flip-card-container h-[200px] w-[200px] lg:h-[300px] lg:w-[300px] "
        style={{
          perspective: "1000px", // Allows the 3D flip effect
        }}
      >
        <motion.div
          className="flip-card  "
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d", // This keeps the child elements in 3D space
            position: "relative",
            cursor: "pointer",
          }}
          onClick={handleClick} // Trigger flip on click
        >
          {/* Front Side */}
          <motion.div
            className="front rounded-lg"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden", // Ensures the back side is not visible when flipped
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#4ecca3",
              color: "#fff",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            <img
              src={imgsrc} // Replace with your image URL
              alt="Front Side"
              className="h-full w-full object-cover" // Ensures the image covers the entire card area
            />
          </motion.div>

          {/* Back Side */}
          <motion.div
            className="back rounded-lg bg-head text-center font-openSans"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden", // Ensures the front side is not visible when flipped
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold",
              transform: "rotateY(180deg)", // Initially hides the back side behind the front
            }}
          >
            {para}
          </motion.div>
        </motion.div>
      </motion.div>
      <button
        class="mb-8 mt-4 rounded-full  bg-[#333333] px-6 py-2 text-lg text-white hover:bg-[#f8996d]"
        key={idx}
        onClick={() => handleOptionClick(points[idx])}
      >
        Select {username}
      </button>
    </div>
  );
};

export default FlipCard;
