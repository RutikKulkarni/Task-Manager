import React, { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
