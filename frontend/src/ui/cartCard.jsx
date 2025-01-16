import { useState, useEffect } from "react";
import { useCart } from "../context/cartcontext";
import { useMode } from "../context/modecontext";
import History from "./bookicons/history";
import Horror from "./bookicons/horror";
import Literature from "./bookicons/literature";
import Romance from "./bookicons/romance";
import Science from "./bookicons/science";
import classes from "./cartCard.module.css";
import Counter from "./counter";

function CartCard({ name, authorName, lendingPrice, category, removeCurrentBook }) {
  const [totalPrice, setTotalPrice] = useState(lendingPrice);
  const { isDark } = useMode();
  const { setCartBooksWithPrice } = useCart();

  const updateTotalCount = (newCount) => {
    setTotalPrice(lendingPrice * newCount);
  };

  useEffect(() => {
    setCartBooksWithPrice((prevBooks) => {
      const updatedBooks = prevBooks.filter((book) => book.name !== name);
      return [...updatedBooks, { name, authorName, lendingPrice, category, currentTotalPrice: totalPrice }];
    });
  }, [totalPrice, name, authorName, lendingPrice, category]);

  return (
    <div className={classes.container} style={isDark ? { backgroundColor: "#ccc", boxShadow: "0 0 12px #282828" } : { backgroundColor: "white" }}>
      <div className={classes.bookIcon}>
        {category === "Horror" && <Horror name={name} />}
        {category === "History" && <History name={name} />}
        {category === "Literature" && <Literature name={name} />}
        {category === "Science" && <Science name={name} />}
        {category === "Romance" && <Romance name={name} />}
      </div>
      <div className={classes.bookDetails}>
        <div className={classes.bookName}>{name}</div>
        <div>
          Written By: <span className={classes.authorName}>{authorName}</span>
        </div>
        <div className={classes.lendingPrice}>
          Total Price: Rs. <b>{Number(totalPrice).toFixed(2)}</b>
        </div>
        <Counter startingCount={1} updateTotalCount={updateTotalCount} text={"Lending Time (In Days): "} />
        <div className={classes.shippingCharges}>
          Shipping Charges: <span style={{ color: "#00d100" }}>FREE</span>
        </div>
      </div>
      <button className={classes.removeButton} onClick={removeCurrentBook}>
        Remove
      </button>
    </div>
  );
}

export default CartCard;
