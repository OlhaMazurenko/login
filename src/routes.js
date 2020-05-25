
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Profile from "./views/Profile/Profile";

const routes = [
  {
    path: "/login-page",
    name: "Login Page",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register-page",
    name: "Register Page",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/profile",
    name: "User Profile",
    component: Profile,
    layout: "/user"
  },
];

export default routes;
