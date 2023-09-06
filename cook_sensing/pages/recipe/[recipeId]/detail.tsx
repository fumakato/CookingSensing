//recipeからのグラフページ
import React from "react";
import { Paper, Grid } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Header, Histogram, RadarChart } from "../../../components";

const DetailPage: NextPage = () => {
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
          <Grid item xs={1.5}></Grid>
          <Grid item xs={9}>
            <Paper
              sx={{
                p: 4,
                // m: 1,
                // margin: "auto",
                m: "10px auto",
                maxWidth: "90%",
                flexGrow: 1,
              }}
            >
              <h1 style={{ textAlign: "left", marginBottom: "50px" }}>
                きのこの煮込みハンバーグ by ✞✟✞おこめ✟✞✟
              </h1>
              <Grid container spacing={0}>
                <Grid item xs={5.5}>
                  <img
                    src="https://img.cpcdn.com/recipes/7568811/m/926d7ee2bbbad58e16a2d124c28bbadd?u=14685394&p=1688220140"
                    width="100%"
                  ></img>
                </Grid>
                <Grid item xs={6.5}>
                  <p>ケチャップとウスターソースでかんたん煮込み</p>
                  <br></br>
                  <p>🟡mitomito(username)</p>
                  <h3>材料 (1~2人分)</h3>
                  <p>玉ねぎ</p>
                  <p>【ハンバーグの具材】合い挽きミンチ</p>
                  <p>【ハンバーグの具材】パン粉</p>
                  <p>【ハンバーグの具材】マヨネーズ</p>
                  <p>ぶなしめじ</p>
                  <p>酒</p>
                  <p>バター</p>
                  <p>★水</p>
                  <p>★ケチャップ</p>
                  <p>★ウスターソース</p>
                  <p>★砂糖</p>
                  <p>★コンソメ</p>
                  <h3>詳しいレシピはこちら</h3>
                </Grid>
              </Grid>

              <p></p>
              <h2>[コックさん]さんの成績</h2>
              <RadarChart type="a" user_id="989" />
              <Histogram type="a" />
              <p
                onClick={async () => {
                  router.push({
                    // pathname: `/${response.data.id}`, //URL
                    pathname: "/recipe/123/everyone",
                    // pathname: `/${userid}`,
                    // query: { moveId: response.data.id }, //検索クエリ
                  });
                }}
              >
                みんなの結果を見る
              </p>
            </Paper>
          </Grid>
          <Grid item xs={1.5}></Grid>
        </Grid>
      </div>
    </>
  );
};

export default DetailPage;
