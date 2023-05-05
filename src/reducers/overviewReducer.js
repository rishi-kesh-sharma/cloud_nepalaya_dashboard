import { getAllBanks } from "../apiCalls/blogs";
import { SET_OVERVIEW } from "./../actions/overviewActions";
const overviewReducer = (state = [], action) => {
  switch (action.type) {
    case SET_OVERVIEW:
      return action.payload;
    default:
      return state;
  }
};

export default overviewReducer;
