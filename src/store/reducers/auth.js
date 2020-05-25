import * as types from "../types";

const initialState = {
  loading: false,
  user: {},
  errors: {}
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return {
        ...state,
        loading: true
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
};

export default auth;
