import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";

const App = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>Teste Firefox</h1>
      <h2>Count: {count}</h2>
    </>
  );
};

export default hot(App);
