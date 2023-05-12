import { SET_CONTACTS } from "../utils/actions";
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_CONTACTS: {
      state = action.payload;
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
