export const HANDLE_CART_ACTIONS = 'HANDLE_CART_ACTIONS';
export const HANDLE_TOTAL_CART_ITEMS = 'HANDLE_TOTAL_CART_ITEMS';
export const HANDLE_TOTAL_AMOUNT = 'HANDLE_TOTAL_AMOUNT';

export const hanldeCartActions = products => {
  return {type: HANDLE_CART_ACTIONS, products};
};

export const hanldeTotalCartItems = totalItems => {
  return {type: HANDLE_TOTAL_CART_ITEMS, totalItems};
};

export const handleTotalAmount = totalAmount => {
  return {type: HANDLE_TOTAL_AMOUNT, totalAmount};
};
