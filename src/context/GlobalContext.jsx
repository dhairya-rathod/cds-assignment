import { createContext, useContext, useReducer } from "react";
import { toast } from "react-toastify";

import { products, inventory } from "../data";

export const SET_PERSISTED_DATA = "SET_PERSISTED_DATA";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_TO_COMPARE = "ADD_TO_COMPARE";
export const REMOVE_FROM_COMPARE = "REMOVE_FROM_COMPARE";
export const EMPTY_COMPARE_ITEMS = "EMPTY_COMPARE_ITEMS";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SWITCH_LAYOUT = "SWITCH_LAYOUT";
export const APPLY_COUPON = "APPLY_COUPON";

const initialState = {
  products: [...products],
  inventory: [...inventory],
  cart: [],
  compareItems: [],
  layout: "grid",
  appliedCoupon: null,
};

const GlobalContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case SET_PERSISTED_DATA: {
      const layout = localStorage.getItem("layout") || "grid";
      const cartData = localStorage.getItem("cartData");

      if (layout || cartData) {
        let inventory = state.inventory;
        if (
          Array.isArray(JSON.parse(cartData)) &&
          JSON.parse(cartData).length
        ) {
          const cartData_ = JSON.parse(cartData);
          inventory = inventory.map((item) => {
            const product = cartData_.find(
              (cartItem) => cartItem.id == item.productId
            );
            return {
              ...item,
              quantity: product
                ? item.quantity - product.quantity
                : item.quantity,
            };
          });
        }

        return {
          ...state,
          cart: cartData ? JSON.parse(cartData) : state.cart,
          layout,
          inventory,
        };
      } else {
        return state;
      }
    }

    case ADD_TO_CART: {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      const cartItemIndex = state.cart.findIndex(
        (product) => product.id === action.payload
      );
      const inventoryItemIndex = state.inventory.findIndex(
        (item) => item.productId === action.payload
      );
      if (
        (cartItemIndex === -1 ||
          state.cart[cartItemIndex].quantity < product.maxPurchase) &&
        state.inventory[inventoryItemIndex].quantity > 0
      ) {
        // update cart
        let cart_ = [...state.cart];
        let inventory_ = [...state.inventory];
        if (cartItemIndex === -1) {
          cart_ = [
            ...cart_,
            {
              id: action.payload,
              name: product.name,
              price: product.price,
              quantity: 1,
            },
          ];
        } else {
          cart_[cartItemIndex].quantity = cart_[cartItemIndex].quantity + 1;
        }
        // update inventory
        inventory_[inventoryItemIndex].quantity =
          inventory_[inventoryItemIndex].quantity - 1;

        localStorage.setItem("cartData", JSON.stringify(cart_));
        return { ...state, cart: cart_ };
      } else {
        toast.error("Can't add more items to cart!");
      }
      return state;
    }

    case REMOVE_FROM_CART: {
      const cartItemIndex = state.cart.findIndex(
        (product) => product.id === action.payload
      );
      const inventoryItemIndex = state.inventory.findIndex(
        (item) => item.productId === action.payload
      );

      if (state.cart[cartItemIndex].quantity > 0) {
        let cart_ = [...state.cart];
        let inventory_ = [...state.inventory];

        if (cart_[cartItemIndex].quantity - 1 === 0) {
          cart_.splice(cartItemIndex, 1);
        } else {
          cart_[cartItemIndex].quantity = cart_[cartItemIndex].quantity - 1;
        }

        // update inventory
        inventory_[inventoryItemIndex].quantity =
          inventory_[inventoryItemIndex].quantity + 1;
        localStorage.setItem("cartData", JSON.stringify(cart_));
        return { ...state, cart: cart_ };
      }
      return state;
    }

    case SWITCH_LAYOUT: {
      localStorage.setItem(
        "layout",
        state.layout === "grid" ? "table" : "grid"
      );
      return { ...state, layout: state.layout === "grid" ? "table" : "grid" };
    }

    case ADD_TO_COMPARE: {
      if (state.compareItems.length < 3 && action.payload) {
        const product = state.products.find(
          (item) => item.id == action.payload
        );
        const comparedProducts = state.compareItems.find(
          (item) => item.id == action.payload
        );
        if (!comparedProducts) {
          return {
            ...state,
            compareItems: [
              ...state.compareItems,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                variants: product.variants,
              },
            ],
          };
        } else {
          toast.error("Product is already in compared items!");
          return state;
        }
      }
      toast.error("You can compare maximum 3 items!");
      return state;
    }

    case REMOVE_FROM_COMPARE: {
      const comparedProducts = state.compareItems.filter(
        (item) => item.id != action.payload
      );
      return {
        ...state,
        compareItems: comparedProducts,
      };
    }

    case EMPTY_COMPARE_ITEMS:
      return { ...state, compareItems: [] };

    default:
      return state;
  }
};

// Create the context provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Create a custom hook to access the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  return context;
};
