import React, { FC } from "react";

export const Card: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return <div className={`shadow-md p-6 rounded ${className}`}>{children}</div>;
};

export default Card;
