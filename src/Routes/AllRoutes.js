const { default: Login } = require("../Pages/Login");
const { default: Profile } = require("../Pages/Profile");
const { default: Signup } = require("../Pages/Signup");
const { default: Friends } = require("../Pages/Friends");
const { default: Dashboard } = require("../Pages/Dashboard");

const AllRoutes = [
  {
    name: "Login",
    exact: true,
    path: "/login",
    component: <Login />,
    private: false,
  },
  {
    name: "Signup",
    exact: true,
    path: "/signup",
    component: <Signup />,
    private: false,
  },

  {
    name: "Dashboard",
    exact: true,
    path: "/",
    component: <Dashboard />,
    private: true,
  },
  {
    name: "Friends",
    exact: true,
    path: "/messages",
    component: <Friends />,
    private: true,
  },
  {
    name: "Profile",
    exact: true,
    path: "/me",
    component: <Profile />,
    private: true,
  },
];

export default AllRoutes;
