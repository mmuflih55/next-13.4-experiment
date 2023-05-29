import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, Dispatch, FC, useMemo } from "react";

import { Button, Datepicker, Input } from "@/components/ui";
import { Payment } from "@/interfaces/payment";

const AddPaymentForm: FC<{
  payments: Payment[];
  setPayment: Dispatch<Payment[]>;
  totalAmount: number;
}> = ({ payments, setPayment, totalAmount }) => {
  const addPayments = () => {
    setPayment([
      { payment_name: "", payment_date: "", amount_paid: 0 },
      ...payments,
    ]);
  };

  const deletePayments = (index: number) => {
    payments.splice(index, 1);
    setPayment([...payments]);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    i: number
  ) => {
    if (e.target) {
      const newPayments = payments.map((payments, index) => {
        if (index === i) {
          return { ...payments, [e.target.name]: e.target.value };
        } else {
          return payments;
        }
      });
      setPayment(newPayments);
    }
  };

  const totalPayment = useMemo(
    () => payments.reduce((acc, curr) => acc + curr.amount_paid, 0),
    [payments]
  );

  return (
    <>
      <div>
        <label className="text-neutral/600">Payments :</label>
      </div>
      <div className="relative flex flex-col border-neutral-gray/40 border-x-2 rounded-md">
        <div className="pointer-events-auto relative flex w-full flex-col  border-none bg-clip-padding text-current outline-none bg-neutral-gray/40">
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 py-2 px-4">
            <span className="text-neutral-gray/90">Order Details</span>
          </div>
        </div>
        <div className="p-4">
          {payments.map((payment: Payment, index: number) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <div className="grid grid-cols-2 md:grid-cols-none md:grid-flow-col md:grid-cols-max gap-2 mt-2 items-center">
                  <div className="relative">
                    <Input
                      type="text"
                      name="payment_name"
                      required
                      label="Payment Name"
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div className="relative w-full">
                    <Datepicker
                      name="payment_date"
                      label="Payment Date"
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div className="relative w-full md:w-30">
                    <Input
                      type="number"
                      name="amount_paid"
                      placeholder="Amount Paid"
                      label="Amount Paid"
                      required
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </div>
                <div className="w-20 flex mt-2">
                  <Button onClick={addPayments}>
                    <PlusCircleIcon className="w-4 h-4" />
                  </Button>
                  {payments.length > 1 && (
                    <Button
                      className="bg-red-600"
                      onClick={() => {
                        deletePayments(index);
                      }}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              <hr className="my-2 h-0.5 border-t-1 border-gray-300" />
            </div>
          ))}
        </div>
        <div className="flex justify-end rounded-b-md py-2 px-4 bg-neutral-gray/40">
          <div className="flex flex-col w-32">
            <b>Left:</b>
            <span>$ {totalAmount - totalPayment}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPaymentForm;
