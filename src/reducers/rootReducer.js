import { combineReducers } from "redux";

import blogReducer from "./blogReducer";
import authReducer from "./authReducer";
import { errorReducer } from "./errorReducer";
import overviewReducer from "./overviewReducer";
const rootReducer = combineReducers({
  blogReducer,
  authReducer,
  errorReducer,
  overviewReducer,
});

export default rootReducer;
