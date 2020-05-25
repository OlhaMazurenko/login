import { combineReducers } from "redux";
import auth from "./reducers/auth";
import reg from "./reducers/regis";
import {  persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import me  from "./reducers/me";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["me"]
}
const rootReducer = combineReducers({
  auth,
  reg,
  me
});

export default persistReducer(persistConfig, rootReducer);
