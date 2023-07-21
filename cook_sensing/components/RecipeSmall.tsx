//https://mui.com/material-ui/react-grid/
//上記URLにグリッドの使い方載ってる

import axios from "axios";
import React from "react";
import * as CSS from "csstype";

import {
  Paper,
  Grid,
  styled,
  Typography,
  ButtonBase,
  Box,
} from "@mui/material";

//コンポーネントの呼び出し元から送られてくる型
interface Recipe {
  title: string;
  explanation: string;
  material: string;
  author: string;
  image: string;
  recipe_id?: string;
}

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const recipeListButton: CSS.Properties = {
  color: "#686652",
  textAlign: "center",
  // display: "table-cell",
  // verticalAlign: "middle",
};

export const RecipeSmall = ({
  title,
  explanation,
  material,
  author,
  image,
  recipe_id = "000", //値がなかった場合に入る
}: Recipe) => {
  //   const [getData, setGetData] = React.useState<Recipe>(); //ここにGetのデータを入れていく

  return (
    <>
      <Paper
        sx={{
          p: 2,
          // m: 1,
          // margin: "auto",
          m: "10px auto",
          maxWidth: "95%",
          flexGrow: 1,

          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={1}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs wrap="nowrap">
                <Typography gutterBottom variant="subtitle1" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {explanation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {material}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  // sx={{ cursor: "pointer" }}
                  variant="body2"
                >
                  by. {author}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
