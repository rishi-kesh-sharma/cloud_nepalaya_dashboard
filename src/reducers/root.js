import { combineReducers } from "redux";

import auth from "./auth";
import user from "./user";
import misc from "./misc";
import blog from "./blog";
import FAQ from "./FAQ";
import service from "./service";
import quote from "./quote";
import testimonial from "./testimonial";
import contact from "./contact";
const root = combineReducers({
  auth,
  user,
  misc,
  blog,
  FAQ,
  service,
  quote,
  testimonial,
  contact,
});

export default root;
