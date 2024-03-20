import React from "react";

export default function Start({ numOfQuestions, dispatch }) {
  return (
    <div className="text-center px-2">
      <h2 className="fs-1 fw-bold">Welcome to the React Quiz!</h2>
      <p className="fw-bold fs-5">
        {numOfQuestions} questions to test your React mastery
      </p>
      <button
        className="btn bg-info text-white rounded-pill px-4"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Let's start
      </button>
    </div>
  );
}
