import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// firebaseの初期化
admin.initializeApp(functions.config().firebase);

// Firebase FunctionsにprocessSignUpという名前の関数を作成
// `functions.auth.user().onCreate` により、Authenticationでuserが作成されたときに実行される関数を定義
exports.processSignUp = functions.auth.user().onCreate(user => {
  // Hasura用のカスタムクレームの作成
  const customClaims = {
    "http://hasura.io/jwt/claims": {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": user.uid,
    }
  };

  // userのトークンにカスタムトークンを追加する
  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      // カスタムクレームの追加が完了したら、firestoreの "user.uid" に `refreshTime`という名前のタイムスタンプを作成
      // クライアント側はこのデータが作成されるまで待つ。firestoreは `collection` の名前と `doc`の文字列を判別すれば同じデータにアクセスできる
      return admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({ refreshTime: admin.firestore.FieldValue.serverTimestamp() })
    });
})
