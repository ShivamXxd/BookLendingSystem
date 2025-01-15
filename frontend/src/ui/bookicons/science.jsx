import classes from "./common.module.css";
function Horror({ name }) {
  return (
    <>
      <div className={classes.book}>
        <div className={classes.bookCover}>
          <div className={classes.bookFront} style={{ background: "linear-gradient(to bottom,rgb(58, 54, 1) 0%, #010a6a 20%, #17069a 40%, #1d17c4 60%, #010a6a 80%, #03013a 100%)" }}>
            <div className={classes.iconTop} style={{ top: "0", height: "inherit" }}>
              <img className={classes.img} src="/bookimages/science.png" />
            </div>
            <div className={classes.bookName} style={{ color: "#fff671" }}>
              {name}
            </div>
            <div className={classes.iconBottom} style={{ bottom: "10%", left: "55%" }}>
              <img className={classes.img} src="/bookimages/science2.png" />
            </div>
          </div>
          <div className={classes.bookSide}></div>
        </div>
      </div>
    </>
  );
}

export default Horror;
