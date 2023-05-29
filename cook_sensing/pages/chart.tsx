//グラフ練習用
//折れ線グラフ

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph: React.FC = () => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "以前までの自分との比較",
      },
    },
  };

  const labels = [
    "1回目",
    "2回目",
    "3回目",
    "4回目",
    "5回目",
    "6回目",
    "7回目",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "データ1",
        data: [10, 9, 9, 7, 6, 7, 6],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default Graph;
