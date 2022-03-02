const githubreducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        users: [],
        isLoading: false,
      };
    default:
      return state;
  }
};

export default githubreducer;
