//jsonを読み込んで折れ線グラフを表示

import React from "react";

import axios from "axios";

import { BarFromApi } from "../components";

const Graph: React.FC = () => {
  return (
    <>
      <BarFromApi user_id="1" />
    </>
  );
};

export default Graph;
