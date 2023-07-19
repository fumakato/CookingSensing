//ヘッダーのコンポーネント
import axios from "axios";
import React from "react";

import {
  Paper,
  Grid,
  styled,
  Typography,
  ButtonBase,
  Box,
} from "@mui/material";

//コンポーネントの呼び出し元から送られてくる型
interface LatestRecipeApiArg {
  user_id?: string;
}

//apiを呼び出して返ってくる値の型
interface RecipeGet {
  recipes: Recipe[];
}
//上のtitlesの中身
interface Recipe {
  title: string;
  explanation: string;
  material: string;
  author: string;
  image: string;
}

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export const Header = ({
  user_id = "0", //値がなかった場合に入る
}: LatestRecipeApiArg) => {
  const [getData, setGetData] = React.useState<RecipeGet>(); //ここにGetのデータを入れていく

  const fetch = React.useMemo(async () => {
    // setGetData(tmpdatas);
  }, []);

  React.useEffect(() => {
    fetch;
  }, []);
  const headerUp = {
    width: "100%",
    height: "5vh",
    backgroundColor: "white",
    margin: "0,0,0,0",
    padding: "1vh",
    borderBottom: "1.5px solid #eeedea",
  };

  const headerUnder = {
    width: "100%",
    height: "10vh",
    backgroundColor: "white",
    margin: "0,0,0,0",
    padding: "1vh",
    borderBottom: "1.5px solid #eeedea",
  };
  const headerIn = {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    margin: "0,0,0,0",
  };

  return (
    <>
      <div style={headerUp}>
        <Grid container spacing={1}>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
            <div style={headerIn}>毎日の料理を楽しみにするために分析する</div>
          </Grid>
          <Grid item xs={4.5}>
            <div style={headerIn}>名前(右詰)</div>
          </Grid>
          <Grid item xs={0.5}>
            <div style={headerIn}>設定</div>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </div>
      <div style={headerUnder}>
        <Grid container spacing={1}>
          <Grid item xs={1.8}></Grid>
          <Grid item xs={2.2}>
            <div style={headerIn}>ロゴ</div>
          </Grid>
          <Grid item xs={3.5}>
            <div style={headerIn}>検索バー</div>
          </Grid>
          <Grid item xs={1.4}>
            <div style={headerIn}>空白</div>
          </Grid>
          <Grid item xs={1.2}>
            <div style={headerIn}>データ投稿</div>
          </Grid>
          <Grid item xs={1.9}></Grid>
        </Grid>
      </div>
      {/*  */}
    </>
  );
};
// style= {{background-color:"white"}}
