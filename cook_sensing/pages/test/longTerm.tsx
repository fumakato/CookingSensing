//評価実験のファイル
//長期的な使用を想定したバージョン
// import React, { useState } , { ChangeEvent } from "react";
import React, { ChangeEvent, useState } from "react";
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
  Plugin,
  LegendItem,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Paper, Typography, Container } from "@mui/material";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Image from "next/image";

import accpng from "./../images/acc.png";
import pacepng from "../images/pace.png";

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
  name: "fuseya",

  pace: 84 / 111, //0.759
  acc: 0.859766077350772,
};
const b: User = {
  name: "kakumu",
  pace: 61 / 73, //0.429
  acc: 4.91754234285896,
};
const c: User = {
  name: "nishi",
  pace: 56 / 99, //0.748
  acc: 0.708235422330719,
};
const d: User = {
  name: "rui",
  pace: 50 / 82, //0.259
  acc: 1.26923529123631,
};
const e: User = {
  name: "suzaki",
  // pace: 1 / 0.932, //0.932
  pace: 99 / 67,
  acc: 2.87492107984739,
};
const f: User = {
  name: "togawa",
  pace: 70 / 146, //1.209
  acc: 0.763134431374049,
};
//ここから2回目
// const g: User = {
//   name: "suzaki 2",
//   pace: 69 / 54,
//   acc: 2.95070728906273,
// };
const h: User = {
  name: "kazuo",
  pace: 43 / 51,
  acc: 0.708096016486356,
};
const i: User = {
  name: "isiguro",
  pace: 40 / 45,
  acc: 1.61209179978899,
};
// const j: User = {
//   name: "kakumu 2",
//   pace: 73 / 67,
//   acc: 7.0567076927774,
// };
// const k: User = {
//   name: "fuseya 2",
//   pace: 72 / 80,
//   acc: 1.01423998254415,
// };
// const l: User = {
//   name: "nishi 2",
//   pace: 36 / 38,
//   acc: 0.238737934934806,
// };
// const m: User = {
//   name: "rui 2",
//   pace: 67 / 90,
//   acc: 1.56069921681874,
// };
const n: User = {
  name: "ao",
  pace: 55 / 66,
  acc: 7.25070388928569,
};
const o: User = {
  name: "ueji",
  pace: 53 / 39,
  acc: 1.45085411603776,
};
// const p: User = {
//   name: "togawa 2",
//   pace: 69 / 116,
//   acc: 1.04042242593812,
// };
const q: User = {
  name: "ayato",
  pace: 87 / 86,
  acc: 2.17641501030337,
};
const r: User = {
  name: "fuma",
  pace: 81 / 70,
  acc: 2.66156309436013,
};

// const users: User[] = [a, b, c, d, e, f];
// const users: User[] = [g, h, i, j, k, l, m, n, o, p, q, r];
const users: User[] = [a, b, c, d, e, f, h, i, n, o, q, r];
// const users: User[] = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r];

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

