import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  rounded = "full",
  className = "",
  icon = null,
  iconPosition = "left",
  onClick,
  ...props
}) => {
  // Variant styles
  const variants = {
    primary: "bg-[#5669FF] text-white hover:bg-blue-600",
    secondary: "bg-black text-white hover:bg-gray-800",
    outline:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    pink: "bg-pink-500 text-white hover:bg-pink-600",
  };

  // Size styles
  const sizes = {
    sm: "py-1 px-3 text-xs",
    md: "py-2 px-4 text-sm",
    lg: "py-3 px-6 text-base",
  };

  // Border radius styles
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <button
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        ${roundedStyles[rounded]}
        font-medium
        transition-colors duration-300
        flex items-center justify-center
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
