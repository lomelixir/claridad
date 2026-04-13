import type { HTMLAttributes, MouseEventHandler, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle: string;
  emoji: string;
  children?: ReactNode;
  onClick?: () => void;
};

export default function Card({
  title,
  subtitle,
  emoji,
  children,
  onClick,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden w-full h-[75px] flex flex-row items-center justify-between p-4 ${onClick ? "cursor-pointer" : ""} ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      <div className="flex flex-col flex-1">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
        {children}
      </div>
      <span className="text-2xl ml-4">{emoji}</span>
    </div>
  );
}
