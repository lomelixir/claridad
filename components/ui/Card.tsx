import type { HTMLAttributes, MouseEventHandler, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle: string;
  children?: ReactNode;
  onClick?: () => void;
};

export default function Card({
  title,
  subtitle,
  children,
  onClick,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden w-full h-[75px] flex flex-col justify-center p-4 ${onClick ? "cursor-pointer" : ""} ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
      {children}
    </div>
  );
}
