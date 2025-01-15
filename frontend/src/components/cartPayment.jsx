import { useEffect, useState } from "react";
import { useCart } from "../context/cartcontext";
import { useMode } from "../context/modecontext";
import PriceBox from "../ui/priceBox";
import classes from "./cartPayment.module.css";
import BackDrop from "../ui/backdrop";

function CartPayment() {
  const { cartCount, cartBooksWithPrice } = useCart();
  const [isDiscount, setIsDiscount] = useState(false);
  const { isDark } = useMode();
  const [backdropVisible, setBackDropVisible] = useState(false);

  const closeBackdrop = () => {
    setBackDropVisible(false);
  };
  const openBackDrop = () => {
    setBackDropVisible(true);
  };

  const finalPrice = cartBooksWithPrice.reduce((accumulatedPrice, currentBook) => {
    return accumulatedPrice + currentBook.currentTotalPrice;
  }, 0);

  const discount = finalPrice * 0.1;
  const ultimatePrice = finalPrice - discount;

  useEffect(() => {
    setIsDiscount(finalPrice >= 100);
  }, [finalPrice]);

  return (
    <>
      {backdropVisible && <BackDrop closeBackdrop={closeBackdrop} />}
      <div className={classes.container} style={isDark ? { boxShadow: "0 0 12px #282828" } : {}}>
        <div className={classes.priceDetails}>
          <div className={classes.priceDetailsHeading}>Price Details ({cartCount} items)</div>
          <div className={classes.totalPrice}>
            Total MRP <PriceBox price={finalPrice} />
          </div>
          <div className={classes.discountPrice}>
            Discount on MRP
            {isDiscount ? <PriceBox price={discount} /> : <div style={{ color: "#505050" }}>Not Eligible</div>}
          </div>
          <div className={classes.orderPrice}>
            Order Value
            <span className={classes.priceValue}>{isDiscount ? <PriceBox price={ultimatePrice} /> : <PriceBox price={finalPrice} />}</span>
          </div>
        </div>
        <div className={classes.otherCharges}>
          <div className={classes.otherChargesText}>Other Charges:</div>
          <div className={classes.shippingCharges}>
            Shipping Charges:{" "}
            <span className={classes.priceValue} style={{ color: "#00d100" }}>
              Free
            </span>
          </div>
        </div>
        <div className={classes.totalDiscountedPrice}>
          <div className={classes.totalDiscountedPriceText}>You Pay: {isDiscount ? <PriceBox price={ultimatePrice} /> : <PriceBox price={finalPrice} />}</div>
          <div className={classes.note}>Note: Order cannot be cancelled once packed</div>
        </div>
        <button className={classes.buyButton} onClick={openBackDrop}>
          Buy
        </button>
      </div>
    </>
  );
}

export default CartPayment;
