import axios, { AxiosError } from "axios";
import React from "react";

// //コンポーネントの呼び出し元から送られてくる型
// interface HistogramApiArg {
//   user_id?: string;
//   type: string;
//   size?: number;
//   fontsize?: number;
// }

// //apiを呼び出して返ってくる値の型
// interface HistogramGet {
//   datas: number[];
//   titles: title;
//   grade: number; //ユーザのグレード
// }
// //上のtitlesの中身
// interface title {
//   maintitle: string;
//   mainlabel: string;
//   besidetitle: string;
//   verticaltitle: string;
//   besidelabel: string[];
// }

interface User {
  user_id: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  image: string;
  histogram_id: string;
  radar_id: string;
  line_id: string;
}
interface Users {
  user: User[];
}

const apitest: React.FC = () => {
  //   const setting: string[] = [];
  //   const [apiData, setApiData] = React.useState(setting);
  //   const [user_id_url, setUser_id_url] = React.useState(user_id);
  const [getData, setGetData] = React.useState<Users>(); //ここにGetのデータを入れていく
  const [postData, setPostData] = React.useState<User>(); //ここにGetのデータを入れていく

  //   const api = axios.create({
  //     baseURL: "http://localhost:3000/", //http://20.168.98.13:8080/
  //     timeout: 100000,
  //   });
  //url設定
  const id = "54208270";
  const url = `http://localhost:3000/users/${id}`;
  const postUrl = "http://localhost:3000/users";
  const user = {
    user_id: "1235",
    name: "testtaro",
    image: "gazo-",
    histogram_id: "6",
    radar_id: "6",
    line_id: "6",
  };
  //   const users = { user: user };
  //   setPostData(newUser);
  const fetch = React.useMemo(async () => {
    //apiで接続
    // const data = await axios.get<HistogramGet>(url);
    const { data } = await axios.get<Users>(url);
    //上記{data}はdataという値から取ってきているため、他の名前で宣言できないっぽい
    console.log("de-ta->" + data);
    setGetData(data);

    //     axios
    //       .post(postUrl, user) // .get(url)
    //       .then((response) => {
    //         // リクエスト成功時の処理
    //         console.log(response);
    //         //   setMessage2(response.data);
    //       })
    //       .catch((error) => {
    //         // リクエスト失敗時の処理
    //         console.error(error.message);
    //         //   setMessage2(error.message);
    //       });
  }, []);

  React.useEffect(() => {
    fetch;
  }, []);

  return (
    <>
      {getData ? (
        <>
          <p>a</p>
        </>
      ) : (
        <></>
      )}
      <button
        onClick={async () => {
          try {
            setPostData(user);
            //const url = "https://xclothes.harutiro.net/coordinates";

            const response = await axios.post(postUrl, postData);
            console.log("レスポンス");
            console.log(response);

            // setOpen(true);
            // setSeverity("success");
            // setMessage("登録しました");
          } catch (e) {
            console.error(e);
            // setOpen(true);
            // setSeverity("error");
            // setMessage("登録に失敗しました");
          }
        }}
      >
        登録
      </button>
    </>
  );
};
export default apitest;

// import React, { useState } from "react";
// import axios, { AxiosError } from "axios";

// interface CsvData {
//   user_id: number;
//   recipe_id: number;
//   csv_file: FormData;
// }

// const Graph: React.FC = () => {
//   const [file, setFile] = React.useState<File | null>(null);

//   const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files[0]) {
//       setFile(files[0]);
//     }
//   };

//   const apiUrl = "http://localhost:3000/users";

//   const onClickSubmit = async () => {
//     if (!file) {
//       return;
//     }
//     const formData = new FormData();
//     formData.append("file", file);
//     console.log(formData);

//     const postData: CsvData = {
//       user_id: 123456789,
//       recipe_id: 987654321,
//       csv_file: formData,
//     };

//     await axios
//       .post(`${apiUrl}/uploads`, postData)
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((e: AxiosError) => {
//         console.error(e);
//       });
//   };

//   return (
//     <>
//       <div className="App">
//         <div className="App-form">
//           <input
//             name="file"
//             type="file"
//             accept="*.scv"
//             onChange={onChangeFile}
//           />
//           <input
//             type="button"
//             disabled={!file}
//             value="送信"
//             onClick={onClickSubmit}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Graph;
