import { SET_MISC } from "../utils/actions";
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_MISC: {
      state = action.payload;
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
