import * as types from "../types";

const initialState = {
  loading: false,
  user: {},
  errors: {}
};

const reg = (state = initialState, action) => {
  switch (action.type) {
    case types.REGIS_START:
      return {
        ...state,
        loading: true
      };
    case types.REGIS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case types.REGIS_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    default:
      return state;
  }
};

export default reg;
