/* eslint-disable @typescript-eslint/no-explicit-any */
import { cartApi } from "../api/cartApi";
import { RootState } from "../store";

// 1. Get the "Result" object from the cache
const selectCartResult = cartApi.endpoints.getAllCartItems.select(undefined);

// 2. Extract the "Data" from that result
const selectCartData = (state: RootState) => selectCartResult(state)?.data;

/**
 * SELECTOR: Total Unique Products
 * Returns: Number of unique rows in the cart (e.g., 3 products)
 */
export const selectCartUniqueCount = (state: RootState) => {
  return selectCartData(state)?.data?.items?.length || 0;
};

/**
 * SELECTOR: Total Quantity
 * Returns: Sum of all item quantities (e.g., if you have 2 shirts and 1 hat, returns 3)
 */
export const selectCartTotalQuantity = (state: RootState) => {
  const items = selectCartData(state)?.data?.items || [];
  return items.reduce((total: number, item: any) => total + item.quantity, 0);
};