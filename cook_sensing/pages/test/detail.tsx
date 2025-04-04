//recipeからのグラフページ

import React, { ChangeEvent, useState } from "react";
import { Paper, Grid } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Header,
  Histogram,
  RadarChart,
  RadarChartDemo2,
} from "../../components";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement, //これがないと動かん。他のグラフを使うならそれに見合ったエレメントが必要
  Title,
  ChartOptions,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import { Typography, Container } from "@mui/material";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

ChartJS.register(
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Filler,
  Tooltip,
  Legend
);

interface User {
  name: string;
  pace: number;
  acc: number;
}

const a: User = {
  // name: "fuseya",
  name: "A",

  pace: 84 / 111, //0.759
  acc: 0.859766077350772,
};
const b: User = {
  // name: "kakumu",
  name: "B",
  pace: 61 / 73, //0.429
  acc: 4.91754234285896,
};
const c: User = {
  // name: "nishi",
  name: "C",
  pace: 56 / 99, //0.748
  acc: 0.708235422330719,
};
const d: User = {
  // name: "rui",
  name: "D",
  pace: 50 / 82, //0.259
  acc: 1.26923529123631,
};
const e: User = {
  // name: "suzaki",
  name: "E",
  // pace: 1 / 0.932, //0.932
  pace: 99 / 67,
  acc: 2.87492107984739,
};
const f: User = {
  // name: "togawa",
  name: "F",
  pace: 70 / 146, //1.209
  acc: 0.763134431374049,
};
const h: User = {
  // name: "kazuo",
  name: "G",
  pace: 43 / 51,
  acc: 0.708096016486356,
};
const i: User = {
  // name: "isiguro",
  name: "H",
  pace: 40 / 45,
  acc: 1.61209179978899,
};
const n: User = {
  // name: "ao",
  name: "I",
  pace: 55 / 66,
  acc: 7.25070388928569,
};
const o: User = {
  // name: "ueji",
  name: "J",
  pace: 53 / 39,
  acc: 1.45085411603776,
};
const q: User = {
  // name: "ayato",
  name: "K",
  pace: 87 / 86,
  acc: 2.17641501030337,
};
const r: User = {
  // name: "fuma",
  name: "L",
  pace: 81 / 70,
  acc: 2.66156309436013,
};
const users: User[] = [a, b, c, d, e, f, h, i, n, o, q, r];
//ヒストグラム用設定
// const histogramMin = 0.3;
const histogramMin = 0.3;
// const histogramMax = 1.5;
const histogramMax = 1.6;
//ヒストグラム生成
const histogram: Record<string, number> = {};
for (let pace = histogramMin; pace <= histogramMax; pace += 0.1) {
  histogram[pace.toFixed(1)] = 0;
}
users.forEach((user) => {
  const paceCategory = Math.floor(user.pace * 10) / 10;

  //   if (paceCategory >= 0.7 && paceCategory <= 4.0) {
  if (paceCategory >= histogramMin && paceCategory <= histogramMax) {
    histogram[paceCategory.toFixed(1)]++;
  }
});

//カットペースの平均
const paceValues = users.map((user) => user.pace);
const paceSum = paceValues.reduce((acc, val) => acc + val, 0);
const paceAverage = paceSum / paceValues.length;

//加速度の平均
const accValues = users.map((user) => user.acc);
const accSum = accValues.reduce((acc, val) => acc + val, 0);
const accAverage = accSum / accValues.length;

//ユーザの名前ソート
const usersSortedByNameAscending = [...users].sort((a, b) => {
  return a.name.localeCompare(b.name);
});
const average: User = {
  name: "average",
  pace: paceAverage,
  acc: accAverage,
};

usersSortedByNameAscending.push(average);

users.push(average);
//カットペースのランキング
const usersSortedByPaceAscending = users.sort((a, b) => a.pace - b.pace);
const paceRanking = usersSortedByPaceAscending.map((user) => user.pace);
const paceRankingName = usersSortedByPaceAscending.map((user) => user.name);

//加速度のランキング
const usersSortedByAccAscending = users.sort((a, b) => b.acc - a.acc);
const accRanking = usersSortedByAccAscending.map((user) => user.acc);
const accRankingName = usersSortedByAccAscending.map((user) => user.name);

