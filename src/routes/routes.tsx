

import Home from "../pages/home";
import Auth from "../pages/auth";
import Docs from "../pages/docs";


const privateRoutes = [
  {
    path: "",
    component: <Home />,
    exact: true,
  },
  {
    path: "/:id",
    component: <Docs />,
    exact: true,
  }
];



const publicRoutes = [
  {
    path: "login",
    component: <Auth />,
    exact: true,
  },

];

export { privateRoutes, publicRoutes };
