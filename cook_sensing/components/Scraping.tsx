//スクレイピングのテスト用

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Response {
  img_url: string;
  message: string;
  recipe_id: string;
  tsukurepo_id: string;
}

export const Scraping: React.FC = () => {
  const [data, setData] = useState<Response[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tsukurepo");
      console.log(response.data.scraping_result_by_user);
      setData(response.data.scraping_result_by_user);
    } catch (error) {
      console.error("APIリクエストエラー:", error);
    }
  };

  return (
    <div>
      <h1>UserIDから,作ったレシピ一覧を表示</h1>
      {data.map((item, index) => (
        <div>
          <h4>{index + 1}</h4>
          <img src={item.img_url} height="200px"></img>
          <h3> message={item.message}</h3>
          <h3>recipr_id={item.recipe_id}</h3>
          <h3>tsukurepo_id={item.tsukurepo_id}</h3>
          <div></div>
        </div>
      ))}
    </div>
  );
};

// export default Scraping;
