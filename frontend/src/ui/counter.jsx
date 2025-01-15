import classes from "./counter.module.css";
import { CiSquareMinus } from "react-icons/ci";
import { FaSquarePlus } from "react-icons/fa6";
import { useState } from "react";

function Counter({ startingCount, updateTotalCount, text }) {
  const [count, setCount] = useState(startingCount);

  const handleDecrease = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateTotalCount(newCount);
    }
  };

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateTotalCount(newCount);
  };

  return (
    <>
      <div className={classes.container}>
        <div>{text}</div>
        <CiSquareMinus className={classes.minus} onClick={handleDecrease} />
        <div>{count}</div>
        <FaSquarePlus className={classes.plus} onClick={handleIncrease} />
      </div>
    </>
  );
}

export default Counter;
