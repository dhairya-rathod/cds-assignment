import { useEffect } from "react";
import { ProductList, Cart } from "./component";
import { Button, CompareModal } from "./component/layout";
import {
  EMPTY_COMPARE_ITEMS,
  SET_PERSISTED_DATA,
  SWITCH_LAYOUT,
  useGlobalContext,
} from "./context";

function App() {
  const {
    state: { layout, compareItems },
    dispatch,
  } = useGlobalContext();

  const switchLayout = () => {
    dispatch({ type: SWITCH_LAYOUT });
  };

  useEffect(() => {
    dispatch({ type: SET_PERSISTED_DATA });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full flex flex-col mx-4">
      <div className="flex items-center justify-end mt-2">
        <Button
          onClick={switchLayout}
          label={layout === "table" ? "Switch to Grid" : "Switch to Table"}
        />
        <Cart />
      </div>
      <ProductList />

      <CompareModal
        show={compareItems.length > 0}
        onClose={() => {
          dispatch({ type: EMPTY_COMPARE_ITEMS });
        }}
      />
    </div>
  );
}

export default App;
