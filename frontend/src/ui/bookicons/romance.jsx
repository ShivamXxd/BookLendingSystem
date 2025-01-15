import classes from "./common.module.css";
function Romance({ name }) {
  return (
    <>
      <div className={classes.book}>
        <div className={classes.bookCover}>
          <div className={classes.bookFront} style={{ background: "linear-gradient(to bottom, #6e4a6d 0%, #cf706b 20%, #f4a676 40%, #f8d97c 60%, #c0735a 80%, #422a2d 100%)" }}>
            <div className={classes.bookName}>{name}</div>
            <div>
              <img src="/bookimages/romance.png" className={classes.character} alt="Character Overlay" />
            </div>
          </div>
          <div className={classes.bookSide}></div>
        </div>
      </div>
    </>
  );
}

export default Romance;
