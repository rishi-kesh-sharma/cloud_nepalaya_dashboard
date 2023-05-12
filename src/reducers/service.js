import { SET_SERVICES } from "../utils/actions";
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_SERVICES: {
      state = action.payload;
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
