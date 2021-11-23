import { ChangeEvent, useState } from "react";

const useInput = (type: string) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState({ value: "", msg: "" });

  const isValid = value.trim() !== "";
  const hasError =
    (!isValid && isTouched) || (error && error.value === value && isTouched);
  const helperText = hasError
    ? value.trim() === ""
      ? `${type} cannot be empty`
      : error.msg
      ? error.msg
      : "Error"
    : null;

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  return {
    value: value,
    setIsTouched,
    hasError,
    helperText,
    setError,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
