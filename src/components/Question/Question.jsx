import React from "react";
import style from "./Question.module.css";
import Option from "../Option/Option";
import Timer from "../Timer/Timer";

export default function Question({
  question,
  dispatch,
  answer,
  time,
  numOfQuestions,
  index,
}) {
  //console.log(question);

  return (
    <div className="h-100 w-100 px-2">
      <h4 className="text-center mb-4">{question.question}</h4>
      <div className="options d-flex flex-column gap-2">
        {question.options.map((option, index) => (
          <Option
            key={option}
            dispatch={dispatch}
            index={index}
            answer={answer}
            correctOption={question.correctOption}
            points={index === question.correctOption ? question.points : 0}
          >
            {option}
          </Option>
        ))}
      </div>

      <div className="btns mt-3 d-flex align-items-center justify-content-between">
        <Timer time={time} dispatch={dispatch} />
        {answer !== null &&
          (index < numOfQuestions - 1 ? (
            <button
              className={`${style.btnNext} btn btn-outline-info rounded-pill`}
              onClick={() => dispatch({ type: "nextQuestion" })}
            >
              Next
            </button>
          ) : index === numOfQuestions - 1 ? (
            <button
              className={`btn btn-outline-info rounded-pill`}
              onClick={() => dispatch({ type: "finish" })}
            >
              Finish
            </button>
          ) : (
            ""
          ))}
      </div>
    </div>
  );
}
