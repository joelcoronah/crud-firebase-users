const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: action.payload.user,
        token: action.payload.token,
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
        token: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
