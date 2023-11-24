import React, { useState } from "react";
import axios, { AxiosError } from "axios";

interface PostData {
  user_id: number;
  name: string;
  image?: string;
}

const Graph: React.FC = () => {
  const [postData, setPostData] = React.useState<PostData | null>(null);

  const apiUrl = "http://localhost:3000/users";

  const onClickSubmit = async () => {
    const postData: PostData = {
      user_id: 123,
      name: "aaa",
    };

    await axios
      .post(`${apiUrl}`, postData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });
  };

  const onClickSubmit2 = async () => {
    const postData: PostData = {
      user_id: 123456789,
      name: "ooo",
      image: "http://",
    };

    await axios
      .put(`${apiUrl}`, postData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });
  };

  return (
    <>
      <input type="button" value="登録" onClick={onClickSubmit} />
      <input type="button" value="更新" onClick={onClickSubmit2} />
    </>
  );
};

export default Graph;
