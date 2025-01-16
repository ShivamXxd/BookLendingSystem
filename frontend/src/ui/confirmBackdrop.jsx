import classes from "./confirmBackdrop.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/logincontext";

function ConfirmBackDrop({ closeBackdrop }) {
  const deleteUrl = "http://localhost:3000/user/delete";
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState("");
  const { setIsLoggedIn, currentUser } = useAuth();

  const handleOutsideClick = () => {
    closeBackdrop();
  };
  const handleInsideClick = (event) => {
    event.stopPropagation();
  };

  const handleDelete = async () => {
    if (confirmText === "CONFIRM") {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setIsLoggedIn(false);
        navigate("/");
      } else {
        alert(data.message);
      }
    } else return;
  };

  return (
    <>
      <div className={classes.shadowBack} onClick={handleOutsideClick}></div>
      <div className={classes.window} onClick={handleInsideClick}>
        {confirmText !== "CONFIRM" && confirmText !== "" && <div className={classes.wrongConfirm}> Wrong Input! </div>}
        <div className={classes.confirmText}>
          Please enter <b>"CONFIRM"</b> to delete your account permanently.
        </div>
        <input
          className={classes.confirmInput}
          type="text"
          value={confirmText}
          onChange={(e) => {
            setConfirmText(e.target.value);
          }}
        />
        <button className={classes.deleteButton} onClick={handleDelete}>
          Delete Permanently
        </button>
      </div>
    </>
  );
}

export default ConfirmBackDrop;
