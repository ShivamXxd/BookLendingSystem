import classes from "./common.module.css";
function Literature({ name }) {
  return (
    <>
      <div className={classes.book}>
        <div className={classes.bookCover}>
          <div className={classes.bookFront} style={{ background: "radial-gradient(circle, rgba(235, 218, 161, 0.8), rgba(192, 186, 107, 0.8))" }}>
            <div className={classes.iconTop} style={{ marginTop: "10px" }}>
              <img className={classes.img} src="/bookimages/literature.png" />
            </div>
            <div className={classes.bookName}>{name}</div>
            <div className={classes.iconBottom} style={{ marginTop: "80px" }}>
              <img className={classes.img} src="/bookimages/literature2.png" />
            </div>
          </div>
          <div className={classes.bookSide}></div>
        </div>
      </div>
    </>
  );
}

export default Literature;
