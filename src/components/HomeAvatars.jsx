import React from "react";
import FlipCard from "./flipcard/FlipCard";
import { div } from "motion/react-client";
import { whoNeedsHelp } from "../whoneedshelp";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeAvatars = () => {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem("points");
    return savedPoints ? JSON.parse(savedPoints) : 100;
  });
  return (
    <div>
      <h1 class="flex items-center justify-center text-4xl font-extrabold text-white md:text-4xl lg:text-5xl">
        Who Needs Help ?
      </h1>
      <div className="mt-20 flex flex-col items-center lg:flex-row lg:justify-around">
        {whoNeedsHelp.quizzes[0].options.map((option, index) => (
          <FlipCard
            key={index}
            imgsrc={option.imgsrc}
            username={option.username}
            point={option.points}
            operation={option.operation}
            para={option.para}
            points={points}
            setPoints={setPoints}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeAvatars;
