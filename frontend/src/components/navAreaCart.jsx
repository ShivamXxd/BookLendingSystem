import classes from "./navAreaCart.module.css";
import { HiArrowLongLeft } from "react-icons/hi2";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useMode } from "../context/modecontext";
import { useNavigate } from "react-router-dom";

function NavAreaCart() {
  const { isDark } = useMode();

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className={classes.navArea}>
        <div className={classes.backToHome} onClick={navigateHome}>
          <HiArrowLongLeft className={classes.backArrow} style={isDark ? { color: "white" } : { color: "#191919" }} />
          <div className={classes.backToHomeText} style={isDark ? { color: "white" } : { color: "#707070" }}>
            Home
          </div>
        </div>
        <MdOutlineKeyboardArrowRight className={classes.sideArrow} style={isDark ? { color: "white" } : { color: "#191919" }} />
        <div className={classes.cartTopText} style={isDark ? { color: "white" } : { color: "#191919" }}>
          Shopping Cart
        </div>
      </div>
    </>
  );
}

export default NavAreaCart;
