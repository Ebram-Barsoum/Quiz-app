import style from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className="h-100 w-100 d-flex justify-content-center align-items-center">
      <p className={style.spinner}></p>
    </div>
  );
}
