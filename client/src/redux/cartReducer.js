const initialState = {
  cartItems: [],
};

console.log("executed");

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_FROM_CART':
      console.log('deleted item=>');
      console.log(action.payload);
      return{
        cartItems: state.cartItems.filter(item=>item !== action.payload)
      }
    case "ADD_TO_CART":
      console.log(state.cartItems);
      return {
        cartItems: [...state.cartItems, action.payload],
      };

    default:
      return state;
  }
};
