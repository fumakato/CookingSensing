//本人確認webスクレイピングのコンポーネント

import axios from "axios";
import React from "react";


interface Recipe {
  id?: string;
  created_at?: Date;
  update_at?: Date;
  dish_name: string;
}

interface BarFromApiArg {
  user_id?: string;
}


interface Tsukurepo{

}



export const BarFromApi = ({ user_id = "100" }: BarFromApiArg) => {
  const setting: string[] = [];
  const [apiData, setApiData] = React.useState(setting);

  const [user_id_url, setUser_id_url] = React.useState(user_id);

  const recipe: Recipe = {
    id: "2",
    dish_name: "カレー",
  };

  const fetch = React.useMemo(async () => {
    // const url2 = "http://localhost:3000/recipes";
    // const response2 = await axios.put(url2, recipe);
    // console.log("<<<<<");
    // console.log(response2);
    // console.log(">>>>>");

    //url設定
    const url = "http://localhost:3000/histogram/cut-paces";
    //apiで接続
    const response = await axios.get(url);
    //inDataに中のデータを入れる
    const inData: string[] = [];
    var flg = false; //最初の一つのデータは捨てる
    for (var cdNo in response.data) {
      if (flg) {
        inData.push(response.data[cdNo]);
      } else {
        flg = true;
      }
    }

    const id = "1";
    const url2 = `http://localhost:3000/users/${id}`;
    //apiで接続
    // const response2 = await axios.get(url2, {
    //   params: {
    //     id: user_id,
    //   },
    // });
    const response2 = await axios.get(url2);

    console.log("res2=" + response2);


  

  

  if (apiData !== undefined) {
    return (
      <pre>
        <Bar data={data} width={800} height={800} options={options} />
      </pre>
    );
  } else {
    return <></>;
  }
};
