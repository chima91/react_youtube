import { Navigate, useRoutes } from "react-router-dom";

import { HomeLayout } from "./layouts/Home";
import { SideLessHomeLayout } from "./layouts/SideLessHome";
import { SimpleLayout } from "./layouts/Simple";
import { ForgetPassForm } from "./pages/ForgetPassForm";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signout } from "./pages/Signout";
import { Signup } from "./pages/Signup";
import { Upload } from "./pages/Upload";
import { Watch } from "./pages/Watch";

export const RootRouter = () => {
  // useRoutesを使用することで、ルーティング用のコンポーネントをライブラリがいい感じに作成してくれる
  // v6.0.0-beta.1から追加された便利機能
  return useRoutes([
    // elementに指定したコンポーネントをページのレイアウトデザインとして使用する
    // childrenでは、pathに指定したurlで使用するコンポーネントを指定する

    // HeaderとSidebarがあるデザインのページ
    {
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "upload", element: <Upload /> }
      ]
    },

    // Headerのみのデザインのページ
    {
      element: <SideLessHomeLayout />,
      children: [
        { path: "watch", element: <Navigate to="/" /> },
        { path: "watch/:videoId", element: <Watch /> }
      ]
    },

    // HeaderもSidebarもないページのデザイン
    {
      element: <SimpleLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "signout", element: <Signout /> },
        { path: "forget", element: <ForgetPassForm /> },
        { path: "404", element: <div>Not Found</div> },
        { path: "*", element: <Navigate to="/404" /> },
      ]
    },
    { path: "*", element: <Navigate to="/404" /> }
  ]);
};