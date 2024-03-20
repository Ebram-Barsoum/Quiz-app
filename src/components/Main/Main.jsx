import React from "react";
import style from "./Main.module.css";

export default function Main({ children }) {
  return (
    <div
      className={`${style.main} h-50 d-flex flex-column justify-content-center align-items-center gap-4`}
    >
      {children}
    </div>
  );
}
