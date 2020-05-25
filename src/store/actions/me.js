import * as types from "../types";
import * as meApi from "../../api/requests/me";

export const getProfileAction = () => dispatch => {
  return meApi
    .getProfile()
    .then(dispatch({ type: types.ME_START }))
    .then(response => {
      dispatch({
        type: types.ME_SUCCESS,
        payload: response.data
      });
    })
    .catch(errors => {
      dispatch({
        type: types.ME_ERROR,
        payload:
          errors.response && errors.response.data ? errors.response.data : {}
      });
    });
};
