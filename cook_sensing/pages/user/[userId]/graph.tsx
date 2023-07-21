//userからのグラフページ
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const UserGraphPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <p>ここはグラフのページ</p>
      {/* <p
        onClick={async () => {
          router.push({
            // pathname: `/${response.data.id}`, //URL
            pathname: "../../recipe/123/detail",
            // pathname: `/${userid}`,
            // query: { moveId: response.data.id }, //検索クエリ
          });
        }}
      >
        recipeへ飛べるか確認用
      </p> */}
    </>
  );
};

export default UserGraphPage;
