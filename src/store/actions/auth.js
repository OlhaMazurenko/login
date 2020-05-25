import * as types from "../types";
import * as authApi from "../../api/requests/auth";

export const authAction = (data, handleRedirect) => dispatch => {
  return authApi
    .logInApi(data)
    .then(dispatch({ type: types.AUTH_START }))
    .then(response => {
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: types.AUTH_SUCCESS,
        payload: response.data
      });
    })
    .then(() => {
      handleRedirect();
    })
    .catch(errors => {
      dispatch({
        type: types.AUTH_ERROR,
        payload:
          errors.response && errors.response.data ? errors.response.data : {}
      });
    });
};
