import classes from "./common.module.css";
function Horror({ name }) {
  return (
    <>
      <div className={classes.book}>
        <div className={classes.bookCover}>
          <div className={classes.bookFront} style={{ background: "radial-gradient(circle, rgba(83, 83, 83, 0.63), rgba(0, 0, 0, 0.8))" }}>
            <div className={classes.iconTop}>
              <img className={classes.img} src="/bookimages/horror.png" />
            </div>
            <div className={classes.bookName}>{name}</div>
            <div className={classes.iconBottom}>
              <img className={classes.img} src="/bookimages/horror2.png" />
            </div>
          </div>
          <div className={classes.bookSide}></div>
        </div>
      </div>
    </>
  );
}

export default Horror;
