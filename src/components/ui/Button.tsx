import type { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

const Button: FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  // Base styles for all buttons
  const baseStyles =
    "cursor-pointer font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition";

  // Variant styles
  const variantStyles: Record<string, string> = {
    default: "cursor-pointer bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
    primary: "cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
    secondary: "cursor-pointer bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-400",
  };

  // Size styles
  const sizeStyles: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
