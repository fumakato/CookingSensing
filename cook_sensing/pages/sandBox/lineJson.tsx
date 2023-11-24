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

import Code from "../../jsonData/cookData.json";

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
    responsive: false,
    plugins: {
      title: {
        // display: true,
        text: "以前までの自分との比較",
      },
    },
  };

  const labels = ["05/26", "05/27", "05/28", "05/29", "05/30", ""];

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
        label: "輪切りのペース",
        data: averagePace,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} width={500} height={500} />
    </>
  );
};

export default Graph;
