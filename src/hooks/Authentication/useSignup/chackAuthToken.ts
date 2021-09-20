import { fireAuth, firestore } from "../../../utils/Firebase/config";

export const checkAuthToken = (userId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // `userId`のドキュメントをリッスンする。onSnapshotでリッスンすると、返り値としてリッスンをリセットする関数が返される。
    // unsubscribeを実行することで、ドキュメントのリッスンを取りやめる。
    const unsubscribe = firestore
      .collection('users')
      .doc(userId)
      .onSnapshot(
        // データの中身が変更されたことを検出するためには、`includeMetadataChanges`オプションを有効にする
        { includeMetadataChanges: true },
        async (doc) => {
          if(!doc.exists) return;
          // トークンを取得
          const idToken = await fireAuth.currentUser?.getIdTokenResult(true);

          // トークンがあり、Hasuraカスタムクレームが追加されているか
          if(idToken?.token && idToken.claims["https://hasura.io/jwt/claims"]) {
            // Hasuraカスタムクレームが追加されていればリッスンをリセットし、トークンを返す。
            unsubscribe();
            resolve(idToken?.token);
          }
        },
        reject
      )
  })
}