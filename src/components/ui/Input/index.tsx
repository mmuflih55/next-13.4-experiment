import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export const Input: FC<InputProps> = ({ ...props }) => {
  return (
    <input
      {...props}
      className="shadow-md p-1 m-1 b-1 border border-primary-blue/20 rounded-md"
    />
  );
};

export default Input;
