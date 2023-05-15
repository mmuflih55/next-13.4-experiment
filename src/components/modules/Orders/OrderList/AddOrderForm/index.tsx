import { ChangeEvent, FC, FormEvent, useState } from "react";

import { Datepicker, Input, Select } from "@/components/ui";
import { Product } from "@/interfaces/product";

import AddProductForm from "./AddProduct";

const AddOrderForm: FC = () => {
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState<Product[]>([
    {
      marketplace: "",
      product_name: "",
      unit_cost: 0,
      units: 0,
    },
  ]);
  // const [payments, setPayments] = useState([]);

  const hanldeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrder((order) => ({ ...order, [e.target.name]: e.target.value }));
  };

  const hanldeSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrder((order) => ({ ...order, [e.target.name]: e.target.value }));
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      ...order,
      products,
      // payments
    };
    console.log(payload);
  };
  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className="relative p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative mb-4">
              <Input
                title="Order ID"
                type="text"
                placeholder="Order ID"
                name="order_id"
                onChange={hanldeInputChange}
                required
              />
            </div>

            <div className="relative mb-4">
              <Input
                title="Supplier Name"
                type="text"
                placeholder="Supplier Name"
                onChange={hanldeInputChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative mb-4">
              <Datepicker
                title="Start Date"
                placeholder="Start Date"
                name="start_date"
                onChange={hanldeInputChange}
                onSelect={hanldeInputChange}
                required
              />
            </div>

            <div className="relative mb-4">
              <Datepicker
                id="test"
                title="End Date"
                placeholder="End Date"
                name="end_date"
                onChange={hanldeInputChange}
                onSelect={hanldeInputChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative mb-4">
              <Select
                title="Production Lead Time"
                name="p_lead_time"
                className="w-full"
                items={[...Array(60).keys()].map((key: number) =>
                  (key + 1).toString()
                )}
                onChange={hanldeSelectChange}
              />
            </div>

            <div className="relative mb-4">
              <Select
                title="Destination"
                name="destination"
                className="w-full"
                items={[...Array(60).keys()].map((key: number) =>
                  (key + 1).toString()
                )}
                onChange={hanldeSelectChange}
              />
            </div>
          </div>
          <AddProductForm products={products} setProduct={setProducts} />
        </div>

        <div className="flex flex-shrink-0 flex-wrap items-center justify-between rounded-b-md p-4">
          <button
            type="button"
            className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
            data-te-modal-dismiss
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            // data-te-modal-dismiss
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Save Purchase Order
          </button>
        </div>
      </form>
    </>
  );
};

export default AddOrderForm;
