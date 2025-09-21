import type { PropsWithChildren } from "react";

type Props = {
  className?: string;
  onClick?: () => void;
} & PropsWithChildren;
const Card = ({ children, className, onClick }: Props) => {
  //  hover:shadow-md transition-shadow cursor-pointer
  // #e0e5eb
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
export default Card;
