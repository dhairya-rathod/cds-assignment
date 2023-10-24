import { ADD_TO_CART, ADD_TO_COMPARE, useGlobalContext } from "../../context";
import { Button } from "./Button";

export const GridView = () => {
  const {
    state: { products },
    dispatch,
  } = useGlobalContext();

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 shadow-sm rounded-md">
          <h2 className="text-lg font-bold text-left">{product.name}</h2>
          <p className="text-xs truncate ... mt-4">{product.description}</p>
          <div className="flex justify-between mt-2 items-center">
            <p className="font-semibold">${product.price}</p>
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
          </div>
        </div>
      ))}
    </div>
  );
};
