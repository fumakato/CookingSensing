//uploadページ
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const UploadPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <p>ここはデータのアップロード画面</p>
      <p>ここは7月中に作ろう</p>
    </>
  );
};

export default UploadPage;
