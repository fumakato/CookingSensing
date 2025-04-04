import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User as FireUser,
} from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  const [fireuser, setFireUser] = useState<FireUser | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setFireUser(currentUser);
    });
  });

  if (fireuser) {
    router.push("/firebase/Mypage");
  }

  return (
    <>
      <h1>ログインページ</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button>ログイン</button>
      </form>
    </>
  );
};

export default Login;
