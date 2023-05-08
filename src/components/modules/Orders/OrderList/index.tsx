import React from "react";

import { Button, Table } from "@/components/ui";

const OrderList = () => (
  <>
    <div className="flex justify-between">
      <div className="page-title">
        <h4>Order List</h4>
      </div>
      <div className="flex">
        <input />
        <Button>Export</Button>
        <Button>Add new Order</Button>
      </div>
    </div>
    <div>
      <Table />
    </div>
  </>
);
export default OrderList;
