import { useEffect, useState } from "react";
import { useAuth } from "../context/logincontext";
import ConfirmBackDrop from "../ui/confirmBackdrop";
import classes from "./userProfile.module.css";

function UserProfile() {
  const patchUrl = "http://localhost:3000/user/patch";
  const { currentUser, setCurrentUser } = useAuth();
  const [userObj, setUserObj] = useState({});
  const [confirmWindow, setConfirmWindow] = useState(false);

  useEffect(() => {
    setUserObj(currentUser || {});
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserObj((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(userObj).some((key) => userObj[key] !== currentUser[key])) {
      const response = await fetch(patchUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userObj, email: currentUser.email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setCurrentUser(data.updatedUser);
      } else {
        alert(data.message);
      }
    } else {
      alert("No Changes to Update!");
    }
  };

  const closeBackdrop = () => {
    setConfirmWindow(false);
  };

  return (
    <>
      {confirmWindow && <ConfirmBackDrop closeBackdrop={closeBackdrop} />}
      <div className={classes.container}>
        <div className={classes.headingText}>Edit your profile</div>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.inputFields}>
            <div className={classes.inputField}>
              <div className={classes.inputLabel}>First Name: </div>
              <input type="text" name="firstName" value={userObj.firstName || ""} onChange={handleChange} required />
            </div>
            <div className={classes.inputField}>
              <div className={classes.inputLabel}>Last Name: </div>
              <input type="text" name="lastName" value={userObj.lastName || ""} onChange={handleChange} required />
            </div>
            <div className={classes.inputField}>
              <div className={classes.inputLabel}>Address: </div>
              <input type="text" name="address" value={userObj.address || ""} onChange={handleChange} required />
            </div>
            <div className={classes.inputField}>
              <div className={classes.inputLabel}>Phone Number: </div>
              <input type="text" name="phno" value={userObj.phno || ""} onChange={handleChange} required />
            </div>
          </div>
          <button className={classes.updateButton}>Update</button>
        </form>
        <button className={classes.deleteButton} onClick={() => setConfirmWindow(true)}>
          Delete Account
        </button>
      </div>
    </>
  );
}

export default UserProfile;
