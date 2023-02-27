import {
  HANDLE_CART_ACTIONS,
  HANDLE_TOTAL_CART_ITEMS,
  HANDLE_TOTAL_AMOUNT,
} from '../actions/CartActions';

const initialState = {
  cartItems: [],
  totalCartItems: 0,
  totalAmount: 0,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_CART_ACTIONS:
      const products = action.products;
      return {
        ...state,
        cartItems: [...products],
      };
    case HANDLE_TOTAL_CART_ITEMS:
      const totalItems = action.totalItems;
      return {
        ...state,
        totalCartItems: totalItems,
      };
    case HANDLE_TOTAL_AMOUNT:
      const totalAmount = action.totalAmount;
      return {
        ...state,
        totalAmount,
      };
  }
  return state;
};

export default CartReducer;
