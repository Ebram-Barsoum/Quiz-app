import React from "react";
export default function Header() {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center py-5 gap-3">
      <img
        src="logo512.png"
        alt="react logo image"
        style={{ height: "100px", width: "100px" }}
      />

      <h1 className="m-0 p-0">React Quiz App</h1>
    </div>
  );
}
