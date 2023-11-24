//jsonを読み込んで折れ線グラフを表示

import React from "react";

import axios from "axios";

import { BarFromApi, RadeaChart } from "../../components";

const Graph: React.FC = () => {
  return (
    <>
      <BarFromApi user_id="1" />
      <RadeaChart />
    </>
  );
};

export default Graph;
