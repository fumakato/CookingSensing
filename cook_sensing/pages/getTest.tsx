import React from "react";
import axios from "axios";
import { Param } from "../types";
import sha512 from "js-sha512";
import
const App: React.FC = () => {
  const [baseurl, setBaseUrl] = React.useState("http://localhost:3000");
  const [userid, setUserid] = React.useState("1");
  const [message1, setMessage1] = React.useState("messag1はここに表示される");
  const [message2, setMessage2] = React.useState("messag2はここに表示される");
  const [word, setWord] = React.useState("");
  const [userid2, setUserid2] = React.useState("");

  return (
    <div>
      <p>{message1}</p>
      <p>
        userID 1:
        <input
          type="text"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />
      </p>
      <button
        // variant="contained"
        onClick={async () => {
          const url = `${baseurl}/users/${userid}`;
          axios
            .get(url)
            .then((response) => {
              // リクエスト成功時の処理
              console.log(response);
              setMessage1(
                response.data.id + response.data.name + response.data.pass
              );
            })
            .catch((error) => {
              // リクエスト失敗時の処理
              console.error(error.message);
              setMessage1(error.message);
            });
        }}
      >
        getを送る
      </button>
      <hr></hr>
      <p>{message2}</p>
      <p>
        word:
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
      </p>
      <p>hash : 『{sha512(word)}』</p>
      <p>
        userID 2:
        <input
          type="text"
          value={userid2}
          onChange={(e) => setUserid2(e.target.value)}
        />
      </p>
      <button
        // variant="contained"
        onClick={async () => {
          const param: Param = {
            userid: userid2,
            word: word,
          };
          console.log("下確認用");
          console.log(param);

          //   const url = `${baseurl}/certification/${param}`;
          const url = `${baseurl}/certification`;

          axios
            .post(url, param) // .get(url)
            .then((response) => {
              // リクエスト成功時の処理
              console.log(response);
              setMessage2(response.data);
            })
            .catch((error) => {
              // リクエスト失敗時の処理
              console.error(error.message);
              setMessage2(error.message);
            });
        }}
      >
        postを送る
      </button>
    </div>
  );
};

export default App;
