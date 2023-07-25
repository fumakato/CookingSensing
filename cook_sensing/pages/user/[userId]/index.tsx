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
import {
  Histogram,
  RadarChart,
  Header,
  MadeLatestRecipe,
} from "../../../components";

const UserPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Header />

      <div style={{ textAlign: "center" }}>
        <Grid
          container
          spacing={0}
          sx={{
            marginTop: "2vh",
          }}
        >
          <Grid item xs={1}></Grid>
          <Grid
            item
            xs={5}
            onClick={async () => {
              router.push({
                // pathname: `/${response.data.id}`, //URL
                pathname: "123/graph",
                // pathname: `/${userid}`,
                // query: { moveId: response.data.id }, //検索クエリ
              });
            }}
          >
            <RadarChart type="a" user_id="89" />
            <Histogram type={"a"} fontsize={15} />
          </Grid>
          <Grid item xs={5}>
            <MadeLatestRecipe />
          </Grid>

          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </>
  );
};

export default UserPage;
