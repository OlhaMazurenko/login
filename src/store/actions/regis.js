import * as types from "../types";
import * as regApi from "../../api/requests/register";
import { toast } from "react-toastify";

export const registrAction = (data, redirectHandler) => dispatch => {
  return regApi
    .registerApi(data)
    .then(dispatch({ type: types.REGIS_START }))
    .then(response => {
      dispatch({
        type: types.REGIS_SUCCESS,
        payload: response.data
      });
    })
    .then(() => {
      toast.success(`Registered successfully`);
    })
    .then(() => {
      redirectHandler();
    })
    .catch(errors => {
      dispatch({
        type: types.REGIS_ERRORS,
        payload:
          errors.response && errors.response.data ? errors.response.data : {}
      });
    });
};
