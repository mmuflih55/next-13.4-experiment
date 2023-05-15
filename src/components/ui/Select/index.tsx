import React, { ButtonHTMLAttributes, FC, useEffect } from "react";
import { initTE, Select as TeSelect } from "tw-elements";

interface SelectProps extends ButtonHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  label?: string;
  title?: string;
  items: string[];
  multiple?: boolean;
  allowEmpty?: boolean;
}
export const Select: FC<SelectProps> = ({ ...props }) => {
  const { placeholder, label, items, title, allowEmpty, ...rest } = props;

  useEffect(() => {
    initTE({ Select: TeSelect });
  }, []);

  return (
    <div className={`${rest.className ?? ""}`}>
      {title && (
        <label className="block pointer-events-none text-neutral/500 my-1">
          {title}
        </label>
      )}

      <select
        data-te-select-init
        data-te-select-placeholder={placeholder}
        data-te-class-dropdown="bg-neutral border-slate-400 border rounded"
        data-te-class-select-option="flex flex-row items-center justify-between w-full px-4 truncate text-black bg-transparent select-none cursor-pointer data-[te-input-multiple-active]:bg-black/5 hover:[&:not([data-te-select-option-disabled])]:bg-black/5 data-[te-input-state-active]:bg-black/5 data-[te-select-option-selected]:data-[te-input-state-active]:bg-black/5 data-[te-select-selected]:data-[te-select-option-disabled]:cursor-default data-[te-select-selected]:data-[te-select-option-disabled]:text-gray-400 data-[te-select-selected]:data-[te-select-option-disabled]:bg-transparent data-[te-select-option-selected]:bg-black/[0.02] data-[te-select-option-disabled]:text-gray-400 data-[te-select-option-disabled]:cursor-default group-data-[te-select-option-group-ref]/opt:pl-7"
        data-te-class-select-input="relative p-2 peer block min-h-[auto] w-full rounded border-0 bg-transparent outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 cursor-pointer data-[te-input-disabled]:bg-[#e9ecef] data-[te-input-disabled]:cursor-default group-data-[te-was-validated]/validation:mb-4"
        data-te-class-select-label="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate text-neutral/500 transition-all duration-200 ease-out peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none data-[te-input-state-active]:scale-[0.8] text-black"
        {...rest}
      >
        {allowEmpty && <option value="" hidden></option>}

        {items.map((key) => (
          <option value={key} key={key}>
            {key
              .split("_")
              .filter((x) => x.length > 0)
              .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
              .join(" ")}
          </option>
        ))}
      </select>
      {label && <label data-te-select-label-ref>{label}</label>}
    </div>
  );
};

export default Select;
