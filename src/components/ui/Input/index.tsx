import React, { FC, InputHTMLAttributes,useEffect } from "react";
import { initTE, Input as TeInput } from "tw-elements";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  title?: string;
}
export const Input: FC<InputProps> = ({ label, title, ...props }) => {
  useEffect(() => {
    initTE({ Input: TeInput });
  }, []);
  return (
    <>
      {title && (
        <label className="block pointer-events-none text-neutral/500 my-1">
          {title}
        </label>
      )}
      <div
        className={`relative ${props.className ?? ""}`}
        data-te-input-wrapper-init
      >
        <input
          type="text"
          id={props.id}
          {...props}
          className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
        />
        {label && (
          <label
            htmlFor={props.id}
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral/500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
          >
            {label}
          </label>
        )}
      </div>
    </>
  );
};

export default Input;
