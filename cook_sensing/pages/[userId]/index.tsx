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
