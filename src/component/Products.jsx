import { TableView, GridView } from "./layout";
import { useGlobalContext } from "../context";

export const ProductList = () => {
  const {
    state: { layout },
  } = useGlobalContext();

  return <div>{layout === "table" ? <TableView /> : <GridView />}</div>;
};

export default ProductList;
