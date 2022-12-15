import { useState } from "react";

const useInput = (validationFn) => {
  const [inputValue, setInputValue] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);
  const [inputIsValid, setInputIsValid] = useState(false);

  const inputHandler = (event) => {
    setInputValue(event.target.value);
    setInputIsTouched(true);

    if (!validationFn(inputValue)) {
      setInputIsValid(true);
    } else if (inputIsTouched && event.target.value.length === 0) {
      setInputIsValid(false);
    }
  };

  // const hasError = 

  const reset = () => {
    setInputValue('');
    setInputIsTouched(false);
  }

  return {
    inputValue,
    inputIsTouched,
    inputIsValid,
    inputHandler,
    reset
  }
}

export default useInput;