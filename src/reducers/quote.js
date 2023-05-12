import { SET_QUOTES } from "../utils/actions";
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_QUOTES: {
      state = action.payload;
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
