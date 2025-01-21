import React from "react";
import FlipCard from "../flipcard/FlipCard";

const Category1 = ({
  question,
  options,
  points,
  handleOptionClick,
  handleNextQuestion,
}) => {
  const handleOptionAndNext = (selectedPoint, index) => {
    handleOptionClick(selectedPoint); // Update points
    if (index === 0) {
      handleNextQuestion(); // Automatically go to the next question
    }
  };
  return (
    <div>
      <div>
        <h1 class="flex items-center justify-center text-4xl font-extrabold text-white md:text-4xl lg:text-5xl">
          {question}
        </h1>
        <h1 class="flex items-center justify-center text-xl  font-bold  text-black opacity-50 md:text-4xl lg:text-xl">
          (Flip the cards to know the story)
        </h1>
        <div className="mt-20 flex flex-col items-center lg:flex-row lg:justify-around lg:gap-8">
          {options[0].username.map((option, index) => (
            <FlipCard
              idx={index}
              imgsrc={options[0].imgsrc[index]}
              username={options[0].username[index]}
              para={options[0].para[index]}
              points={points}
              handleOptionClick={(selectedPoint) =>
                handleOptionAndNext(selectedPoint, index)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category1;
