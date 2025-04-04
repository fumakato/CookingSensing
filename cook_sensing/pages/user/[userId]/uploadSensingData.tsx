//uploadページ
import React, { ChangeEvent, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Header, TsukurepoLatestList } from "../../../components";
import { onAuthStateChanged, User as FireUser, signOut } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import axios, { AxiosError } from "axios";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

interface TsukurepoPost {
  user_id: number;
  tsukurepo_id: string;
  // csv_file: FormData;
}
interface TsukurepoReturn {
  date: string;
  message: string;
  tsukurepo_id: string;
  tsukurepo_image: string;
  recipe_image: string;
  recipe_title: string;
}

const UploadPage: NextPage = () => {
  const router = useRouter();
  const [fireuser, setFireUser] = useState<FireUser | null>(null);
  const [userId, setUserId] = useState("");
  const [tsukurepo, setTsukurepo] = useState<TsukurepoReturn[] | null>(null);
  const apiUrl = "http://localhost:3000";

  const [radioValue, setRadioValue] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleChildValue = (valueFromChild: string) => {
    // console.log(valueFromChild); // 子コンポーネントからの値
    setRadioValue(valueFromChild);
  };

  const onClickSubmit = async () => {
    if (!file) {
      return;
    }
    if (!radioValue) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    const postData: TsukurepoPost = {
      user_id: Number(userId),
      tsukurepo_id: radioValue,
      // csv_file: formData,
    };

    await axios
      .post(`${apiUrl}/uploads`, postData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });
  };

  //firebaseauthのログイン確認
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setFireUser(currentUser);
      console.log("currentUser -> " + currentUser?.uid);
    });
  }, []);

  //firebaseauthのuidからuserIDを求める
  useEffect(() => {
    axios
      .get(`${apiUrl}/users/login/${fireuser?.uid}`)
      .then((res) => {
        setUserId(res.data);
        console.log("user_id -> " + res.data);
      })
      .catch((e: AxiosError) => {
        console.error(e);
        // signOut(auth);
      });
  }, [fireuser]);

  //userIDから直近
  useEffect(() => {
    axios
      .get(`${apiUrl}/certification/id/${userId}`)
      .then((res) => {
        console.log("scraping -> " + res.data);
        // router.push(`/user/${res.data}`);
        // signOut(auth);
        setTsukurepo(res.data);
      })
      .catch((e: AxiosError) => {
        console.error(e);
        // signOut(auth);
      });
  }, [userId]);

  //1. uidからuser_idにpost
  //2. user_idからgetして最新のつくれぽ3件を取得
  //3. つくれぽの表示とチェックボックスの表示
  //4. ファイルの選択 or スマートウォッチからのデータ
  //5. どちらも選択して登録 POST
  //6. POST成功失敗はalartでお知らせ
  //7. メインページに戻る

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        {tsukurepo ? (
          <>
            <Typography
              variant="body1"
              display="block"
              sx={{ margin: "3% 1% 1.5% 3%" }}
              // margin: top right bottom left;
            >
              つくれぽを選択してください
            </Typography>

            <TsukurepoLatestList
              tsukurepos={{ tsukurepo: tsukurepo }}
              onChildValue={handleChildValue}
            />
          </>
        ) : (
          <>
            <p>読み込み中</p>
          </>
        )}
        <input name="file" type="file" accept="*.csv" onChange={onChangeFile} />
        <input
          type="button"
          disabled={!file}
          value="登録"
          onClick={onClickSubmit}
        />
      </Container>
    </>
  );
};

export default UploadPage;
