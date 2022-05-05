const reducer = (state, action) => {
  switch (action.type) {
    case "NEW_USER":
      return {
        update: true,
        user_id: action.payload.user_id,
      };
    default:
      return state;
  }
};

export default reducer;
