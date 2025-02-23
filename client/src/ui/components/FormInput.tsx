import React from "react";

function FormInput({
  labelText,
  labelClassName,
  inputClassName,
  inputPlaceholder,
  inputId,
  inputType,
  labelProps,
  inputProps,
}: {
  labelText: string;
  inputPlaceholder: string;
  labelClassName?: string;
  inputClassName?: string;
  inputId?: string;
  inputType: React.HTMLInputTypeAttribute;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <>
      <label htmlFor={inputId} className={`${labelClassName}`} {...labelProps}>
        {labelText}
      </label>
      <input
        type={inputType || "text"}
        className={`${inputClassName}`}
        name={inputId}
        id={inputId}
        placeholder={inputPlaceholder}
        {...inputProps}
      />
    </>
  );
}

export default FormInput;
