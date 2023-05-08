import React from "react";

import BaseLayout from "@/components/layout/BaseLayout";

import OrderList from "../Orders/OrderList";

const Dashboard = () => (
  <BaseLayout>
    <OrderList />
  </BaseLayout>
);
export default Dashboard;
