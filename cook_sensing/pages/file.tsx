//してみたいこと
// アップロード、ローディング表示
// ドラック&ドロップで読み込み
// hidden 属性をつけて他のボタンに置き換え

import React, { useState } from "react";
import axios, { AxiosError } from "axios";

const Graph: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const apiUrl = "aa";

  const onClickSubmit = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    await axios
      .post(`${apiUrl}/api/upload`, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });
  };

  return (
    <>
      <div className="App">
        <div className="App-form">
          <input
            name="file"
            type="file"
            accept="*.scv"
            onChange={onChangeFile}
          />
          <input
            type="button"
            disabled={!file}
            value="送信"
            onClick={onClickSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Graph;
