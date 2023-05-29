import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, Dispatch, FC } from "react";

import { Button, Input, Select } from "@/components/ui";
import { Product } from "@/interfaces/product";

const AddProductForm: FC<{
  products: Product[];
  setProduct: Dispatch<Product[]>;
  totalAmount: number;
}> = ({ products, setProduct, totalAmount }) => {
  const addProducts = () => {
    setProduct([
      { marketplace: "", product_name: "", unit_cost: 0, units: 0 },
      ...products,
    ]);
  };

  const deleteProducts = (index: number) => {
    products.splice(index, 1);
    setProduct([...products]);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    i: number
  ) => {
    if (e.target) {
      const newProducts = products.map((product, index) => {
        if (index === i) {
          return { ...product, [e.target.name]: e.target.value };
        } else {
          return product;
        }
      });
      setProduct(newProducts);
    }
  };

  return (
    <>
      <div>
        <label className="text-neutral/600">Products :</label>
      </div>
      <div className="relative flex flex-col border-neutral-gray/40 border-x-2 rounded-md">
        <div className="pointer-events-auto relative flex w-full flex-col  border-none bg-clip-padding text-current outline-none bg-neutral-gray/40">
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 py-2 px-4">
            <span className="text-neutral-gray/90">Order Details</span>
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
              <div className="flex items-center justify-between">
                <div className="grid grid-cols-2 md:grid-cols-none md:grid-flow-col md:grid-cols-max gap-2 mt-2">
                  <div className="relative">
                    <Select
                      name="product_name"
                      items={["item_1", "item_2"]}
                      label="Select Product"
                      allowEmpty
                      onChange={(e) =>
                        handleInputChange(
                          e as ChangeEvent<HTMLSelectElement>,
                          index
                        )
                      }
                    />
                  </div>
                  <div className="relative w-full md:w-20">
                    <Input
                      type="number"
                      name="units"
                      placeholder="Unit"
                      required
                      label="Unit"
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div className="relative">
                    <Select
                      name="marketplace"
                      items={["amazon", "alibaba"]}
                      label="Marketplace"
                      allowEmpty
                      onChange={(e) =>
                        handleInputChange(
                          e as ChangeEvent<HTMLSelectElement>,
                          index
                        )
                      }
                    />
                  </div>
                  <div className="relative w-full md:w-30">
                    <Input
                      type="number"
                      name="unit_cost"
                      placeholder="Unit Cost"
                      required
                      label="Unit Cost"
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </div>
                <div className="w-20 flex items-center mt-2">
                  <Button onClick={addProducts}>
                    <PlusCircleIcon className="w-4 h-4" />
                  </Button>
                  {products.length > 1 && (
                    <Button
                      className="bg-red-600"
                      onClick={() => {
                        deleteProducts(index);
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
            <b>Total Cost:</b>
            <span>$ {totalAmount}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
