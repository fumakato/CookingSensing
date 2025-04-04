// SignInComponent.tsx
import React from "react";
import { signInWithGoogle, logout } from "./firebase";

const SignInComponent: React.FC = () => {
  return (
    <div>
      <button onClick={signInWithGoogle}>Googleでサインイン</button>
      <button onClick={logout}>サインアウト</button>
    </div>
  );
};

export default SignInComponent;
