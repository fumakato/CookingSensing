import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface TsukurepoReturn {
  date: string;
  message: string;
  tsukurepo_id: string;
  tsukurepo_image: string;
  recipe_image: string;
  recipe_title: string;
}

const Component = () => {
  const paperData = ["apple", "banana", "ichigo"];

  const a: TsukurepoReturn = {
    date: "2022/02/13",
    message: "作りました！",
    tsukurepo_id: "1234",
    tsukurepo_image:
      "https://assets.cpcdn.com/assets/blank_image_square.svg?3354e08af45d89c518694327e35cc46ca067a3b709f79ce90f1514d73655fec1",
    recipe_image:
      "https://img.cpcdn.com/tsukurepos/29605754/400x533c/eb2e98762d29be13878f0e719c88d928?u=54208270&p=1695797169",
    recipe_title: "チーズちくわ",
  };
  const b: TsukurepoReturn = {
    date: "2065/03/30",
    message: "美味しい",
    tsukurepo_id: "56d8",
    tsukurepo_image:
      "https://assets.cpcdn.com/assets/blank_image_square.svg?3354e08af45d89c518694327e35cc46ca067a3b709f79ce90f1514d73655fec1",
    recipe_image:
      "https://img.cpcdn.com/tsukurepos/29605742/400x533c/6a5c498c8f3ab9a6c863ea477e8f1ef0?u=54208270&p=1695796736",
    recipe_title: "アイス入りワイン",
  };
  const c: TsukurepoReturn = {
    date: "1098/90/27",
    message: "好みではないかも・・・",
    tsukurepo_id: "1356",
    tsukurepo_image:
      "https://assets.cpcdn.com/assets/blank_image_square.svg?3354e08af45d89c518694327e35cc46ca067a3b709f79ce90f1514d73655fec1",
    recipe_image:
      "https://img.cpcdn.com/tsukurepos/29605754/400x533c/eb2e98762d29be13878f0e719c88d928?u=54208270&p=1695797169",
    recipe_title: "チーズちくわ",
  };
  const d: TsukurepoReturn = {
    date: "2065/03/30",
    message: "美味しい",
    tsukurepo_id: "518",
    tsukurepo_image:
      "https://assets.cpcdn.com/assets/blank_image_square.svg?3354e08af45d89c518694327e35cc46ca067a3b709f79ce90f1514d73655fec1",
    recipe_image:
      "https://img.cpcdn.com/tsukurepos/29605742/400x533c/6a5c498c8f3ab9a6c863ea477e8f1ef0?u=54208270&p=1695796736",
    recipe_title: "アイス入りワイン",
  };

  const e: TsukurepoReturn = {
    date: "2065/03/30",
    message: "美味しい",
    tsukurepo_id: "567v8",
    tsukurepo_image:
      "https://assets.cpcdn.com/assets/blank_image_square.svg?3354e08af45d89c518694327e35cc46ca067a3b709f79ce90f1514d73655fec1",
    recipe_image:
      "https://img.cpcdn.com/tsukurepos/29605742/400x533c/6a5c498c8f3ab9a6c863ea477e8f1ef0?u=54208270&p=1695796736",
    recipe_title: "アイス入りワイン",
  };
  const f: TsukurepoReturn = {
    date: "2065/03/30",
    message: "美味しい",
    tsukurepo_id: "56s78",
    tsukurepo_image:
      "https://assets.cpcdn.com/assets/blank_image_square.svg?3354e08af45d89c518694327e35cc46ca067a3b709f79ce90f1514d73655fec1",
    recipe_image:
      "https://img.cpcdn.com/tsukurepos/29605742/400x533c/6a5c498c8f3ab9a6c863ea477e8f1ef0?u=54208270&p=1695796736",
    recipe_title: "アイス入りワイン",
  };
  const g: TsukurepoReturn = {
    date: "2065/03/30",
    message: "美味しい",
    tsukurepo_id: "e5678",
    tsukurepo_image:
      "https://assets.cpcdn.com/assets/blank_image_square.svg?3354e08af45d89c518694327e35cc46ca067a3b709f79ce90f1514d73655fec1",
    recipe_image:
      "https://img.cpcdn.com/tsukurepos/29605742/400x533c/6a5c498c8f3ab9a6c863ea477e8f1ef0?u=54208270&p=1695796736",
    recipe_title: "アイス入りワイン",
  };

  const h: TsukurepoReturn = {
    date: "2065/03/30",
    message: "美味しい",
    tsukurepo_id: "56w78",
    tsukurepo_image:
      "https://assets.cpcdn.com/assets/blank_image_square.svg?3354e08af45d89c518694327e35cc46ca067a3b709f79ce90f1514d73655fec1",
    recipe_image:
      "https://img.cpcdn.com/tsukurepos/29605742/400x533c/6a5c498c8f3ab9a6c863ea477e8f1ef0?u=54208270&p=1695796736",
    recipe_title: "アイス入りワイン",
  };
  const i: TsukurepoReturn = {
    date: "2065/03/30",
    message: "美味しい",
    tsukurepo_id: "5678l",
    tsukurepo_image:
      "https://assets.cpcdn.com/assets/blank_image_square.svg?3354e08af45d89c518694327e35cc46ca067a3b709f79ce90f1514d73655fec1",
    recipe_image:
      "https://img.cpcdn.com/tsukurepos/29605742/400x533c/6a5c498c8f3ab9a6c863ea477e8f1ef0?u=54208270&p=1695796736",
    recipe_title: "アイス入りワイン",
  };
  const j: TsukurepoReturn = {
    date: "2065/03/30",
    message: "美味しい",
    tsukurepo_id: "567m8",
    tsukurepo_image:
      "https://assets.cpcdn.com/assets/blank_image_square.svg?3354e08af45d89c518694327e35cc46ca067a3b709f79ce90f1514d73655fec1",
    recipe_image:
      "https://img.cpcdn.com/tsukurepos/29605742/400x533c/6a5c498c8f3ab9a6c863ea477e8f1ef0?u=54208270&p=1695796736",
    recipe_title: "アイス入りワイン",
  };
  const k: TsukurepoReturn = {
    date: "2065/03/30",
    message: "美味しい",
    tsukurepo_id: "56o78",
    tsukurepo_image:
      "https://assets.cpcdn.com/assets/blank_image_square.svg?3354e08af45d89c518694327e35cc46ca067a3b709f79ce90f1514d73655fec1",
    recipe_image:
      "https://img.cpcdn.com/tsukurepos/29605742/400x533c/6a5c498c8f3ab9a6c863ea477e8f1ef0?u=54208270&p=1695796736",
    recipe_title: "アイス入りワイン",
  };
  const l: TsukurepoReturn = {
    date: "2065/03/30",
    message: "美味しい",
    tsukurepo_id: "5678wdv",
    tsukurepo_image:
      "https://assets.cpcdn.com/assets/blank_image_square.svg?3354e08af45d89c518694327e35cc46ca067a3b709f79ce90f1514d73655fec1",
    recipe_image:
      "https://img.cpcdn.com/tsukurepos/29605742/400x533c/6a5c498c8f3ab9a6c863ea477e8f1ef0?u=54208270&p=1695796736",
    recipe_title: "アイス入りワイン",
  };

  const tsukurepo = [a, b, c, d, e, f, g, h, i, j, k, l];

  const [selectedValue, setSelectedValue] = React.useState("");

  const handlePaperClick = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <>
      <p>{selectedValue}</p>

      <Grid container spacing={0}>
        {tsukurepo.map((item, index) => (
          <>
            <Grid item xs={6}>
              <Paper
                key={index}
                elevation={3}
                style={{
                  // aline: "center",
                  width: "90%",
                  padding: "2%",
                  margin: "auto",
                  marginBottom: "3%",
                  cursor: "pointer",
                  backgroundColor:
                    selectedValue === item.tsukurepo_id ? "#e0e0e0" : "#ffffff",
                }}
                onClick={() => handlePaperClick(item.tsukurepo_id)}
              >
                <Grid container spacing={5}>
                  <Grid item xs={3}>
                    <img
                      src={item.recipe_image}
                      // height="100%"
                      width="100%"
                    ></img>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="caption" display="block" gutterBottom>
                      {item.date} 投稿
                    </Typography>
                    <Typography variant="caption" display="block">
                      レシピ名
                    </Typography>
                    <Typography variant="h6" display="block" gutterBottom>
                      {item.recipe_title}
                    </Typography>
                    <Typography variant="caption" display="block">
                      あなたのコメント
                    </Typography>
                    <Typography variant="body1" display="block" gutterBottom>
                      {item.message}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default Component;

// Material-UIのTypographyコンポーネント（一部
// variant: テキストのバリエーションを指定します。例えば、"h1"や"body1"などがあります。
// color: テキストの色を指定します。
// align: テキストの水平方向の配置を指定します。
// display: テキストをブロック要素として扱うか、インライン要素として扱うかを指定します。
// gutterBottom: 下側にマージンを追加します。
// noWrap: テキストの折り返しを制御します。
// paragraph: テキストを段落として表示するかどうかを指定します。

// Typography:displayプロパティにはさまざまな値を指定することができ、要素の表示方法を制御するために使用されます。以下に一部を示します。
// block: ブロックレベル要素として表示されます。新しい行で表示され、横幅は親要素の幅いっぱいを占有します。
// inline: インライン要素として表示されます。要素は同じ行内に表示され、横幅は要素の内容に合わせられます。
// inline-block: インラインブロック要素として表示されます。インライン要素のように行内に表示されますが、ブロック要素のように高さと幅を持ちます。
// none: 要素を非表示にします。文書のレイアウトから要素が取り除かれます。
// flex: 要素をフレックスコンテナーとして表示します。子要素をフレックスアイテムとして配置することができるようになります。
// grid: 要素をグリッドコンテナーとして表示します。子要素をグリッドアイテムとして配置することができるようになります。
