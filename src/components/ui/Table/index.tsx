import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { matchSorter } from "match-sorter";
import Image from "next/image";
import React, {
  FC,
  Fragment,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import { useExpanded, usePagination, useSortBy, useTable } from "react-table";
import styled from "styled-components";
import { Tooltip } from "tw-elements";

const TableContainer = styled.div`
  /* This will make the table scrollable when it gets too small */
  display: block;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: scroll;
  border-bottom: 1px solid black;
  max-height: 100%;

  table {
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th {
      color: #333;
      border-bottom: 2px solid #aaa;
    }

    th,
    td {
      white-space: pre;
      margin: 0;
      padding: 0.5rem;

      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

function convertArrayOfObjectsToCSV(array: object[]) {
  let result: string;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result = "";
  result += keys
    .map((column) => column.replaceAll("_", " ").toUpperCase())
    .join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item: any) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;
      result += item[key].toString().replaceAll(",", ".");
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

function downloadCSV(array: object[]) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

export const Table: FC<{
  data: object[];
  filter?: string[];
  search?: string;
  description?: { [key: string]: string };
  tableRef?: any;
  withAction?: boolean;
  withPagination?: boolean;
  disableSort?: boolean;
  canExpand?: boolean;
  SubComponent?: ({ row }: { row: any }) => ReactNode;
}> = ({
  data,
  search = "",
  filter,
  description = {},
  tableRef,
  withAction = false,
  withPagination = false,
  disableSort = false,
  canExpand = false,
  SubComponent,
}) => {
  const renderRowSubComponent = useMemo(
    () => (SubComponent ? SubComponent : () => null),
    [SubComponent]
  );

  const headers = useMemo(
    () =>
      data.length > 0
        ? [
            ...(canExpand
              ? [
                  {
                    id: "expander",
                    noSort: true,
                    Cell: ({ row }: { row: any }) => (
                      <span
                        {...row.getToggleRowExpandedProps({})}
                        className="max-w-[24px]"
                      >
                        {row.isExpanded ? (
                          <span className="block h-3 w-3">
                            <ChevronDownIcon />
                          </span>
                        ) : (
                          <div className="block h-3 w-3">
                            <ChevronRightIcon />
                          </div>
                        )}
                      </span>
                    ),
                  },
                ]
              : []),
            ...Object.keys(data[0]).map((column) => ({
              Header: column.replaceAll("_", " ").toUpperCase(),
              accessor: column,
              Cell: ({ row, column }: { row: any; column: any }) => {
                let render;
                const { original } = row;
                const val = original[column.id];
                if (typeof val === "object") {
                  if (val.img)
                    render = (
                      <>
                        <Image
                          width={100}
                          height={100}
                          src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                          className="w-4 h-4 rounded-full"
                          alt="Avatar"
                        />
                        {val.value}
                      </>
                    );
                } else {
                  render = val;
                }
                return (
                  <div key={row.id} className="flex gap-2 items-center">
                    {render}
                  </div>
                );
              },
            })),
            ...(withAction
              ? [
                  {
                    id: "action",
                    Header: "Action",
                    noSort: true,
                    Cell: ({ row }: { row: any }) => (
                      <button
                        {...row.getToggleRowExpandedProps({})}
                        aria-label="to-last-page-btn"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                        className="w-full h-6 flex justify-center items-center"
                      >
                        <span className="h-4 w-4">
                          <EllipsisVerticalIcon />
                        </span>
                      </button>
                    ),
                  },
                ]
              : []),
          ]
        : [],
    [data, canExpand, withAction]
  );

  const filteredData = useMemo(
    () =>
      data ? matchSorter(data, search, { keys: Object.keys(data[0]) }) : data,
    [search, data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    visibleColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: headers,
      data: filteredData,
      isMultiSortEvent: () => true,
      disableSortBy: disableSort,
    },
    useSortBy,
    useExpanded,
    usePagination
  );

  useImperativeHandle(tableRef, () => ({
    export() {
      downloadCSV(filteredData);
    },
  }));

  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-te-toggle="tooltip"]')
    );
    tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
  }, [filter]);

  return (
    <div className="h-full w-full flex flex-col justify-between mt-6 gap-2 overflow-scroll text-xs md:text-sm">
      <TableContainer>
        <table className="w-full" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any, i: number) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map(
                  (column: any, th_i: number) =>
                    (!filter ||
                      column.id === "action" ||
                      column.id === "expander" ||
                      filter?.length === 0 ||
                      filter?.includes(column.id)) && (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={th_i}
                      >
                        <div className="flex justify-between items-center">
                          {column.render("Header")}
                          <div className="flex">
                            {!column.noSort && !disableSort && (
                              <div className="block w-4 h-4">
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <ChevronDownIcon />
                                  ) : (
                                    <ChevronUpIcon />
                                  )
                                ) : (
                                  <ChevronUpDownIcon />
                                )}
                              </div>
                            )}
                            {description[column.id] && (
                              <div
                                className="block w-4 h-4"
                                data-te-toggle="tooltip"
                                data-te-placement="top"
                                title={description[column.id]}
                              >
                                <InformationCircleIcon />
                              </div>
                            )}
                          </div>
                        </div>
                      </th>
                    )
                )}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <Fragment key={i}>
                  <tr
                    className={`rounded h-4 transition ease-in-out ${
                      row.isExpanded ? "bg-neutral-gray/70 text-neutral" : ""
                    }`}
                  >
                    {row.cells.map((cell: any, index: number) => {
                      return (
                        (!filter ||
                          filter?.length === 0 ||
                          cell.column.id === "action" ||
                          cell.column.id === "expander" ||
                          filter?.includes(cell.column.id)) && (
                          <td
                            {...cell.getCellProps()}
                            key={index}
                            width={
                              cell.column.id === "expander" ||
                              cell.column.id === "action"
                                ? 5
                                : "auto"
                            }
                          >
                            {cell.render("Cell")}
                          </td>
                        )
                      );
                    })}
                  </tr>
                  {row.isExpanded && (
                    <tr className="h-4">
                      <td colSpan={visibleColumns.length} className="!p-0">
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </TableContainer>
      {withPagination && (
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-2">
          <div>
            Showing the first {pageIndex * pageSize} to{" "}
            {(pageIndex + 1) * pageSize} entries
          </div>
          <div className="pagination flex items-center gap-2 flex-col sm:flex-row">
            <div className="flex">
              {canPreviousPage && (
                <button
                  aria-label="to-first-page-btn"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                  className="border-2 w-6 h-6 rounded-full flex justify-center items-center"
                >
                  <span className="h-4 w-4">
                    <ChevronDoubleLeftIcon />
                  </span>
                </button>
              )}
              {canPreviousPage && (
                <button
                  aria-label="to-prev-page-btn"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  className="border-2 w-6 h-6 rounded-full flex justify-center items-center"
                >
                  <span className="h-4 w-4">
                    <ChevronLeftIcon />
                  </span>
                </button>
              )}
              {[1, 2, 3]
                .map(
                  (page) => page + (pageIndex === 0 ? pageIndex : pageIndex - 1)
                )
                .map(
                  (page) =>
                    page > 0 &&
                    page <= pageCount && (
                      <button
                        key={page}
                        aria-label={`to-page-${page}-btn`}
                        onClick={() => gotoPage(page - 1)}
                        disabled={!canNextPage}
                        className={`border-2 w-6 h-6 rounded-full flex justify-center items-center ${
                          pageIndex + 1 == page ? "bg-slate-300" : ""
                        }`}
                      >
                        <span>{page}</span>
                      </button>
                    )
                )}
              {canNextPage && (
                <button
                  aria-label="to-next-page-btn"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                  className="border-2 w-6 h-6 rounded-full flex justify-center items-center"
                >
                  <span className="h-4 w-4">
                    <ChevronRightIcon />
                  </span>
                </button>
              )}
              {canNextPage && (
                <button
                  aria-label="to-last-page-btn"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                  className="border-2 w-6 h-6 rounded-full flex justify-center items-center"
                >
                  <span className="h-4 w-4">
                    <ChevronDoubleRightIcon />
                  </span>
                </button>
              )}
            </div>
            <span>
              Page
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
