import { useState } from "react";
import { storage } from "../../utils/Firebase/config";

type UploadProps = {
  file: {
    thumbnail: File;
    video: File;
  };
  title: string;
  description: string;
  ownerId: string;
};

export const useVideoUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  // Firebase Storageにファイルをアップロードする処理
  const uploadStorage = (id: string, file: File, path: string) => {
    // ファイルから拡張子を抜き出す
    const exe = file.name.split('.').pop();
    // `ref`でファイルのパスを指定する → PCのディレクトリと同じ考え方で、ref('videos/video.mp4')とすれば、videos階層にvideo.mp4を作成する
    // put()で実際にファイルのアップロードを行う。
    return storage.ref(`${path}/${id}.${exe}`).put(file);
  };

  const upload = async({file, title, description, ownerId}: UploadProps) => {
    setLoading(true);

    try {
      // 動画のアップロード処理。動画は全て`videos`という階層に保存する。try-catch構文でPromiseのエラーをキャッチする
      const videoUploadTask = await uploadStorage(file.video.name, file.video, "videos");
      // 画像サムネイルのアップロード処理。サムネイルは全て`thumbnails`という階層に保存する
      const thumbnailUploadTask = await uploadStorage(file.thumbnail.name, file.thumbnail, "thumbnails");
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    upload,
    loading,
    error
  }
};