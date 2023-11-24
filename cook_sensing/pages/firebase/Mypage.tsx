import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { useRouter } from "next/router";

const Mypage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push({
      pathname: "/firebase/Login",
      // query: { moveId: userid }, //検索クエリ
    });
  };

  return (
    <>
      {user ? (
        <>
          <h1>マイページ</h1>
          {/* 三項演算子使ってる */}
          <p>{user?.email}</p>
          <p>{user?.uid}</p>
          {/* 略さずに書くと下 */}
          {/* <p>{user && user.email}</p> */}
          <button onClick={logout}>ログアウト</button>
        </>
      ) : (
        <>
          <p>
            <a></a>こちらからログインしてください
          </p>
          <button onClick={() => router.push("/firebase/Login")}>
            ログインページへ
          </button>
        </>
      )}
    </>
  );
};

export default Mypage;
