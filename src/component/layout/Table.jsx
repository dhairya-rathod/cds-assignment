import { ADD_TO_CART, ADD_TO_COMPARE, useGlobalContext } from "../../context";
import { Button } from "./Button";

export const TableView = () => {
  const {
    state: { products },
    dispatch,
  } = useGlobalContext();

  return (
    <table className="border w-full rounded mt-5">
      <thead>
        <tr className="border shadow-md">
          <th className="p-1 text-left">Name</th>
          <th className="p-1 text-left">Description</th>
          <th className="p-1 text-left">Price</th>
          <th className="p-1 text-center">Action</th>
        </tr>
      </thead>
      <tbody className="">
        {products.map((product) => (
          <tr key={product.id} className="border">
            <td width="20%" className="p-1">
              {product.name}
            </td>
            <td width="55%" className="p-1 ">
              {product.description}
            </td>
            <td width="10%" className="p-1">
              ${product.price}
            </td>
            <td width="15%" className="p-1">
              <div className="flex gap-2">
                <Button
                  className="py-1 px-2 bg-green-400 text-white"
                  onClick={() =>
                    dispatch({ type: ADD_TO_COMPARE, payload: product.id })
                  }
                  label="+ compare"
                />
                <Button
                  className="py-1 px-2 bg-green-400 text-white"
                  onClick={() =>
                    dispatch({ type: ADD_TO_CART, payload: product.id })
                  }
                  label="+ Cart"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
