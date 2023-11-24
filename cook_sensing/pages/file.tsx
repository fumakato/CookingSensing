//してみたいこと
// アップロード、ローディング表示
// ドラック&ドロップで読み込み
// hidden 属性をつけて他のボタンに置き換え

import React, { useState } from "react";
import axios, { AxiosError } from "axios";

interface CsvData {
  user_id: number;
  recipe_id: number;
  csv_file: FormData;
}

const Graph: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const apiUrl = "http://localhost:3000/users";

  const onClickSubmit = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    const postData: CsvData = {
      user_id: 123456789,
      recipe_id: 987654321,
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

  return (
    <>
      <div className="App">
        <div className="App-form">
          <input
            name="file"
            type="file"
            accept="*.csv"
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
