import { Button } from "@mui/material";
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

  const resetCounter = () => {
    setCount(0);
  };

  return (
    <>
      <h1>Teste Firefox</h1>
      <h2>Count: {count}</h2>
      <Button variant="contained" color="primary" onClick={resetCounter}>
        Reset Counter
      </Button>
    </>
  );
};

export default hot(App);
