import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/Login",
    component: Login,
    meta: {
      isHideFooter: true,
    },
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: Search,
    props: (route) => ({
      keyword3: route.params.keyword,
      keyword4: route.query.keyword2,
    }),
  },
  {
    name: "detail",
    path: "/detail/:id",
    component: Detail,
  },
  {
    path: "/Register",
    component: Register,
    meta: {
      isHideFooter: true,
    },
  },
];
