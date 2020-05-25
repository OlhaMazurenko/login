import * as types from "../types";

const initialState = {
  loading: false,
  me: {},
  errors: {}
};

const me = (state = initialState, action) => {
  switch (action.type) {
    case types.ME_START:
      return {
        ...state,
        loading: true
      };
    case types.ME_SUCCESS:
      return {
        ...state,
        loading: false,
        me: action.payload
      };
    case types.ME_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    default:
      return state;
  }
};

export default me;
