//BarFromAPIを改造してより汎用性を高める

import axios from "axios";
import React from "react";

import { Paper } from "@mui/material";

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
  author: string;
  image: string;
}

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
    image: "本来はここにURLが入る",
  };
  const tmpdata2: Recipe = {
    title: "お前のラーメン",
    explanation: "道で拾いました",
    author: "切らず",
    image: "本来はここにURLが入る",
  };
  const tmpdata3: Recipe = {
    title: "トントンかつ",
    explanation: "fooooooo",
    author: "紫陽花",
    image: "本来はここにURLが入る",
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
            items.push(<p>{getData.recipes[i].title}</p>); //<li></li>
          }
          return <ul>{items}</ul>; //<ul></ul>
        })()}
      </>
    );
  } else {
    return <>nunu</>;
  }
};
