import { SET_BLOGS } from "../utils/actions";
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_BLOGS: {
      state = action.payload;
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
