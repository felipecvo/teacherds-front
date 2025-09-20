import type { PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => {
  //  hover:shadow-md transition-shadow cursor-pointer
  // #e0e5eb
  return (
    <div className="rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm">
      {children}
    </div>
  );
};
export default Card;
