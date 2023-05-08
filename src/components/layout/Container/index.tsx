import React, { FC, ReactNode } from "react";

import Card from "@/components/ui/Card";

const Container: FC<{ children: ReactNode }> = ({ children }) => (
  <Card className="flex w-full h-full flex-col bg-neutral">{children}</Card>
);
export default Container;
