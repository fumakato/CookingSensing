import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import React, { useState, ChangeEvent, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User as FireUser,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase/FirebaseConfig";
import axios, { AxiosError } from "axios";

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const apiUrl = "http://localhost:3000";
  const [errorMessage, setErrorMessage] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [userURL, setUserURL] = useState("");
  const [fireuser, setFireUser] = useState<FireUser | null>(null);
  const [user_id, setUser_id] = useState("");

  // TextFieldの値が変更されたときのハンドラ
  const handleChangeMail = (event: ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  };
  const handleChangePass = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };
  const handleChangeUserURL = (event: ChangeEvent<HTMLInputElement>) => {
    setUserURL(event.target.value);
  };

  //firebaseへのログイン
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userURL.startsWith("https://cookpad.com/kitchen/")) {
      console.log("文字列は指定されたパターンで始まっています");
      const pattern = /kitchen\/(\d+)/;
      const match = userURL.match(pattern);
      if (match) {
        //URLが正しい場合はここになる
        const number = match[1]; // 数字部分
        console.log(number); // 54208270
        setUser_id(number);
        try {
          //ここでアカウントを作る
          await createUserWithEmailAndPassword(auth, mail, pass);
        } catch (error: any) {
          alert("メールかパスワードに問題があります");
        }

        alert("登録が完了しました");
      } else {
        alert("URLが正しいか確認してください");
      }
    } else {
      alert("https://cookpad.com/kitchen/ から始まるURLを入力してください");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setFireUser(currentUser);
    });
  });

  useEffect(() => {
    if (fireuser) {
      interface PostData {
        user_id: number;
        firebase_uid: string;
      }
      const postData: PostData = {
        user_id: Number(user_id),
        firebase_uid: fireuser.uid,
      };
      axios
        .post(`${apiUrl}/users`, postData)
        .then((res) => {
          console.log(res.data);
          router.push(`/user/${res.data.user_id}`);
        })
        .catch((e: AxiosError) => {
          console.error(e);
          alert("エラーが発生しました。");
        });
    }
  }, [fireuser]);

  // ↓これなんだ？
  // Chart.register(...registerables);
  return (
    <>
      <Paper
        // elevation={0}
        elevation={3}
        sx={{
          p: 4,
          // height: "70vh",
          // width: "30%",
          height: "auto",
          width: "50vw",
          m: "3% auto",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
          alignItems="center"
        >
          {/* <Avatar sx={{ bgcolor: teal[400] }}> */}
          <PersonAddAltIcon />
          {/* </Avatar> */}

          <Typography variant={"h5"} sx={{ m: "30px" }}>
            Sign Up
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            type="mail"
            label="メールアドレス"
            variant="standard"
            value={mail}
            fullWidth
            required
            onChange={handleChangeMail}
          />
          <TextField
            type="password"
            label="パスワード"
            variant="standard"
            value={pass}
            fullWidth
            required
            onChange={handleChangePass}
          />
          <TextField
            type="password"
            label="あなたのクックパッドのURL(https://cookpad.com/kitchen/...)"
            variant="standard"
            value={userURL}
            fullWidth
            required
            onChange={handleChangeUserURL}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ marginBottom: "10%", marginTop: "10%" }}
            fullWidth
            // onClick={handleSubmit}
          >
            サインアップ
          </Button>
        </form>
        <Typography variant="caption" display="block">
          あなたのクックパッドURLには
          {/* <Link href="/signUp">アカウントを作成</Link> */}
        </Typography>
        <Typography variant="caption" display="block">
          「https://cookpad.com/kitchen」から始まる
        </Typography>
        <Typography variant="caption" display="block">
          URLを入力してください
        </Typography>

        <Typography variant="caption" display="block">
          アカウントを持っている方はこちら→
          <Link href="/signIn">サインイン</Link>
        </Typography>
      </Paper>
    </>
  );
};

// export default Login;
export default SignUpPage;
