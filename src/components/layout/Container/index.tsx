import React, { FC, ReactNode } from "react";

import Card from "@/components/ui/Card";

const Container: FC<{
  children: ReactNode;
  id?: string;
  className?: string;
}> = ({ children, className = "", ...props }) => (
  <Card
    className={`flex w-full h-full flex-col bg-neutral ${className}`}
    {...props}
  >
    {children}
  </Card>
);
export default Container;
