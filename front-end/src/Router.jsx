import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import UserLayout from "./Userlayout";
import Beranda from "./page/Beranda";
import UserDashboard from "./page/user/Dashboard";
import EditProfile from "./page/user/Profile";
import Create from "./page/user/Article/Create";
import CreateArticle from "./page/admin/Article/Create";
import Artikelku from "./page/user/Article/MyArticle";
import EditArtikel from "./page/user/Article/Edit";
import Edit from "./page/admin/Article/Edit";
import Auth from "./page/Auth/Auth";
import NotFound from "./NotFound";
import AdminLayout from "./AdminLayout";
import Dashboard from "./page/admin/Dashboard";
import Article from "./page/admin/Article/MyArticle";
import Category from "./page/admin/Category";
import DataUser from "./page/admin/DataUser";
import DataArticle from "./page/admin/DataArticle";
import Profile from "./page/admin/Profile";
import Tags from "./page/admin/Tags";
import CreateUser from "./page/admin/CreateUser";
import CategoryPage from "./page/CategoryPage";
import PostAll from "./page/PostAll";
import DetailBlog from "./page/DetailBlog";
export const route = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Beranda />,
      },
      { path: "category/:categoryName", element: <CategoryPage /> },
      {
        path:"post-all",
        element:<PostAll/>
      },
      {
        path:"detail-post/:slug",
        element:<DetailBlog/>
      }
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
        path: "profile",
        element: <EditProfile />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "my-article",
        element: <Artikelku />,
      },
      {
        path: "edit/:id",
        element: <EditArtikel />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "my-article",
        element: <Article />,
      },
      {
        path: "create",
        element: <CreateArticle />,
      },
      {
        path: "create-user",
        element: <CreateUser />,
      },
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "data-user",
        element: <DataUser />,
      },
      {
        path: "data-article",
        element: <DataArticle />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "tags",
        element: <Tags />,
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
