import {
  ADD_TO_COMPARE,
  REMOVE_FROM_COMPARE,
  useGlobalContext,
} from "../../context";
import { Button } from "./Button";

const COMPARE_PROPERTIES = ["name", "price", "variants"];

export const CompareModal = ({ show, onClose }) => {
  const {
    state: { products, compareItems },
    dispatch,
  } = useGlobalContext();

  return (
    <>
      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Compare Products</h3>
                  <button
                    className="p-1 ml-auto  border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className=" text-gray-500 h-6 w-6 text-2xl block">
                      X
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex flex-col min-w-[768px] w-full">
                  <div className="flex gap-2">
                    <label htmlFor="add-product">Add product:</label>
                    <select
                      id="add-product"
                      className="min-w-[120px] border rounded"
                      onChange={(e) => {
                        dispatch({
                          type: ADD_TO_COMPARE,
                          payload: e.target.value,
                        });
                      }}
                    >
                      <option value=""></option>
                      {products.map((prd) => (
                        <option key={prd.id} value={prd.id}>
                          {prd.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <table className="border w-full rounded mt-5">
                      <thead>
                        <tr className="border shadow-md">
                          {COMPARE_PROPERTIES.map((item) => (
                            <th className="p-1 text-left" key={item}>
                              {item}
                            </th>
                          ))}
                          <th className="p-1 text-left"></th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {compareItems.map((item) => (
                          <tr key={item.id} className="border">
                            <td width="25%" className="p-1">
                              {item.name}
                            </td>
                            <td width="25%" className="p-1">
                              {item.price}
                            </td>
                            <td width="25%" className="p-1">
                              <div className="flex gap-2">
                                {item.variants.map((v) => (
                                  <>
                                    <span>{v.name}</span>
                                  </>
                                ))}
                              </div>
                            </td>
                            <td width="10%" className="p-1">
                              <Button
                                className="py-1 px-2"
                                onClick={() =>
                                  dispatch({
                                    type: REMOVE_FROM_COMPARE,
                                    payload: item.id,
                                  })
                                }
                                label="X"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
