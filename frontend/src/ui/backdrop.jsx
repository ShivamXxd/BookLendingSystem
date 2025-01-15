import classes from "./backdrop.module.css";
import { useAuth } from "../context/logincontext";
import { useNavigate } from "react-router-dom";
import { BsExclamationTriangle } from "react-icons/bs";

function BackDrop({ closeBackdrop }) {
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleOutsideClick = () => {
    closeBackdrop();
  };

  const handleInsideClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className={classes.shadowBack} onClick={handleOutsideClick}></div>
      <div className={classes.window} onClick={handleInsideClick}>
        {isLoggedIn ? (
          <div className={classes.successWindow}>
            <div className={classes.windowMessage}>Your books have been delivered to {currentUser.address}.</div>
            <div className={classes.windowMessage}>Our delivery agent will contact you on {currentUser.phno}.</div>
            <button className={classes.okButton} onClick={closeBackdrop}>
              Ok
            </button>
          </div>
        ) : (
          <div className={classes.loginFirstWindow}>
            <div className={classes.windowMessage}>
              <BsExclamationTriangle className={classes.exclamation} /> You need to login in order to complete your purchase! <BsExclamationTriangle className={classes.exclamation} />
            </div>
            <button className={classes.backToLogin} onClick={handleLogin}>
              Login
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default BackDrop;
