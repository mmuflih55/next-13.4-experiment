"use client";

import dynamic from "next/dynamic";
import React, { FC, ReactNode } from "react";

import Container from "@/components/layout/Container";

const SideBar = dynamic(() => import("@/components/layout/SideBar"), {
  ssr: false,
});

const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <main className="w-full h-full flex p-4">
    <SideBar />
    <div id="content" className="!pl-[235px] w-full">
      <Container>{children}</Container>
    </div>
  </main>
);
export default BaseLayout;
