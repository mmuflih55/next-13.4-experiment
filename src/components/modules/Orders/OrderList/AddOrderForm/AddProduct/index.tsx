import { Dispatch, FC } from "react";

import { Input, Select } from "@/components/ui";
import { Product } from "@/interfaces/product";

const AddProductForm: FC<{
  products: Product[];
  setProduct: Dispatch<Product[]>;
}> = ({ products, setProduct }) => {
  const addProducts = () => {
    setProduct([
      { marketplace: "", product_name: "", unit_cost: 0, units: 0 },
      ...products,
    ]);
  };
  return (
    <>
      <div>
        <label className="text-neutral/600">
          <b>Products :</b>
        </label>
      </div>
      <div className="relative flex flex-col border-neutral-gray/40 border-2 rounded-md">
        <div className="pointer-events-auto relative flex w-full flex-col  border-none bg-clip-padding text-current outline-none bg-neutral-gray/40">
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 py-2 px-4">
            <b className="text-neutral-gray/90">Order Details</b>
            <div>
              <a
                href="#"
                onClick={addProducts}
                className="text-blue-500 underline"
              >
                Add New Marketplace
              </a>
            </div>
          </div>
        </div>
        <div className="p-4">
          {products.map((product: Product, index: number) => (
            <div key={index}>
              <div className="grid grid-cols-2 md:grid-cols-none md:grid-flow-col md:grid-cols-max gap-2 mt-2">
                <div className="relative">
                  <Select
                    name="product_name"
                    items={["item_1", "item_2"]}
                    label="Select Product"
                    allowEmpty
                  />
                </div>
                <div className="relative w-full md:w-20">
                  <Input
                    type="number"
                    placeholder="Unit"
                    required
                    label="Unit"
                  />
                </div>
                <div className="relative">
                  <Select
                    name="marketplace"
                    items={["amazon", "alibaba"]}
                    label="Marketplace"
                    allowEmpty
                  />
                </div>
                <div className="relative w-full md:w-30">
                  <Input
                    type="number"
                    placeholder="Unit Cost"
                    required
                    label="Unit Cost"
                  />
                </div>
              </div>
              <hr className="my-2 h-0.5 border-t-1 border-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
