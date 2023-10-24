import { useGlobalContext } from "../context";

export const CartSummary = () => {
  const {
    state: { cart },
  } = useGlobalContext();

  const summary = cart.reduce(
    (acc, curr) => {
      return {
        items: acc.items + curr.quantity,
        amount: acc.amount + curr.quantity * curr.price,
      };
    },
    { items: 0, amount: 0 }
  );

  return (
    <div className="flex justify-between p-2">
      <span>
        # of Items: <span className="font-semibold">{summary.items}</span>
      </span>
      <span>
        Total Amount: <span className="font-semibold">${summary.amount}</span>
      </span>
    </div>
  );
};
