//recipeからのグラフページ
import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BarFromApi } from "../../../components";
export const data = {
  labels: [
    "効率",
    "力の強さ",
    "切るはやさの速さ",
    "Thing 4",
    "Thing 5",
    "Thing 6",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [7, 8, 4, 5, 6, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: false,
};

const DetailPage: NextPage = () => {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>きのこの煮込みハンバーグ by ✞✟✞おこめ✟✞✟</h1>
      <p>ケチャップとウスターソースでかんたん煮込み</p>
      <img
        src="https://img.cpcdn.com/recipes/7568811/m/926d7ee2bbbad58e16a2d124c28bbadd?u=14685394&p=1688220140"
        width="300px"
      ></img>

      <p></p>
      <h2>あなたの結果</h2>
      <Radar data={data} options={options} width={500} height={500} />
      <BarFromApi user_id="1" />
    </div>
  );
};

export default DetailPage;

//jsonを読み込んで折れ線グラフを表示
