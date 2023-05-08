import React, { ButtonHTMLAttributes, FC } from "react";

import { Loading } from "..";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}
export const Button: FC<ButtonProps> = ({ ...props }) => {
  const { isLoading = false, ...rest } = props;
  return (
    <button
      {...rest}
      className={`bg-primary-blue/100 text-neutral p-1 m-1 flex items-center justify-center relative ${props.className}`}
    >
      {props.children}

      {isLoading && (
        <Loading
          size={2}
          className="max-h-full max-w-full absolute right-1 w-5 h-5"
        />
      )}
    </button>
  );
};

export default Button;
