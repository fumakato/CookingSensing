//レーダーチャートやり直し

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
import { Bar, Radar } from "react-chartjs-2"; //ここにも必要なものを追加
import { Paper } from "@mui/material";

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

//コンポーネントの呼び出し元から送られてくる型
interface RadarApiArg {
  user_id?: string;
  type: string;
  size?: number;
  fontsize?: number;
}

//apiを呼び出して返ってくる値の型
interface RadarGet {
  datas: number[];
  titles: title;
}
//上のtitlesの中身
interface title {
  maintitle: string;
  mainlabel: string;
  label: string[];
}

export const RadarChart = ({
  user_id = "", //値がなかった場合に入る
  type = "", //値がなかった場合に入る
  size = 30, //値がなかった場合に入る
  fontsize = 14,
}: RadarApiArg) => {
  const [getData, setGetData] = React.useState<RadarGet>(); //ここにGetのデータを入れていく

  //url設定
  const url = `http://localhost:3000/chart/radarchart/${user_id}`;
  const fetch = React.useMemo(async () => {
    //apiで接続
    const { data } = await axios.get<RadarGet>(url);
    //上記{data}はdataという値から取ってきているため、他の名前で宣言できないっぽい
    console.log("de-ta->" + data);
    setGetData(data);
  }, []);

  React.useEffect(() => {
    fetch;
  }, []);

  const text = getData?.titles.maintitle;

  const options: ChartOptions<"radar"> = {
    responsive: true, //ここをtrueにするとサイズが可変になる。
    //サイズを変えるには呼び出すときにwidthとheightを設定してやる
    plugins: {
      title: {
        display: true, //trueの時はタイトルを表示
        // text: "他人との比較", //タイトルをここに入力
        text: text, //タイトルをここに入力
        font: { size: fontsize * 1.5 },
      },
    },
    scales: {
      x: {
        display: false,
      },

      y: {
        display: false,
      },
    },
  };

  //囲い色
  const labels = getData?.titles.label;

  const data = {
    labels,
    datasets: [
      {
        label: getData?.titles.mainlabel,
        data: getData?.datas,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (getData !== undefined) {
    return (
      <Paper
        // デバッグよう。elevationは0にするとい
        elevation={0}
        sx={{
          p: 1,
          height: `${size}vw`,
          width: `${size}vw`,
          m: "0px auto",
        }}
      >
        {/* <Bar data={data} width={width} height={height} options={options} /> */}
        <Radar data={data} width={1000} height={1000} options={options} />
      </Paper>
    );
  } else {
    return <></>;
  }
};

// import React from "react";
// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Radar } from "react-chartjs-2";

// ChartJS.register(
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// );

// export const data = {
//   labels: [
//     "効率",
//     "力の強さ",
//     "切るはやさの速さ",
//     "Thing 4",
//     "Thing 5",
//     "Thing 6",
//   ],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [7, 8, 4, 5, 6, 3],
//       backgroundColor: "rgba(255, 99, 132, 0.2)",
//       borderColor: "rgba(255, 99, 132, 1)",
//       borderWidth: 1,
//     },
//   ],
// };

// const options = {
//   responsive: false,
// };

// export function App() {
//   return <Radar data={data} options={options} width={500} height={500} />;
// }

// export default App;
