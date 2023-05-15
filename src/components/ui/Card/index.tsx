import React, { FC } from "react";

export const Card: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`shadow-md p-6 rounded ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
