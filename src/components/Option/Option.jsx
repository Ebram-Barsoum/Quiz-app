import React from "react";
import style from "./Option.module.css";
export default function Option({
  children,
  dispatch,
  index,
  answer,
  correctOption,
  points,
}) {
  return (
    <button
      className={`${style.option} py-2 ps-3 rounded-pill text-start ${
        answer === index ? " ms-3" : ""
      } ${
        answer !== null
          ? index === correctOption
            ? "bg-info text-white"
            : "bg-danger-subtle text-black"
          : ""
      }`}
      disabled={answer !== null}
      onClick={() =>
        dispatch({ type: "answerQuestion", payload: { index, points } })
      }
    >
      {children}
    </button>
  );
}
