import React, {
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  Datepicker as TeDatepicker,
  initTE,
  Input as TeInput,
} from "tw-elements";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  title?: string;
  onChange?: (e: any) => void;
}
export const Datepicker: FC<InputProps> = ({ label, title, ...props }) => {
  const inputRef = useRef(null);
  const hanldeInputChange = useCallback(
    (e: any) => {
      if (props.onChange) props.onChange({ target: e?.target?.firstChild });
    },
    [props]
  );

  useEffect(() => {
    initTE({ Input: TeInput, Datepicker: TeDatepicker });
    window.addEventListener("dateChange.te.datepicker", hanldeInputChange);
    return () => {
      window.removeEventListener("dateChange.te.datepicker", hanldeInputChange);
    };
  }, [hanldeInputChange]);

  return (
    <>
      {title && (
        <label className="pointer-events-none block text-neutral-gray/70 my-1">
          {title}
        </label>
      )}
      <div
        className={`relative ${props.className ?? ""}`}
        data-te-input-wrapper-init
        data-te-format="dd/mm/yyyy"
        data-te-datepicker-init
      >
        <input
          ref={inputRef}
          type="text"
          pattern="\d{2}/\d{2}/\d{4}"
          className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
          id={props.id}
          {...props}
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

export default Datepicker;
