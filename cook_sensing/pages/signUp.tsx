//topページ
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const SignUpPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <p>ここはサインアップ</p>
    </>
  );
};

export default SignUpPage;
