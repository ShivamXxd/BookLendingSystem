import classes from "./priceBox.module.css";
import { FaRupeeSign } from "react-icons/fa";

function PriceBox({ price }) {
  return (
    <>
      <div className={classes.container}>
        <FaRupeeSign className={classes.rupee} />
        <div className={classes.priceValue}>{Number(price).toFixed(2)}</div>
      </div>
    </>
  );
}

export default PriceBox;
