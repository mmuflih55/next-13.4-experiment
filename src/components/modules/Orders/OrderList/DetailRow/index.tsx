import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { Chart, initTE, Tooltip } from "tw-elements";

import { Card, Table } from "@/components/ui";

const getAmountVal = (amount: number | string) => {
  if (typeof amount === "string") {
    return parseInt(amount.slice(2, amount.length).replace(",", ""));
  } else {
    return amount;
  }
};

const calcPayment = (order_cost: string, amount_paid: string) => {
  return (
    "€ " +
    new Intl.NumberFormat("en", {
      maximumSignificantDigits: 3,
    }).format(getAmountVal(order_cost) - getAmountVal(amount_paid))
  );
};

const DetailRowContainer = styled.div`
  @keyframes slideToBottom {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: 0.7s ease-out 0s 1 slideToBottom;
  transition: 1s;
`;

const DetailRow: FC<{ row: any }> = ({ row }) => {
  const { original } = row;
  const leftToPay = calcPayment(original.order_cost, original.amount_paid);
  useEffect(() => {
    initTE({ Chart });
    const dataBarCustomOptions = {
      type: "bar",
      data: {
        labels: ["P1", "P2", "P3"],
        datasets: [
          {
            label: "Units Ordered",
            data: [30, 15, 62],
            borderWidth: 1,
            backgroundColor: "#c2281d",
          },
          {
            label: "Shipped",
            data: [65, 61, 6],
            borderWidth: 1,
            backgroundColor: "#1dc27b",
          },
          {
            label: "Ready to Ship",
            data: [33, 45, 22],
            borderWidth: 1,
            backgroundColor: "#1d2bc2",
          },
        ],
      },
    };

    const optionsBarCustomOptions = {
      options: {
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#333",
            },
          },
          y: {
            ticks: {
              color: "#333",
            },
          },
        },
      },
    };

    new Chart(
      document.getElementById(`chart-${row.id}`),
      dataBarCustomOptions,
      optionsBarCustomOptions
    );

    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-te-toggle="tooltip"]')
    );
    tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
  }, [row.id]);

  return (
    <DetailRowContainer className="flex gap-2 border-neutral-gray/70 border-x-2 border-b-2 p-3">
      <div className="flex flex-col w-[60%] gap-2">
        <div className="flex flex-row gap-2">
          <Card className="flex flex-col gap-2 w-[50%]">
            <div>
              <label
                htmlFor="payment-status"
                className="mb-2 inline-block text-neutral-700"
              >
                <b>Payment</b>
              </label>
              <div
                className="h-2 w-full bg-slate-200 rounded"
                data-te-toggle="tooltip"
                data-te-placement="top"
                title={`${
                  (100 * getAmountVal(original.amount_paid)) /
                  getAmountVal(original.order_cost)
                }%`}
              >
                <div
                  className={`h-2 bg-primary w-[${
                    (100 * getAmountVal(original.amount_paid)) /
                    getAmountVal(original.order_cost)
                  }%] rounded`}
                ></div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Total Cost</b>
              </div>
              <div>
                <span>{original.order_cost}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Amount Paid</b>
              </div>
              <div>
                <span>{original.amount_paid}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Left to Pay</b>
              </div>
              <div>
                <span>{leftToPay}</span>
              </div>
            </div>
          </Card>
          <Card className="w-[50%]">
            <canvas id={`chart-${row.id}`}></canvas>
          </Card>
        </div>
        <div>
          <Card>
            <div>
              <h4>
                <b>Lorem Ipsum</b>
              </h4>
            </div>
            <div>
              <Table
                disableSort
                data={[
                  {
                    shipment_id: "123456",
                    product: {
                      img: "https://tecdn.b-cdn.net/img/new/avatars/2.webp",
                      value: "Product 1",
                    },
                    delivery_date: "20/10/2023",
                    units: 90,
                    units_shipment_cost: 12832,
                  },
                  {
                    shipment_id: "22222",
                    product: {
                      img: "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
                      value: "Product 2",
                    },
                    delivery_date: "20/10/2023",
                    units: 60,
                    units_shipment_cost: 900,
                  },
                  {
                    shipment_id: "123456",
                    product: {
                      img: "https://tecdn.b-cdn.net/img/new/avatars/2.webp",
                      value: "Product 1",
                    },
                    delivery_date: "20/10/2023",
                    units: 90,
                    units_shipment_cost: 12832,
                  },
                  {
                    shipment_id: "22222",
                    product: {
                      img: "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
                      value: "Product 2",
                    },
                    delivery_date: "20/10/2023",
                    units: 60,
                    units_shipment_cost: 900,
                  },
                ]}
              />
            </div>
          </Card>
        </div>
      </div>
      <div className="w-[40%]">
        <Card className="h-full">
          <div>
            <h4>
              <b>Lorem Ipsum</b>
            </h4>
          </div>
          <div>
            <Table
              disableSort
              data={[
                {
                  product: {
                    img: "https://tecdn.b-cdn.net/img/new/avatars/2.webp",
                    value: "Product 1",
                  },
                  units: 90,
                  unit_price: 12832,
                  total_price: 12832,
                },
                {
                  product: {
                    img: "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
                    value: "Product 2",
                  },
                  units: 60,
                  unit_price: 900,
                  total_price: 900,
                },
                {
                  product: {
                    img: "https://tecdn.b-cdn.net/img/new/avatars/2.webp",
                    value: "Product 1",
                  },
                  units: 90,
                  unit_price: 12832,
                  total_price: 12832,
                },
                {
                  product: {
                    img: "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
                    value: "Product 2",
                  },
                  units: 60,
                  unit_price: 900,
                  total_price: 900,
                },
                {
                  product: {
                    img: "https://tecdn.b-cdn.net/img/new/avatars/2.webp",
                    value: "Product 1",
                  },
                  units: 90,
                  unit_price: 12832,
                  total_price: 12832,
                },
                {
                  product: {
                    img: "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
                    value: "Product 2",
                  },
                  units: 60,
                  unit_price: 900,
                  total_price: 900,
                },
                {
                  product: {
                    img: "https://tecdn.b-cdn.net/img/new/avatars/2.webp",
                    value: "Product 1",
                  },
                  units: 90,
                  unit_price: 12832,
                  total_price: 12832,
                },
                {
                  product: {
                    img: "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
                    value: "Product 2",
                  },
                  units: 60,
                  unit_price: 900,
                  total_price: 900,
                },
              ]}
            />
          </div>
        </Card>
      </div>
    </DetailRowContainer>
  );
};

export default DetailRow;
