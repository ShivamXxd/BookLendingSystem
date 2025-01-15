import classes from "./common.module.css";
function History({ name }) {
  return (
    <>
      <div className={classes.book}>
        <div className={classes.bookCover}>
          <div className={classes.bookFront} style={{ background: "linear-gradient(to bottom, #f0d340, #ead9a1)" }}>
            <div className={classes.bookName} style={{ color: "#fff", WebkitTextStroke: "0.8px", WebkitTextStrokeColor: "#000", fontWeight: "bolder", fontSize: "1.1rem", top: "30%" }}>
              {name}
            </div>
            <div>
              <img src="/bookimages/history.png" className={classes.character} alt="Character Overlay" />
            </div>
          </div>
          <div className={classes.bookSide}></div>
        </div>
      </div>
    </>
  );
}

export default History;
