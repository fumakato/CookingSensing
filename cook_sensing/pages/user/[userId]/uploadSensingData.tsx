//uploadページ
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Header } from "../../../components";
import { onAuthStateChanged, User as FireUser, signOut } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import axios, { AxiosError } from "axios";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

interface TsukurepoPost {
  user_id: number;
  tsukurepo_id: number;
  csv_file: FormData;
}
interface TsukurepoReturn {
  date: string;
  message: string;
  tsukurepo_id: number;
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

  const [radioValue, setRadioValue] = React.useState();
  const [file, setFile] = React.useState<File | null>(null);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
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
      csv_file: formData,
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

  const handleChange = (event) => {
    setRadioValue(event.target.value);
  };

  return (
    <>
      <Header />
      {/* <p>ここはデータのアップロード画面</p>
      <p>ここは7月中に作ろう</p>
      <p>{fireuser?.uid}</p>
      <p>{userId}</p>
      <p>{tsukurepo}</p>
      <p>{tsukurepo.length}</p>
      <p>ラジオボタン{radioValue}</p> */}

      {tsukurepo ? (
        <>
          <FormControl component="fieldset">
            <FormLabel component="legend">つくれぽを選択してください</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={radioValue}
              onChange={handleChange}
            >
              {tsukurepo.map((row, rowIndex) => (
                <FormControlLabel
                  value={row.tsukurepo_id}
                  control={<Radio />}
                  label={row.message}
                />
              ))}
            </RadioGroup>
          </FormControl>
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
    </>
  );
};

export default UploadPage;