const UserPage: NextPage = () => {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState(0);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const fontsize = 17;

  //🔴🟡🔴🟡🔴🟡🔴🟡🔴🟡ここからグラフ関連🔴🟡🔴🟡🔴🟡🔴🟡🔴🟡
  // 矢印を描画するカスタムプラグイン
  const arrowPlugin: Plugin = {
    id: "arrowPlugin",
    afterDatasetsDraw: (chart) => {
      //固定値は変更できる方がいいなーと思ったり
      const arrowSize = 6; // 矢印の頭のサイズ
      // const positionY = 7.6; //矢印の高さ //下で宣言してる

      const arrowMargin = 30;
      //思わなかったりする
      const { ctx, scales } = chart;
      const yScale = scales.y;
      const xScale = scales.x;

      //縦1目盛に増加する値の計算
      const yTickValues = yScale.ticks.map((tick) => tick.value);
      const yStepValue =
        yTickValues.length > 1 ? yTickValues[1] - yTickValues[0] : 0;
      const positionY = yStepValue * -0.6; // 矢印の高さ

      const y = yScale.getPixelForValue(positionY); // Y軸の位置
      const startX = xScale.left + arrowMargin;
      const endX = xScale.right - arrowMargin;

      ctx.save();
      ctx.strokeStyle = "#555";
      ctx.fillStyle = "#555";
      ctx.lineWidth = 2;

      // 左矢印
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();

      // 左矢印の頭
      ctx.beginPath();
      ctx.moveTo(startX - 2, y);
      ctx.lineTo(startX + arrowSize * 1.9, y - arrowSize);
      ctx.lineTo(startX + arrowSize * 1.9, y + arrowSize);
      ctx.closePath();
      ctx.fill();

      // 右矢印の頭
      ctx.beginPath();
      ctx.moveTo(endX + 2, y);
      ctx.lineTo(endX - arrowSize * 1.9, y - arrowSize);
      ctx.lineTo(endX - arrowSize * 1.9, y + arrowSize);
      ctx.closePath();
      ctx.fill();

      // '良','悪'のテキスト
      // ctx.font = "12px Arial";
      // ctx.font = `${subtitlefontsize}px Arial`;
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("優", endX + arrowSize + 6, y + 2); // テキストの位置
      ctx.fillText("劣", startX - arrowSize - 6, y + 2); // テキストの位置

      ctx.restore();
    },
  };
  // プラグインを登録
  ChartJS.register(arrowPlugin);

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
            size: 10, // ラベルのフォントサイズを設定
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
            size: 12, // ラベルのフォントサイズを設定
          },
          generateLabels: (chart: ChartJS) => {
            const originalLabels =
              ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
            // Dataset 1 の色を変更
            originalLabels[0].fillStyle = redBack; // カスタム色
            originalLabels[0].strokeStyle = redBorder; // カスタム色
            return originalLabels.concat([
              {
                text: "みんな",
                fillStyle: yellowBack,
                strokeStyle: yellowBorder,
                hidden: false,
                index: 0,
              },
              {
                text: "みんなの平均",
                fillStyle: greyBack,
                strokeStyle: greyBorder,
                hidden: false,
                index: 0,
              },
            ]);
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
          text: "加速度の標準偏差（m/s^2）",
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
  const greyBack = "rgba(10, 10, 10, 0.5)";
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

  const labels3 = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
  // const labels3 = accRankingName;
  const data3 = {
    labels: labels3,
    datasets: [
      {
        label: "あなた", //ラベルいるか？
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
      <Container maxWidth="lg">
        <br></br>
        <FormControl fullWidth>
          <InputLabel id="select-label">ユーザーを選択してください</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={selectedOption}
            label="ユーザーを選択してください"
            onChange={handleChange}
          >
            {/* <MenuItem value="">
              <em>選択してください</em>
            </MenuItem> */}
            {usersSortedByNameAscending.map((user, index) => (
              <MenuItem key={index} value={index}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="h6" gutterBottom>
          {usersSortedByNameAscending[selectedOption]?.name}さんの結果
          {/* {selectedOption}さんの結果 */}
        </Typography>
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
            <Bar data={data} width={2000} height={2000} options={options} />
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
            <Bar data={data2} width={2000} height={2000} options={options2} />
          </Paper>
        </Paper>
        <Typography variant="h5" gutterBottom>
          あなたの「1秒間に切った回数」：　
          {usersSortedByNameAscending[selectedOption]?.pace.toFixed(3)}
          　( 回 / s )
        </Typography>
        <Typography variant="h5" gutterBottom>
          みんなの「1秒間に切った回数平均」：　{paceAverage.toFixed(3)}　( 回 /
          s )
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
            <Bar data={data3} width={2000} height={2000} options={options3} />
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
        <br></br>
        <br></br>

        {/* <Image src={pacepng} alt="pace.png" width={1100} />
        <Image src={accpng} alt="acc.png" width={1100} /> */}
      </Container>
    </>
  );
};

export default UserPage;
