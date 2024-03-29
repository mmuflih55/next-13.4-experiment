"use client";

import dynamic from "next/dynamic";
import React from "react";

const OrderList = dynamic(
  () => import("@/components/modules/Orders/OrderList"),
  {
    ssr: false,
  }
);

const Dashboard = () => <OrderList />;
export default Dashboard;
