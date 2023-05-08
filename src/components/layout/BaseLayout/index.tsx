import React, { FC, ReactNode } from "react";

import Container from "../Container";
import SideBar from "../SideBar";

const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <main className="w-full h-full flex p-4">
    <SideBar />
    <Container>{children}</Container>
  </main>
);
export default BaseLayout;
