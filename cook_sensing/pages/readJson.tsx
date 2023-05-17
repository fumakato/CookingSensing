// jsonを読み込む方法
import React from "react";
import { isJSDocUnknownTag } from "typescript";
import Code from "../jsonData/cookData.json";

export const ReadJson: React.FC = () => {
  /** jsonデータ編集 */
  const averagePace = [];
  const date = [];
  for (var cdNo in Code) {
    const cdStr1 = Code[cdNo]["averagePace"];
    averagePace.push(cdStr1);
    const cdStr2 = Code[cdNo]["date"];
    date.push(cdStr2);
  }

  /** レンダー部分 */
  return (
    <>
      {averagePace} + {date}
    </>
  );
};

export default ReadJson;
