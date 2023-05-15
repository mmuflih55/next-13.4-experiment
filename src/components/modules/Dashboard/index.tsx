"use client";

import dynamic from "next/dynamic";
import React from "react";

import BaseLayout from "@/components/layout/BaseLayout";

const OrderList = dynamic(
  () => import("@/components/modules/Orders/OrderList"),
  {
    ssr: false,
  }
);

const Dashboard = () => (
  <BaseLayout>
    <OrderList />
  </BaseLayout>
);
export default Dashboard;
