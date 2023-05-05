import { REMOVE_ERROR, SET_ERROR } from "./../actions/errorActions";
import { v4 as uuid } from "uuid";
export const errorReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ERROR:
      return [...state, { id: uuid(), message: action.payload }];
    case REMOVE_ERROR:
      return [...state].filter((error) => error.id != action.payload);
    default:
      return state;
  }
};
