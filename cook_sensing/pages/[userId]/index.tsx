//topページ
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
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { teal } from "@mui/material/colors";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
import { Histogram, RadarChart, Header } from "../../components";

const UserPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <div style={{ textAlign: "center" }}>
        <Grid container spacing={0}>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <button
              onClick={async () => {
                router.push({
                  // pathname: `/${response.data.id}`, //URL
                  pathname: "/123/uploadSensingData",
                  // pathname: `/${userid}`,
                  // query: { moveId: response.data.id }, //検索クエリ
                });
              }}
            >
              データの送信
            </button>
            <Paper
              elevation={3}
              sx={{
                p: 10,
                height: "80vh",
                width: "40%",
                m: "20px auto",
              }}
            >
              <h2>あなたの成績</h2>
              <RadarChart type={"a"} user_id="89" />
            </Paper>

            <p>最近作ったレシピ</p>
            <p>1. きのこの煮込みハンバーグ by✞✟✞おこめ✟✞✟</p>
            {/* https://cookpad.com/recipe/7568811 */}
            <img
              src="https://img.cpcdn.com/recipes/7568811/m/926d7ee2bbbad58e16a2d124c28bbadd?u=14685394&p=1688220140"
              width="150px"
              onClick={async () => {
                router.push({
                  // pathname: `/${response.data.id}`, //URL
                  pathname: "/recipe/123/detail",
                  // pathname: `/${userid}`,
                  // query: { moveId: response.data.id }, //検索クエリ
                });
              }}
            ></img>
            <p>2. 子どもにも！カレー粉で作るキーマカレー byりかkitchen</p>
            {/* https://cookpad.com/recipe/7569838 */}
            <img
              src="https://img.cpcdn.com/recipes/7569838/894x1461s/d419459449130773506293749d05ba91?u=15605400&p=1688353034"
              width="150px"
            ></img>
            <p>3. ちょっと固めの美味しいプリン♡ byガトーさん</p>
            {/* https://cookpad.com/recipe/7570040 */}
            <img
              src="https://img.cpcdn.com/recipes/7570040/m/ece04b59a62e8ba27d326a59967001df?u=8424553&p=1688372677"
              width="150px"
            ></img>
            <p></p>
            <button
              onClick={async () => {
                router.push({
                  // pathname: `/${response.data.id}`, //URL
                  pathname: "/123/recipe",
                  // pathname: `/${userid}`,
                  // query: { moveId: response.data.id }, //検索クエリ
                });
              }}
            >
              過去に作ったレシピ一覧
            </button>
            <p></p>
            <p></p>
            {/* <p></p>
      <button
        onClick={async () => {
          router.push({
            // pathname: `/${response.data.id}`, //URL
            pathname: "/123/graph",
            // pathname: `/${userid}`,
            // query: { moveId: response.data.id }, //検索クエリ
          });
        }}
      >
        自分のグラフ
      </button>
      <p></p>
      <button
        onClick={async () => {
          router.push({
            // pathname: `/${response.data.id}`, //URL
            pathname: "/123/preference",
            // pathname: `/${userid}`,
            // query: { moveId: response.data.id }, //検索クエリ
          });
        }}
      >
        設定
      </button> */}
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </>
  );
};

export default UserPage;
