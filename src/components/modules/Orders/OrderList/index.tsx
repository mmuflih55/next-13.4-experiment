"use client";

import {
  DocumentArrowDownIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import React, { ChangeEvent, useRef, useState } from "react";

import { Button, Input, Modal, Select, Table } from "@/components/ui";
import { Order } from "@/interfaces/order";
import { orders } from "@/vars/mockData";

import AddOrderForm from "./AddOrderForm";
import DetailRow from "./DetailRow";

const OrderList = () => {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string[]>([]);
  const tableRef = useRef();
  const hanldeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const hanldeSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(
      Array.from(e.target.selectedOptions).map((filter) => filter.value)
    );
  };

  const formatedData = orders.map((order: Order) => ({
    ...order,
    order_cost:
      "€ " +
      new Intl.NumberFormat("en", {
        maximumSignificantDigits: 3,
      }).format(order.order_cost),
    amount_paid:
      "€ " +
      new Intl.NumberFormat("en", {
        maximumSignificantDigits: 3,
      }).format(order.amount_paid),
  }));

  const handleExport = () => {
    // @ts-ignore:next-line
    if (tableRef.current) tableRef.current.export();
  };

  return (
    <>
      <div className="flex flex-col md:items-center md:justify-between md:flex-row gap-4">
        <div className="page-title">
          <h3>
            <b>Order List</b>
          </h3>
        </div>
        <div className="flex flex-col md:flex-row gap-1">
          <div className="flex flex-col items-center gap-0 md:flex-row">
            <Input
              className="w-full"
              placeholder="Search here"
              onChange={hanldeInputChange}
            />
          </div>
          <div className="flex items-center">
            <Select
              className="w-full"
              placeholder="Filter"
              items={
                formatedData.length > 0 ? Object.keys(formatedData[0]) : []
              }
              onChange={hanldeSelectChange}
              multiple
            />
          </div>
          <div className="flex flex-col gap-0 md:flex-row">
            <Button
              aria-label="export-btn"
              className="bg-secondary xs:max-sm:w-full md:justify-start"
              leftIcon={<DocumentArrowDownIcon />}
              onClick={handleExport}
            >
              Export
            </Button>
            <Button
              className="w-full"
              aria-label="add-new-order-btn"
              leftIcon={<PlusCircleIcon />}
              data-te-toggle="modal"
              data-te-target="#addModal"
            >
              Add new Order
            </Button>
          </div>
        </div>
      </div>
      <Table
        data={formatedData}
        search={search}
        filter={filter}
        tableRef={tableRef}
        withAction
        withPagination
        canExpand
        description={{
          p_lead_time: "Product Lead Time",
          p_duration: "Product Duration",
        }}
        SubComponent={({ row }) => <DetailRow row={row} />}
      />
      <Modal id="addModal" title="Add new Order">
        <AddOrderForm />
      </Modal>
    </>
  );
};

export default OrderList;
