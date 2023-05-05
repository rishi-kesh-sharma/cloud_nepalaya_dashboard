import {
  ADD_BLOG,
  DELETE_BLOG,
  UPDATE_BLOG,
  GET_SINGLE_BLOG,
  GET_ALL_BLOGS,
  SET_BLOGS,
} from "../actions/blogActions";
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case SET_BLOGS:
      state = action.payload;
      return state;
    case UPDATE_BLOG:
      return state;
    case ADD_BLOG:
      return { success: true, blogs: [...state.blogs, action.payload] };
    case UPDATE_BLOG:
      return state;
    case DELETE_BLOG:
      return state;
    case GET_SINGLE_BLOG:
      return state;
    default:
      return state;
  }
};

export default blogReducer;
