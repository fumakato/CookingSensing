//https://mui.com/material-ui/react-grid/
//上記URLにグリッドの使い方載ってる

import axios from "axios";
import React from "react";

import { Paper, Grid, styled, Typography, ButtonBase } from "@mui/material";

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

export const MadeLatestRecipe = ({
  user_id = "0", //値がなかった場合に入る
}: LatestRecipeApiArg) => {
  const [getData, setGetData] = React.useState<RecipeGet>(); //ここにGetのデータを入れていく

  //   const url = `http://localhost:3000/recipe/latest/${user_id}`;
  //   const fetch = React.useMemo(async () => {
  //     const { data } = await axios.get<RecipeGet>(url);
  //     //上記{data}はdataという値から取ってきているため、他の名前で宣言できないっぽい
  //     setGetData(data);
  //   }, []);

  //   React.useEffect(() => {
  //     fetch;
  //   }, []);

  //   const text = getData?.recipes[0].title;
  const tmpdata1: Recipe = {
    title: "うちのカレー",
    explanation: "家で作ってたカレーです",
    author: "ゴリラ",
    material:
      "パルメザンチーズ、ズッキーニ、にら、らっきょう、ういろう、うづらのたまご、ごま",
    image:
      "https://img.cpcdn.com/recipes/7543426/894x1461s/03789cbf29381cf7fa6857ee07177ee1?u=52069349&p=1689583076",
  };
  const tmpdata2: Recipe = {
    title: "こだわりのラーメン",
    explanation: "道で拾いました",
    author: "切らず",
    material: "材料",
    image:
      "https://img.cpcdn.com/recipes/7578996/894x1461s/6460200f56dc605f2bde42ce2d1b33a2?u=8645521&p=1689419516",
  };
  const tmpdata3: Recipe = {
    title: "トントンかつ",
    explanation: "fooooooo",
    author: "紫陽花",
    material: "材料",
    image:
      "https://img.cpcdn.com/recipes/7574224/894x1461s/8c44d33cde03f21a38acfe162a0401ef?u=41499908&p=1688871936",
  };

  const tmpdatas: RecipeGet = {
    recipes: [tmpdata1, tmpdata2, tmpdata3],
  };

  const fetch = React.useMemo(async () => {
    setGetData(tmpdatas);
  }, []);

  React.useEffect(() => {
    fetch;
  }, []);

  if (getData !== undefined) {
    return (
      <>
        {(() => {
          const items = [];
          for (let i = 0; i < getData?.recipes.length; i++) {
            items.push(
              <div>
                <Paper
                  sx={{
                    p: 2,
                    // m: 1,
                    // margin: "auto",
                    m: "20px auto",
                    maxWidth: 500,
                    flexGrow: 1,

                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src={getData.recipes[i].image} />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs wrap="nowrap">
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {getData.recipes[i].title}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {getData.recipes[i].explanation}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {getData.recipes[i].material}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            // sx={{ cursor: "pointer" }}
                            variant="body2"
                          >
                            by. {getData.recipes[i].author}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            );
          }
          return <div>{items}</div>;
        })()}

        {/* <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="complex" src={getData.recipes[0].image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {getData.recipes[0].title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {getData.recipes[0].explanation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getData.recipes[0].author}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ cursor: "pointer" }} variant="body2">
                    Remove
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                  $19.00
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper> */}
      </>
    );
  } else {
    return <></>;
  }
};
