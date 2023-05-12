import { SET_USERS } from "../utils/actions";
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS: {
      state = action.payload;
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
