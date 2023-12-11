import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { teal } from "@mui/material/colors";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Histogram, RadarChart, MadeLatestRecipe, Header } from "../components";
// import { Histogram, MadeLatestRecipe } from "../components";
import AspectRatio from "@mui/joy/AspectRatio";
import { CssVarsProvider } from "@mui/joy/styles";
import { Chart, registerables } from "chart.js";
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
  // export const Login = () => {
  const router = useRouter();
  const apiUrl = "http://localhost:3000";
  const [errorMessage, setErrorMessage] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [userURL, setUserURL] = useState("");
  const [fireuser, setFireUser] = useState<FireUser | null>(null);

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
        try {
          //ここでアカウントを作る
          await createUserWithEmailAndPassword(auth, mail, pass);
        } catch (error: any) {
          alert("メールかパスワードに問題があります");
        }
        try {
          //await
          //ここで梶研DBに登録する
        } catch {
          alert("エラーが発生しました。もう一度お試しください");
        }
        alert("登録が完了しました");
      } else {
        alert("URLが正しいか確認してください");
      }
    } else {
      alert("https://cookpad.com/kitchen/ から始まるURLを入力してください");
    }

    // // こいつはログインのだから変えておこう
    // try {
    //   await signInWithEmailAndPassword(auth, mail, pass);
    // } catch (error) {
    //   alert("メールアドレスまたはパスワードが間違っています");
    // }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setFireUser(currentUser);
    });
  });

  if (fireuser) {
    //ここpostに変える
    axios
      .get(`${apiUrl}/users/login/${fireuser.uid}`)
      .then((res) => {
        console.log("res -> " + res.data);
        router.push(`/user/${res.data}`);
        // signOut(auth);
      })
      .catch((e: AxiosError) => {
        console.error(e);
        signOut(auth);
      });
    // axios
    // .get(`${apiUrl}/users/login/${fireuser.uid}`)
    // .then((res) => {
    //   console.log("res -> " + res.data);
    //   router.push(`/user/${res.data}`);
    //   // signOut(auth);
    // })
    // .catch((e: AxiosError) => {
    //   console.error(e);
    //   signOut(auth);
    // });

    // router.push("/firebase/Mypage");
  }

  // ↓これなんだ？
  // Chart.register(...registerables);
  return (
    <>
      <h1>{fireuser?.email}</h1>
      <h1>{fireuser?.uid}</h1>
      <Paper
        // elevation={0}
        elevation={3}
        sx={{
          p: 4,
          // height: "70vh",
          // width: "30%",
          height: "auto",
          width: "50vw",
          m: "auto auto",
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
          label="あなたのクックパッドのURL(https://cookpad.com/kitchen/0000)"
          variant="standard"
          value={pass}
          fullWidth
          required
          onChange={handleChangeUserURL}
        />

        {/* 🔴 */}
        <Box mt={3}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ marginBottom: "10%" }}
            fullWidth
            // onClick={async () => {
            //   router.push({
            //     // pathname: `/${response.data.id}`, //URL
            //     pathname: `/user/${mail}`, //ここにはIDが入る予定
            //     query: { moveId: mail }, //検索クエリ
            //   });
            // }}
            onClick={handleSubmit}
          >
            サインアップ
          </Button>

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
        </Box>
      </Paper>
    </>
  );
};

// export default Login;
export default SignUpPage;
