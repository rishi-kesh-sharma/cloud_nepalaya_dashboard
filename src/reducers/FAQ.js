import { SET_FAQS } from "../utils/actions";
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_FAQS: {
      state = action.payload;
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
