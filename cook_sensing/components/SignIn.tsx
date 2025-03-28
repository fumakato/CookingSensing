//https://mui.com/material-ui/react-grid/
//上記URLにグリッドの使い方載ってる

import React, { useState, ChangeEvent, useEffect } from "react";
import * as CSS from "csstype";
import { useRouter } from "next/router";

import {
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import type { NextPage } from "next";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User as FireUser,
  signOut,
} from "firebase/auth";

import { auth } from "../pages/firebase/FirebaseConfig";
import axios, { AxiosError } from "axios";

export const SignIn = () => {
  const router = useRouter();
  const apiUrl = "http://localhost:3000";
  const [errorMessage, setErrorMessage] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [fireuser, setFireUser] = useState<FireUser | null>(null);
  const [user_id, setUser_id] = useState("");

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
      console.log(mail);
      console.log(pass);
      await signInWithEmailAndPassword(auth, mail, pass);
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setFireUser(currentUser);
    });
  });

  useEffect(() => {
    if (fireuser) {
      interface Uid {
        uid: string;
      }
      const fire_uid: Uid = {
        uid: fireuser.uid,
      };
      axios
        .post(`${apiUrl}/users/firebase`, fire_uid)
        .then((res) => {
          console.log("res -> " + res.data);
          setUser_id(res.data.user_id);
        })
        .catch((e: AxiosError) => {
          console.error(e);
          signOut(auth);
        });
    }
  }, [fireuser]);

  if (fireuser && user_id) {
    router.push(`/users/${user_id}`);
  }

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
          <LockOutlinedIcon />
          {/* </Avatar> */}

          <Typography variant={"h5"} sx={{ m: "30px" }}>
            Sign In
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

          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            sx={{ marginBottom: "10%", marginTop: "10%" }}
            onClick={handleSubmit}
          >
            サインイン
          </Button>
        </form>
        <Typography variant="caption" display="block">
          アカウントを持っていない方はこちら→
          <Link href="/test/signUp">サインアップ</Link>
        </Typography>
      </Paper>
    </>
  );
};
