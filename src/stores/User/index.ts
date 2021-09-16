import { atom } from "recoil";

import { Users } from "../../utils/graphql/generated";

// Pickはある型から特定のプロパティを抜き出し、新しい型を生成するTypeScriptの機能
export type GlobalUserType =
  | Pick<
      Users,
      | "id"
      | "name"
      | "email"
      | "profile_photo_url"
      | "created_at"
      | "updated_at"
    >
  | undefined;

// keyはユニークとなるよう命名する
export const GlobalUser = atom<GlobalUserType>({
  key: "GlabalUser",
  default: undefined,
})