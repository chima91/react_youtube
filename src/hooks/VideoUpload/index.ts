import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { storage } from "../../utils/Firebase/config";
import { useInsertVideoMutation } from "../../utils/graphql/generated";
import { GlobalUser } from "../../stores/User";

type UploadProps = {
  file: {
    thumbnail: File;
    video: File;
  };
  title: string;
  description?: string;
  ownerId: string;
};

export const useVideoUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  // 動画のメタデータを保存するGraphQL mutation
  const [mutation, { error: apolloError }] = useInsertVideoMutation();

  // videoのownerIdのために、userのidを取得する
  const user = useRecoilValue(GlobalUser);

  // Firebase Storageにファイルをアップロードする処理
  const uploadStorage = (id: string, file: File, path: string) => {
    // ファイルから拡張子を抜き出す
    const exe = file.name.split('.').pop();
    // `ref`でファイルのパスを指定する → PCのディレクトリと同じ考え方で、ref('videos/video.mp4')とすれば、videos階層にvideo.mp4を作成する
    // put()で実際にファイルのアップロードを行う。
    return storage.ref(`${path}/${id}.${exe}`).put(file);
  };

  const upload = async({file, title, description, ownerId}: UploadProps) => {
    if(!user?.id) return;

    setLoading(true);

    // 動画名とサムネイル名、メタデータの動画IDについて、それぞれのuuidを生成する
    const videoName = uuidv4();
    const thumbName = uuidv4();
    const videoId = uuidv4();

    try {
      // 動画のアップロード処理。動画は全て`videos`という階層に保存する。try-catch構文でPromiseのエラーをキャッチする
      const videoUploadTask = await uploadStorage(videoName, file.video, "videos");
      // 画像サムネイルのアップロード処理。サムネイルは全て`thumbnails`という階層に保存する
      const thumbnailUploadTask = await uploadStorage(thumbName, file.thumbnail, "thumbnails");
      // 動画のメタデータを保存する
      const res = await mutation({
        variables: {
          id: videoId,
          title,
          description,
          video_url: videoUploadTask.ref.fullPath,
          thumbnail_url: thumbnailUploadTask.ref.fullPath,
          owner_id: ownerId
        }
      });
      //すべての処理が終わったら、動画のメタデータを返す
      return res.data?.insert_videos_one;
    } catch(error) {
      console.error(error);
      setError(new Error("エラーが発生しました。最初からやり直してください!!!!"));
    } finally {
      setLoading(false);
    }
  };

  // Apollo Clientのエラーをキャッチする
  useEffect(() => {
    if(apolloError) {
      console.error(apolloError);
      setError(new Error("エラーが発生しました。最初からやり直してください!!!!"));
    }
  }, [apolloError]);

  return {
    upload,
    loading,
    error
  }
};