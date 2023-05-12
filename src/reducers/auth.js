import { LOGIN, LOGOUT } from "../utils/actions";
const reducer = (
  state = { isAuthenticated: true, authenticatedUser: {} },
  action
) => {
  switch (action.type) {
    case LOGIN: {
      state = action.payload;
      return state;
    }
    case LOGOUT:
      state = action.payload;
      return state;

    default:
      return state;
  }
};

export default reducer;
