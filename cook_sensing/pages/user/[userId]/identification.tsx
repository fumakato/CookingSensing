//本人確認
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Header } from "../../../components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios, { AxiosError } from "axios";

interface IdentificationPost {
  user_url: number; //=user_ID
  tsukurepo_text: string;
}

const Identification: NextPage = () => {
  const router = useRouter();
  const [userURL, setUserURL] = useState("");
  const [userText, setUserText] = useState("");
  const [urlErrorMessage, setUrlErrorMessage] = useState("");

  const handleChangeURL = (event) => {
    setUserURL(event.target.value);
  };

  const handleChangeText = (event) => {
    setUserText(event.target.value);
  };

  const onClickSubmit = async () => {
    console.log(userURL);
    if (userURL.startsWith("https://cookpad.com/kitchen/")) {
      console.log("文字列は指定されたパターンで始まっています");
      const pattern = /kitchen\/(\d+)/;
      const match = userURL.match(pattern);
      if (match) {
        const number = match[1]; // 数字部分
        console.log(number); // 54208270
      } else {
        setUrlErrorMessage("URLが正しいか確認してください");
      }
    } else {
      setUrlErrorMessage("クックパッドのキッチンのURLを入力してださい");
    }
    // await axios
    //   .post("http://localhost:3000/certification", userURL)
    //   .then(() => {})
    //   .catch(() => {});
  };

  return (
    <>
      <Header />
      <TextField
        id="standard-basic"
        label="MykitchenのURL"
        variant="standard"
        value={userURL}
        onChange={handleChangeURL}
      />
      <br></br>
      <TextField
        id="standard-basic"
        label="送信するつくれぽ"
        variant="standard"
        value={userText}
        onChange={handleChangeText}
      />
      <Button variant="text" onClick={onClickSubmit}>
        登録
      </Button>

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

export default Identification;
