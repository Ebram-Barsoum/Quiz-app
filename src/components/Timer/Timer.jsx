import React, { useEffect } from "react";

export default function Timer({ time, dispatch }) {
  const { minutes, seconds } = time;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "countDown" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <p className={`border border-1 border-info py-1 px-3 rounded-pill mb-0`}>
      {minutes}:{seconds >= 10 ? seconds : "0" + seconds}
    </p>
  );
}