const DetailPage: NextPage = () => {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState(2);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const fontsize = 17;
  //🔴🟡🔴🟡🔴🟡🔴🟡🔴🟡ここからグラフ関連🔴🟡🔴🟡🔴🟡🔴🟡🔴🟡
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "1秒間に切った回数",
        font: { size: fontsize * 1.5 },
      },
      legend: {
        labels: {
          font: {
            size: 0, // ラベルのフォントサイズを設定
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "",
          font: { size: fontsize },
        },
        ticks: {
          autoSkip: false, // x軸のラベルを全て表示する設定
          // maxRotation: 90, // ラベルの最大回転角度
          // minRotation: 90, // ラベルの最小回転角度
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "一秒間あたりの切った回数(回/s)",
          font: { size: fontsize },
        },

        ticks: {
          callback(tickValue, index, ticks) {
            return tickValue;
          },
        },
      },
    },
  };
  const options3: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "包丁を扱う力のブレの大きさ",
        font: { size: fontsize * 1.5 },
      },
      legend: {
        labels: {
          font: {
            size: 0, // ラベルのフォントサイズを設定
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "",
          font: { size: fontsize },
        },
        ticks: {
          autoSkip: false, // x軸のラベルを全て表示する設定
          // maxRotation: 90, // ラベルの最大回転角度
          // minRotation: 90, // ラベルの最小回転角度
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "加速度の標準偏差",
          font: { size: fontsize },
        },

        ticks: {
          callback(tickValue, index, ticks) {
            return tickValue;
          },
        },
      },
    },
  };
  const options2: ChartOptions<"bar"> = {
    responsive: true, //ここをtrueにするとサイズが可変になる。
    //サイズを変えるには呼び出すときにwidthとheightを設定してやる
    plugins: {
      title: {
        display: true, //trueの時はタイトルを表示
        // text: "他人との比較", //タイトルをここに入力
        text: "1秒間に切った回数のヒストグラム", //タイトルをここに入力
        font: { size: fontsize * 1.5 },
      },
      legend: {
        labels: {
          font: {
            size: 0, // ラベルのフォントサイズを設定
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          //   text: "一秒間あたりの切った回数",
          text: "階級(回/s)",
          font: { size: fontsize },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          //   text: "人数",
          text: "人数(人)",
          font: { size: fontsize },
        },
        // reverse: true, //逆向きになる
        ticks: {
          stepSize: 1, // ここで縦軸の刻みを設定
          callback(tickValue, index, ticks) {
            return tickValue;
          },
        },
      },
    },
  };
  //背景色
  const yellowBack = "rgba(255, 205, 86, 0.7)";
  const redBack = "rgba(255, 99, 132, 0.7)";
  const greyBack = "rgba(10, 10, 10, 0.6)";
  var labellength = users.length;

  const backGround: string[] = [];
  for (var i = 0; i < labellength; i++) {
    if (paceRankingName[i] === "average") {
      backGround.push(greyBack);
    } else if (
      paceRankingName[i] !== usersSortedByNameAscending[selectedOption].name
    ) {
      backGround.push(yellowBack);
    } else {
      backGround.push(redBack);
    }
  }
  const backGround3: string[] = [];
  for (var i = 0; i < labellength; i++) {
    if (accRankingName[i] === "average") {
      backGround3.push(greyBack);
    } else if (
      accRankingName[i] !== usersSortedByNameAscending[selectedOption].name
    ) {
      backGround3.push(yellowBack);
    } else {
      backGround3.push(redBack);
    }
  }
  const backGround2: string[] = [];
  for (let pace = histogramMin; pace <= histogramMax; pace += 0.1) {
    const aa = pace.toFixed(1);
    const bb = (
      Math.floor(usersSortedByNameAscending[selectedOption].pace * 10) / 10
    ).toFixed(1);
    if (histogram[pace.toFixed(1)] === 0) {
      backGround2.push(yellowBack);
    } else if (aa === bb) {
      backGround2.push(redBack);
    } else {
      backGround2.push(yellowBack);
    }
  }
  //囲い色
  const yellowBorder = "rgb(255, 205, 86)";
  const redBorder = "rgb(255, 99, 132)";
  const greyBorder = "rgba(10, 10, 10,0.6)";

  const border: string[] = [];
  for (var i = 0; i < labellength; i++) {
    if (paceRankingName[i] === "average") {
      border.push(greyBorder);
    } else if (
      paceRankingName[i] !== usersSortedByNameAscending[selectedOption].name
    ) {
      //自分のデータの色
      border.push(yellowBorder);
    } else {
      border.push(redBorder);
    }
  }
  const border3: string[] = [];
  for (var i = 0; i < labellength; i++) {
    if (accRankingName[i] === "average") {
      border3.push(greyBorder);
    } else if (
      accRankingName[i] !== usersSortedByNameAscending[selectedOption].name
    ) {
      //自分のデータの色
      border3.push(yellowBorder);
    } else {
      border3.push(redBorder);
    }
  }

  const border2: string[] = [];
  for (let pace = histogramMin; pace <= histogramMax; pace += 0.1) {
    const aa = pace.toFixed(1);
    const bb = (
      Math.floor(usersSortedByNameAscending[selectedOption].pace * 10) / 10
    ).toFixed(1);
    if (histogram[pace.toFixed(1)] === 0) {
      border2.push(yellowBorder);
    } else if (aa === bb) {
      border2.push(redBorder);
    } else {
      border2.push(yellowBorder);
    }
  }
  const labels = paceRankingName;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "data", //ラベルいるか？
        data: paceRanking,
        backgroundColor: backGround,
        borderColor: border,
        // グラフの枠線の太さ
        borderWidth: 1,
      },
    ],
  };

  const labels3 = accRankingName;
  const data3 = {
    labels: labels3,
    datasets: [
      {
        label: "data", //ラベルいるか？
        data: accRanking,
        backgroundColor: backGround3,
        borderColor: border3,
        // グラフの枠線の太さ
        borderWidth: 1,
      },
    ],
  };
  //const labels2 = accRankingName;
  const labels2: string[] = [];
  const data2 = {
    labels: labels2,
    datasets: [
      {
        label: "data", //ラベルいるか？
        data: histogram,
        backgroundColor: backGround2,
        borderColor: border2,
        // グラフの枠線の太さ
        borderWidth: 1,
      },
    ],
  };
  // console.log(histogram);

  return (
    <>
      {/* <Header /> */}
      <div style={{ textAlign: "center" }}>
        <Grid
          container
          spacing={0}
          sx={{
            marginTop: "2vh",
          }}
        >
          <Grid item xs={1.5}></Grid>
          <Grid item xs={9}>
            <Paper
              sx={{
                p: 4,
                // m: 1,
                // margin: "auto",
                m: "10px auto",
                maxWidth: "90%",
                flexGrow: 1,
              }}
            >
              <p></p>
              <h2>guest さんの成績</h2>

              <Paper
                sx={{
                  p: 2,
                  // m: 1,
                  // margin: "auto",
                  m: "10px auto",
                  maxWidth: "90%",
                  flexGrow: 1,
                }}
              >
                <Paper
                  // デバッグよう。elevationは0にするとい
                  elevation={0}
                  sx={{
                    p: 0,
                    height: "40vw",
                    width: "40vw",
                    m: "0px auto",
                  }}
                  // background-image
                  // style={{ backgroundColor: "#fafaf5" }}
                >
                  {/* <Bar data={data} width={width} height={height} options={options} /> */}
                  <Bar
                    data={data}
                    width={2000}
                    height={2000}
                    options={options}
                  />
                </Paper>
              </Paper>
              <Paper
                sx={{
                  p: 2,
                  // m: 1,
                  // margin: "auto",
                  m: "10px auto",
                  maxWidth: "90%",
                  flexGrow: 1,
                }}
              >
                <Paper
                  // デバッグよう。elevationは0にするとい
                  elevation={0}
                  sx={{
                    p: 0,
                    height: "40vw",
                    width: "40vw",
                    m: "0px auto",
                  }}
                  // background-image
                  // style={{ backgroundColor: "#fafaf5" }}
                >
                  {/* <Bar data={data} width={width} height={height} options={options} /> */}
                  <Bar
                    data={data2}
                    width={2000}
                    height={2000}
                    options={options2}
                  />
                </Paper>
              </Paper>
              <Typography variant="h5" gutterBottom>
                あなたの「1秒間に切った回数」：　
                {usersSortedByNameAscending[selectedOption]?.pace.toFixed(3)}
                　( 回 / s )
              </Typography>
              <Typography variant="h5" gutterBottom>
                みんなの「1秒間に切った回数平均」：　{paceAverage.toFixed(3)}　(
                回 / s )
              </Typography>
              <br></br>
              <br></br>
              <Paper
                sx={{
                  p: 2,
                  // m: 1,
                  // margin: "auto",
                  m: "10px auto",
                  maxWidth: "90%",

                  flexGrow: 1,
                }}
              >
                <Paper
                  // デバッグよう。elevationは0にするとい
                  elevation={0}
                  sx={{
                    p: 0,
                    height: "40vw",
                    width: "40vw",
                    m: "0px auto",
                  }}
                  // background-image
                  // style={{ backgroundColor: "#fafaf5" }}
                >
                  <Bar
                    data={data3}
                    width={2000}
                    height={2000}
                    options={options3}
                  />
                </Paper>
              </Paper>
              <Typography variant="h5" gutterBottom>
                あなたの「包丁を扱う力のブレの大きさ」(加速度標準偏差)：　
                {usersSortedByNameAscending[selectedOption]?.acc.toFixed(3)}
              </Typography>
              <Typography variant="h5" gutterBottom>
                みんなの「包丁を扱う力のブレの大きさ」(加速度標準偏差)の平均：　
                {accAverage.toFixed(3)}
              </Typography>
              <br></br>
            </Paper>
          </Grid>
          <Grid item xs={1.5}></Grid>
        </Grid>
      </div>
    </>
  );
};

export default DetailPage;
