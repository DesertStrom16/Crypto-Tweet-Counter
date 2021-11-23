import { ChangeEvent, useState } from "react";

const useInputBasic = (validCheck: (inputType: string) => boolean) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validCheck(value) && !isTouched;

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value: value,
    setValue,
    isValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInputBasic;
