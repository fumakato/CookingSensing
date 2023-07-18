// import React from "react";
// import { Login } from "../components";
// import { BarFromApi } from "../components";

// const App: React.FC = () => {
//   return (
//     <div>
//       <h1>My App</h1>
//       <Login />
//     </div>
//   );
// };

// export default App;

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
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Histogram, RadarChart, MadeLatestRecipe } from "../components";
// import { Histogram, MadeLatestRecipe } from "../components";
import AspectRatio from "@mui/joy/AspectRatio";
import { CssVarsProvider } from "@mui/joy/styles";
import { Chart, registerables } from "chart.js";

const Home: NextPage = () => {
  // export const Login = () => {
  const router = useRouter();
  const userid = "123";
  Chart.register(...registerables);
  return (
    <>
      <MadeLatestRecipe />
      <Histogram type={"a"} fontsize={15} />
      <Grid>
        <Paper
          // elevation={0}
          elevation={3}
          sx={{
            p: 4,
            height: "70vh",
            width: "30%",
            m: "20px auto",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
            alignItems="center"
          >
            <Avatar sx={{ bgcolor: teal[400] }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography variant={"h5"} sx={{ m: "30px" }}>
              Sign In
            </Typography>
          </Grid>
          <TextField label="Username" variant="standard" fullWidth required />
          {/* <p>{Username}</p> */}
          <TextField
            type="password"
            label="Password"
            variant="standard"
            fullWidth
            required
          />
          {/* ラベルとチェックボックス */}
          {/* <FormControlLabel
          labelPlacement="end"
          label="パスワードを忘れました"
          control={<Checkbox name="checkboxA" size="small" color="primary" />}
        /> */}
          <Box mt={3}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              onClick={async () => {
                router.push({
                  // pathname: `/${response.data.id}`, //URL
                  // pathname: "top",
                  pathname: `/${userid}`,
                  query: { moveId: userid }, //検索クエリ
                });
              }}
            >
              サインイン
            </Button>

            <Typography variant="caption">
              <Link href="#">パスワードを忘れましたか？</Link>
            </Typography>
            <Typography variant="caption" display="block">
              アカウントを持っていますか？
              <Link href="/signUp">アカウントを作成</Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Paper
        elevation={3}
        sx={{
          p: 10,
          height: "80vh",
          width: "40%",
          m: "20px auto",
        }}
      >
        <Histogram type={"a"} fontsize={15} />
      </Paper>
      <Paper
        elevation={3}
        sx={{
          p: 10,
          height: "80vh",
          width: "40%",
          m: "20px auto",
        }}
      >
        <RadarChart type={"a"} user_id="89" />
      </Paper>
    </>
  );
};

// export default Login;
export default Home;
