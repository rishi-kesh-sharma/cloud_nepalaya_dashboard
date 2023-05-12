import { SET_TESTIMONIALS } from "../utils/actions";
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_TESTIMONIALS: {
      state = action.payload;
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
