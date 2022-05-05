const reducer = (state, action) => {
  switch (action.type) {
    case "NEW_USER":
      return {
        update: true,
      };
    default:
      return state;
  }
};

export default reducer;
