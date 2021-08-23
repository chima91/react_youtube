import { Navigate, useRoutes } from "react-router-dom";
import { HomeLayout } from "./layouts/Home";
import { SideLessHomeLayout } from "./layouts/SideLessHome";
import { SimpleLayout } from "./layouts/Simple";

export const RootRouter = () => {
  // useRoutesを使用することで、ルーティング用のコンポーネントをいい感じにライブラリが作成してくれる
  // v6.0.0-beta.1から追加された便利機能
  return useRoutes([
    // elementに指定したコンポーネントをページのレイアウトデザインとして使用する
    // childrenでは、pathに指定したurlで、使用するコンポーネントを指定する

    // HeaderとSidebarがあるデザインのページ
    {
      element: <HomeLayout />,
      children: [{ path: "/", element: <div>Home</div> }]
    },

    // Headerのみのデザインのページ
    {
      element: <SideLessHomeLayout />,
      children: [
        { path: "watch", element: <Navigate to="/" /> },
        { path: "watch/:videoId", element: <div>watch</div> }
      ]
    },

    // HeaderもSidebarもないページのデザイン
    {
      element: <SimpleLayout />,
      children: [
        { path: "login", element: <div>ログイン</div> },
        { path: "signup", element: <div>新規作成</div> },
        { path: "forget", element: <div>パスワードリセット</div> },
        { path: "404", element: <div>Not Found</div> },
        { path: "*", element: <Navigate to="/404" /> },
      ]
    },
    { path: "*", element: <Navigate to="/404" /> }
  ]);
};