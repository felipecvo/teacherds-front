import type { PropsWithChildren } from "react";

type Props = {
  className?: string;
} & PropsWithChildren;
const Card = ({ children, className }: Props) => {
  //  hover:shadow-md transition-shadow cursor-pointer
  // #e0e5eb
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};
export default Card;
