import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartcontext";
import { useMode } from "../context/modecontext";
import History from "./bookicons/history";
import Horror from "./bookicons/horror";
import Literature from "./bookicons/literature";
import Romance from "./bookicons/romance";
import Science from "./bookicons/science";
import classes from "./card.module.css";

function Card({ name, authorName, lendingPrice, category, top }) {
  const { increaseCartCount, cartAddedBooks, setCartAddedBooks } = useCart();
  const { isDark } = useMode();
  const navigate = useNavigate();

  const handleAddInCart = () => {
    const bookObj = {
      name,
      authorName,
      lendingPrice,
      category,
    };

    const existingBookIndex = cartAddedBooks.findIndex((book) => book.name === bookObj.name);
    if (existingBookIndex !== -1) {
      navigate("/cart");
      return;
    } else {
      setCartAddedBooks((prevBooks) => [...prevBooks, bookObj]);
    }
    increaseCartCount();
  };

  return (
    <div className={isDark ? classes.darkContainer : classes.lightContainer}>
      {top && <div className={classes.topStrip}>Top</div>}
      <div className={classes.bookIcon}>
        {category === "Horror" && <Horror name={name} />}
        {category === "History" && <History name={name} />}
        {category === "Literature" && <Literature name={name} />}
        {category === "Science" && <Science name={name} />}
        {category === "Romance" && <Romance name={name} />}
      </div>
      <div className={classes.authorName}>
        <b>By: </b>
        <i style={{ color: "#707070" }}>{authorName}</i>
      </div>
      <div className={classes.priceContainer}>
        <div className={classes.lendingPrice}>
          <FaRupeeSign style={{ fontSize: "0.9rem" }} />
          <div>{lendingPrice}</div>
        </div>
        <div className={classes.perDay}>/day</div>
      </div>
      <button onClick={handleAddInCart} className={classes.addToCartButton}>
        Add To Cart
      </button>
    </div>
  );
}

export default Card;
