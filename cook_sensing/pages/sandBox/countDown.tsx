import React, { useState, useEffect } from "react";

const Countdown = () => {
  const [count, setCount] = useState(300); // カウントダウン初期値（秒数）

  const startCountdown = () => {
    // ボタンを押したらカウントダウン開始
    setCount(300);
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    // カウントダウン終了後にタイマーをクリアする
    setTimeout(() => {
      clearInterval(interval);
    }, count * 1000);
  };

  return (
    <div>
      <h1>{count} seconds</h1>
      <button onClick={startCountdown}>Start Countdown</button>
    </div>
  );
};

export default Countdown;
