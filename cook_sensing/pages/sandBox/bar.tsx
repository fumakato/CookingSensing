//棒グラフを表示する

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  // PieElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import { colors } from "@material-ui/core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  // PieElement,
  Title,
  Tooltip,
  Legend
);

const Graph: React.FC = () => {
  const options = {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: "他人との比較",
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "ペースの速い人ランキング",
          font: { size: 14 },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "1/平均ペース",
          font: { size: 14 },
        },
        // reverse: true, //逆向きになる
        ticks: {
          callback: function (value) {
            return value + "（ /s）"; // 目盛の編集
          },
        },
      },
    },
  };

  const labels = [
    "aさん",
    "bさん",
    "eさん",
    "cさん",
    "あなた",
    "fさん",
    "dさん",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset",
        // データの値
        data: [0.45, 0.5, 0.55, 0.7, 0.9, 1.2, 1.42],
        // グラフの背景色
        backgroundColor: [
          "rgba(255, 205, 86, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        //ここはfor文とかで回してやらないといけない

        // backgroundColor: [
        //   "rgba(255, 99, 132, 0.2)",
        //   "rgba(255, 159, 64, 0.2)",
        //   "rgba(255, 205, 86, 0.2)",
        //   "rgba(75, 192, 192, 0.2)",
        //   "rgba(54, 162, 235, 0.2)",
        //   "rgba(153, 102, 255, 0.2)",
        //   "rgba(201, 203, 207, 0.2)",
        // ],
        // グラフの枠線の色
        borderColor: [
          "rgb(255, 205, 86)",
          "rgb(255, 205, 86)",
          "rgb(255, 205, 86)",
          "rgb(255, 205, 86)",
          "rgb(255, 99, 132)",
          "rgb(255, 205, 86)",
          "rgb(255, 205, 86)",
        ],
        // グラフの枠線の太さ
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Pie options={options} data={data} width={600} height={600} />
    </>
  );
};

export default Graph;
