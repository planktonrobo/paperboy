import { EXIT_SUM, GET_SUM } from "../actions/types.js";

const initialState = {
  summary: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
      case GET_SUM:
        return {
          ...state,
          summary: action.payload,
        };

      case EXIT_SUM:
        return {
          ...state,
          summary: null,
        }
  
      default:
        return state;
    }
  };
  
  
  
