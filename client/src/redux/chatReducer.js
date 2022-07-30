const initialState = {
  credentials: null,
};

export const chatReducer = (state = initialState, action) => {
  console.log("chatreducer executed");
  switch (action.type) {
    case "LOGGED_IN":
      return {
        credentials: action.payload,
      };
    default:
      return state;
  }
};
