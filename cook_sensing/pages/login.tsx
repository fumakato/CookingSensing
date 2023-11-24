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
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User as FireUser,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase/FirebaseConfig";
import axios, { AxiosError } from "axios";

const Home: NextPage = () => {
  // export const Login = () => {
  const router = useRouter();
  const apiUrl = "http://localhost:3000";
  const [errorMessage, setErrorMessage] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  // TextFieldの値が変更されたときのハンドラ
  const handleChangeMail = (event: ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  };
  const handleChangePass = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  //firebaseへのログイン
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, mail, pass);
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
          height: "70vh",
          width: "50vh",
          m: "20px auto",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
          alignItems="center"
        >
          <Avatar sx={{ bgcolor: teal[400] }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant={"h5"} sx={{ m: "30px" }}>
            Sign In
          </Typography>
        </Grid>

        <TextField
          type="mail"
          label="mail"
          variant="standard"
          value={mail}
          fullWidth
          required
          onChange={handleChangeMail}
        />
        <TextField
          type="password"
          label="Password"
          variant="standard"
          value={pass}
          fullWidth
          required
          onChange={handleChangePass}
        />

        {/* 🔴 */}
        <Box mt={3}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
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
            サインイン
          </Button>

          {/* <Typography variant="caption">
            <Link href="#">パスワードを忘れましたか？</Link>
          </Typography> */}

          <Typography variant="caption" display="block">
            アカウントを持っていますか？
            <Link href="/signUp">アカウントを作成</Link>
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

// export default Login;
export default Home;
