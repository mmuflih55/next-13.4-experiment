import React, { ButtonHTMLAttributes, FC, ReactNode, useEffect } from "react";
import { initTE, Ripple } from "tw-elements";

import { Loading } from "..";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
export const Button: FC<ButtonProps> = ({ ...props }) => {
  const { isLoading = false, leftIcon, rightIcon, ...rest } = props;

  useEffect(() => {
    initTE({ Ripple });
  }, []);

  return (
    <button
      type="button"
      {...rest}
      data-te-ripple-init
      data-te-ripple-color="light"
      className={`bg-primary rounded shadow-md text-neutral text-sm p-2 m-1 h-9 flex items-center justify-center relative hover:opacity-80 ${props.className}`}
    >
      {leftIcon && <span className="h-5 w-5 mr-1">{leftIcon}</span>}
      {props.children}
      {rightIcon && <span className="h-5 w-5 ml-1">{rightIcon}</span>}

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
