import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import UserLayout from "./Userlayout";
import Beranda from "./page/Beranda";
import Politik from "./page/Politik";
import Ekonomi from "./page/Ekonomi";
import Olahraga from "./page/Olahraga";
import Teknologi from "./page/Teknologi";
import Hiburan from "./page/Hiburan";
import UserDashboard from "./page/user/Dashboard";
import EditProfile from "./page/user/Profile";
import Create from "./page/user/Article/Create";
import Artikelku from "./page/user/Article/MyArticle";
import EditArtikel from "./page/user/Article/Edit";
import Auth from "./page/Auth/Auth";
import NotFound from "./NotFound";
export const route = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Beranda />,
      },
      {
        path: "/politik",
        element: <Politik />,
      },

      {
        path: "/ekonomi",
        element: <Ekonomi />,
      },

      {
        path: "/olahraga",
        element: <Olahraga />,
      },

      {
        path: "/teknologi",
        element: <Teknologi />,
      },

      {
        path: "/hiburan",
        element: <Hiburan />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "dashboard",
        element: <UserDashboard />,
      },
      {
        path: "editprofile",
        element: <EditProfile />,
      },
      {
        path: "create-article",
        element: <Create />,
      },
      {
        path: "my-article",
        element: <Artikelku />,
      },
      {
        path: "article-edit/:id",
        element: <EditArtikel />,
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
