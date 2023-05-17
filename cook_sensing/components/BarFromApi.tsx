import axios from "axios";
import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, //これがないと動かん。他のグラフを使うならそれに見合ったエレメントが必要
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2"; //ここにも必要なものを追加

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Recipe {
  id?: string;
  created_at?: Date;
  update_at?: Date;
  dish_name: string;
}

interface BarFromApiArg {
  user_id?: string;
}

const userGrade = "5"; //ここはuser_idの値によって変える必要あり

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

    //inDataの値をセット
    setApiData(inData);
    console.log(inData);
  }, []);

  React.useEffect(() => {
    fetch;
  }, []);
  const options: ChartOptions<"bar"> = {
    responsive: false, //ここをtrueにするとサイズが可変になる。
    //サイズを変えるには呼び出すときにwidthとheightを設定してやる
    plugins: {
      title: {
        display: true, //trueの時はタイトルを表示
        text: "他人との比較", //タイトルをここに入力
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "一秒間あたりの切った回数",
          font: { size: 14 },
        },
        // //ラベルの関係の話
        // ticks: {
        //   callback: function (value: string, index: string, valuesues: string) {
        //     return value + "回"; // 目盛の編集
        //   },
        // },
      },

      y: {
        display: true,
        title: {
          display: true,
          text: "人数",
          font: { size: 14 },
        },
        // reverse: true, //逆向きになる
        ticks: {
          callback(tickValue, index, ticks) {
            return tickValue + "人"; // 目盛の編集
            //tickValue:データの値に応じて変わる
            //index:メモリの横線の数
            //ticks:[object]がいっぱい並んでる
          },
        },
      },
    },
  };

  //labelを作る
  const labels = ["0.0~0.4"];
  for (var i = 0.4; i < 5; i += 0.2) {
    labels.push(i.toFixed(1) + "~" + (i + 0.2).toFixed(1));
  }
  labels.push("5.0~");

  //console.log("user-Id=" + user_id);

  //色作成前にユーザのグレードを確認
  var grade = 100;
  console.log(grade);
  if (userGrade !== undefined) {
    grade = parseInt(userGrade);
  }
  console.log(grade);
  //背景色
  const yellowBack = "rgba(255, 205, 86, 0.2)";
  const redBack = "rgba(255, 99, 132, 0.2)";
  const backGround: string[] = [];
  for (var i = 0; i < 26; i++) {
    if (i != grade) {
      //自分のデータの色
      backGround.push(yellowBack);
    } else {
      backGround.push(redBack);
    }
  }
  //囲い色
  const yellowBorder = "rgb(255, 205, 86)";
  const redBorder = "rgb(255, 99, 132)";
  const border: string[] = [];
  for (var i = 0; i < 26; i++) {
    if (i != grade) {
      //自分のデータの色
      border.push(yellowBorder);
    } else {
      border.push(redBorder);
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset",
        data: apiData,
        backgroundColor: backGround,
        borderColor: border,
        // グラフの枠線の太さ
        borderWidth: 1,
      },
    ],
  };

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
