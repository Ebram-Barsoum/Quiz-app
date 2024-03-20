import React from "react";
import style from "./Finish.module.css";

export default function Finish({ dispatch, points, totalPoints, highScore }) {
  const percentage = Math.ceil((points / totalPoints) * 100);
  let emoji;

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🏆";
  if (percentage >= 50 && percentage < 80) emoji = "👏";
  if (percentage > 0 && percentage < 50) emoji = "🤦‍♂️";
  if (percentage === 0) emoji = "😭";

  return (
    <div>
      <p className="py-3 px-5 rounded-pill bg-info text-white">
        {emoji}
        Your score is{" "}
        <strong>
          {" "}
          {points} Out of {totalPoints}, {`(${percentage}%)`}
        </strong>
      </p>
      <p className="mt-1 text-center">
        (Your Highest Score is : {highScore} Points)
      </p>

      <button
        className={`btn btn-outline-info rounded-pill d-block m-auto ${style.restartBtn}`}
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
}
