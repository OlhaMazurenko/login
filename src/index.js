import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter, withRouter } from "react-router-dom";
import Auth from "./layouts/Auth";
import "./scss/main.scss";
import rootReducer from "./store/rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import User from "./layouts/User";
import Dashboard from "./views/Dashboard/Dashboard";
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const pStore = persistStore(store);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={pStore}>
        <div
          className="main-content"
          style={{ height: "100vh", width: "100vw" }}
        >
          <Switch>
            <Route path="/user" render={(routeProps) => <User {...routeProps}/>} />
            <Route
              path="/auth"
              render={routeProps => <Auth {...routeProps} />}
            />
             <Route path="/" exact render={(routeProps) => <Dashboard {...routeProps}/>} />
          </Switch>
        </div>
      </PersistGate>
    </BrowserRouter>
    <ToastContainer autoClose={2000} />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
