import { Container, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { VideoCard } from "../../components/VideoCard";

// GraphQLのコア
// QueryやSchemaを書くことで、GraphQLにどのようなデータを取得させるのか、更新させるのかを指示する
const query = `
  query User {
    users {
      id
      name
      profile_photo_url
      created_at
      updated_at
    }
  }
`;

let called = false;

export const Home = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    // ステートが更新されると、コンポーネントも更新されるため、useEffect内の関数も呼び出される。
    // 無限ループを防ぐために、一度関数を呼んだら複数呼ばないようにする。
    if(!called) {
      // Hasuraのコンソールに記載されているGraphQLエンドポイント
      fetch("https://climbing-penguin-88.hasura.app/v1/graphql", {
        // GraphQLは必ずPOSTリクエストを投げる
        method: "post",

        // 認証のためのリクエストヘッダー
        // Hasuraはheadersに記載されている認証情報で、リクエストが許可されているかを判断する
        // 今回はAdminのsecret keyを記載しているのでHasura内の全リソースにアクセス可能
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": "EsoEP4Okn1613F4404mDHb2WQAtmvvRoxrids06qEYABz0yJi5S2xeYB8i4FRul8",
        },

        // GraphQLのリクエスト内容の本体
        // bodyに`query`や値を格納して、GraphQLにどのような処理をして欲しいか指示を出す
        body: JSON.stringify({ query }),
      }).then(async (res) => {
        called = true;

        // fetch関数の定型文。レスポンスを.json()メソッドでフォーマットすることで、JSで扱えるオブジェクトにする
        const json = await res.json();

        // GraphQLは、Responseに`errors`を含んだ状態でエラーを返す。
        // なので、通常のPromiseにおけるエラーハンドリングで`catch`しようとすると、GprahQLではErrorを特定できない。
        if(json?.errors) {
          console.error(json.errors);
        }

        // GraphQLは必ず、`data`という名前のメソッドの中にデータを格納してくる
        if(json?.data?.users.length) {
          // リクエストで送ったQueryに対応した形でデータが返される。
          // 今回は全ての`users`を取得するqueryを生成したので、配列でデータが格納されている。
          const user = json.data.users[0];

          // fetchしたデータをステートに保存
          setUser(user);
        }
      })
    }
  });

  return (
    <Container>
      { [user?.name, ' ', user?.id] }
      <Grid container spacing={2}>
        {/*
          横並びにしたいコンポーネント全てを囲むように<Grid>を配置。このGridには、containerプロパティを指定する。
          containerの指定がない場合、他のコードが合っていても横並び表示はされない。

          横並びにしたいコンポーネントの一つ一つを<Grid>で囲む。こちらのGridでは、itemプロパティを指定する。
          全部を囲む<Grid container>の中にそれぞれの横並び要素の<Grid item>があるイメージ
        */}
        <Grid item xs={4}>
          <VideoCard />
        </Grid>
        <Grid item xs={4}>
          <VideoCard />
        </Grid>
        <Grid item xs={4}>
          <VideoCard />
        </Grid>
        <Grid item xs={4}>
          <VideoCard />
        </Grid>
        <Grid item xs={4}>
          <VideoCard />
        </Grid>
      </Grid>
    </Container>
  )
};