import React from "react";

const Button = ({className, type, disabled, text}) => {
  return (
    <button
      className={`w-full cursor-pointer  font-semibold rounded-lg transition-all ${className}`}
      disabled={disabled}
      type={type || "submit"}
    >
      {text}
    </button>
  );
};

export default Button;
