import classes from "./cart.module.css";
import { useState, useEffect } from "react";
import { useCart } from "../context/cartcontext";
import { useNavigate } from "react-router-dom";
import NavArea from "../components/navAreaCart";
import CartCard from "../ui/cartCard";
import CartPayment from "../components/cartPayment";

function Cart() {
  const [booksInCart, setBooksInCart] = useState(false);
  const { decreaseCartCount, cartAddedBooks, setCartAddedBooks, setCartBooksWithPrice } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setBooksInCart(cartAddedBooks.length > 0);
  }, [cartAddedBooks]);

  const handleRemoveBook = (bookName) => {
    decreaseCartCount();
    setCartAddedBooks((prevBooks) => {
      return prevBooks.filter((book) => book.name !== bookName);
    });
    setCartBooksWithPrice((prevBooks) => {
      return prevBooks.filter((book) => book.name !== bookName);
    });
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className={classes.container}>
      <NavArea />
      {booksInCart ? (
        <div className={classes.cartContentArea}>
          <div className={classes.booksContainer}>
            {cartAddedBooks.map((book, index) => (
              <CartCard name={book.name} authorName={book.authorName} lendingPrice={book.lendingPrice} category={book.category} key={index} removeCurrentBook={() => handleRemoveBook(book.name)} />
            ))}
          </div>
          <CartPayment />
        </div>
      ) : (
        <div className={classes.emptyCartArea}>
          <img className={classes.emptyCartIcon} src="/emptycart.png" alt="Empty Cart" />
          <div className={classes.emptyCartText}>Your Cart is Empty!</div>
          <button className={classes.emptyCartButton} onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
