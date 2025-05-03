import React from "react";
import { useNavigate } from "react-router-dom";

const TitlePage = () => {
  const navigate = useNavigate();
  return (
    <div class="flex min-h-screen flex-col items-center justify-center">
      {" "}
      <div
        className={` rounded-3xl bg-hover bg-opacity-70 p-4 text-center text-xl font-bold text-white shadow-md  lg:p-12 lg:text-[100px]`}
      >
        WORKPLACE &nbsp;WATCH
      </div>
      <button
        onClick={() => {
          navigate("/preform");
        }}
        className="ml-4 mt-6 rounded-md bg-head px-4 py-2 text-white transition duration-300 hover:bg-hover lg:text-lg"
      >
        Let's Play !
      </button>
    </div>
  );
};

export default TitlePage;
