import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./page/DefaultLayout";
import Beranda from "./page/Beranda";
import Politik from "./page/politik/Politik";
import Ekonomi from "./page/Ekonomi/Ekonomi";
import Olahraga from "./page/Olahraga/Olahraga";
import Teknologi from "./page/Teknologi/Teknologi";
import Hiburan from "./page/Hiburan/Hiburan";
import Login from "./page/Login/Login";
import Dashboard from "./page/DashboardUser/Dashboard";
import EditProfile from "./page/DashboardUser/pageDashboard/EditProfile";
import BuatArtikel from "./page/DashboardUser/pageDashboard/BuatArtikel";
import Artikelku from "./page/DashboardUser/pageDashboard/Artikelku";
import UserDashboard from "./page/DashboardUser/pageDashboard/UserDashboard";
import EditArtikel from "./page/DashboardUser/pageDashboard/EditArtikel";

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
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "userdashboard", element: <UserDashboard /> },
      { path: "editprofile", element: <EditProfile /> },
      { path: "buatartikel", element: <BuatArtikel /> },
      { path: "artikelku", element: <Artikelku /> },
      {
        path: "editartikel/:id",
        element: <EditArtikel />,
      },
    ],
  },
]);
