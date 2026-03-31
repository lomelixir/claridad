import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  size = "md",
  type = "button",
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2";

  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600",
    secondary: "bg-calm-500 text-white hover:bg-calm-600",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const width = fullWidth ? "w-full" : "";
  const disabledStyles = disabled
    ? "opacity-60 cursor-not-allowed pointer-events-none"
    : "";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${disabledStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
