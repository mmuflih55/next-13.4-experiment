"use client";
import React from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Title",
    selector: (row: any) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row: any) => row.year,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

export const Table = () => (
  <>
    <DataTable columns={columns} data={data} />
  </>
);

export default Table;
