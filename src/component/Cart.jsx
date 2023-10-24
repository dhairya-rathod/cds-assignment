/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import { Button } from "./layout";
import { ADD_TO_CART, REMOVE_FROM_CART, useGlobalContext } from "../context";
import { CartSummary } from "./CartSummary";

export const Cart = () => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    state: { cart },
    dispatch,
  } = useGlobalContext();

  return (
    <div className="relative">
      <Button
        className="ml-4"
        label="🛒"
        onClick={() => setIsVisible((prev) => !prev)}
      />
      {isVisible && (
        <div className="absolute border bg-white shadow-md right-0 rounded w-80 p-2">
          {!!cart.length ? (
            <>
              <ul className="">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between m-2 pb-2 border-b"
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center gap-3">
                      <Button
                        label="-"
                        onClick={() =>
                          dispatch({ type: REMOVE_FROM_CART, payload: item.id })
                        }
                        className="px-4"
                      />
                      <span>{item.quantity}</span>
                      <Button
                        label="+"
                        onClick={() =>
                          dispatch({ type: ADD_TO_CART, payload: item.id })
                        }
                        className="px-4"
                      />
                    </div>
                    {/* <button onClick={() => applyCoupon(couponCode)}>
              Apply Coupon
            </button> */}
                  </li>
                ))}
              </ul>
              <CartSummary />
            </>
          ) : (
            <span className="block text-center font-semibold text-lg">
              Cart is empty 🎐
            </span>
          )}
        </div>
      )}
    </div>
  );
};
