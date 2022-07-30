const initialState = {
  closeBot: false,
};

export const botReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOT_CLOSED":
      return {
        closeBot: true,
      };
    default:
      return state;
  }
};
