//userからのグラフページ
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const UserGraphPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <p>ここはuserpage</p>
    </>
  );
};

export default UserGraphPage;
