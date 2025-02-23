import React from "react";

function Button({
  children,
  onClick,
  className,
  ...buttonProps
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default Button;
