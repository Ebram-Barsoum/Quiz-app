import React from "react";

export default function Progress({
  index,
  points,
  numOfQuestions,
  totalPoints,
}) {
  const progress = (index / numOfQuestions) * 100;

  return (
    <div className="w-100 d-flex flex-column align-items-center gap-2 px-2">
      <div
        className="w-100 progress rounded-3"
        style={{ backgroundColor: "aliceblue" }}
      >
        <div
          className="progress-bar py-2 rounded-3 bg-info"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="w-100 info d-flex justify-content-between align-items-center ">
        <span>
          Question{" "}
          <span className="fw-bold">
            {index + 1 <= numOfQuestions ? index + 1 : numOfQuestions}/
            {numOfQuestions}
          </span>
        </span>
        <span>
          <span className="fw-bold">
            {points} / {totalPoints}
          </span>{" "}
          Points
        </span>
      </div>
    </div>
  );
}
