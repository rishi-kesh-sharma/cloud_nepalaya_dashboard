import { LOGIN, LOGOUT } from "./../actions/authActions";
import { loginUser, logoutUser } from "../apiCalls/auth";
const authReducer = (
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

export default authReducer;
