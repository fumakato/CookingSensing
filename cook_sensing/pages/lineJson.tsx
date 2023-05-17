//jsonを読み込んで折れ線グラフを表示

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

import Code from "../jsonData/cookData.json";

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

  const labels = ["1回目", "2回目", "3回目", "4回目", "5回目", "6回目"];

  //jsonの値をいじる
  const averagePace = [];
  const date = [];
  for (var cdNo in Code) {
    var cdStr1 = Code[cdNo]["averagePace"];
    averagePace.push(cdStr1);
    var cdStr2 = Code[cdNo]["date"];
    date.push(cdStr2);
  }

  const data = {
    labels,
    //date,
    datasets: [
      {
        label: "データ1",
        data: averagePace,
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
