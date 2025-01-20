import { useEffect, useState } from "react";
import { FaMoon, FaSearch, FaSun, FaUser, FaUserCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useBooks } from "../context/bookcontext";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/logincontext";
import { useMode } from "../context/modecontext";
import classes from "./header.module.css";
import { jwtDecode } from "jwt-decode";

function Header() {
  const { cartCount } = useCart();
  const { isDark, switchModes } = useMode();
  const { books, setFoundBook } = useBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } = useAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showRemainingHeader, setShowRemainingHeader] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authtoken");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      switchModes();
    }
  }, []);

  const toggleRemainingHeader = () => {
    setShowRemainingHeader((prev) => !prev);
  };

  const handleSearch = () => {
    if (searchQuery) {
      const formattedQuery = searchQuery.toLowerCase().trim();
      books.forEach((book) => {
        if (formattedQuery == book.name.toLowerCase()) {
          setFoundBook(book);
        }
      });
      setSearchQuery("");
      navigate("/");
    }
  };

  const handleLoginChange = () => {
    if (isLoggedIn) {
      localStorage.removeItem("authtoken");
    }
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let username = "";
  if (isLoggedIn && currentUser) {
    username = currentUser.firstName.charAt(0).toUpperCase() + currentUser.firstName.slice(1).toLowerCase();
  }
  return (
    <>
      <header className={classes.header}>
        <Link to="/" className={classes.logoContainer}>
          <img src="/logo.png" alt="Logo" className={classes.logo} />
        </Link>

        {windowWidth > 1170 && isLoggedIn && (
          <>
            <div className={classes.welcomeUserBox}>
              <div className={classes.welcomeText}>Welcome, </div>
              <div className={classes.currentUserName}>{username}</div>
            </div>
          </>
        )}

        <div className={classes.searchContainer}>
          <input type="text" placeholder="Search for Your Favourite Books" className={classes.searchInput} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button className={classes.searchButton} onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        {windowWidth > 1040 ? (
          <>
            <div className={classes.modeContainer}>
              <button className={`${classes.themeToggle} ${isDark ? classes.dark : classes.light}`} onClick={switchModes}>
                {isDark ? <FaMoon /> : <FaSun />}
                <span className={classes.srOnly}>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
              </button>
            </div>

            <div className={classes.cartContainer}>
              <Link className={classes.cartButton} to="/cart">
                <MdOutlineShoppingCart />
                {cartCount > 0 && <div className={classes.cartCounter}>{cartCount}</div>}
              </Link>
            </div>

            <div className={classes.signInContainer} onClick={handleLoginChange}>
              <Link to="/login" className={classes.signInButton}>
                <FaUser /> {isLoggedIn ? <div>Log Out</div> : <div>Sign In</div>}
              </Link>
            </div>
            {isLoggedIn && (
              <Link to="/userprofile">
                <div className={classes.userProfileContainer}>
                  <FaUserCircle className={classes.profileIcon} />
                </div>
              </Link>
            )}
          </>
        ) : (
          <>
            {!showRemainingHeader ? <GiHamburgerMenu className={classes.hamburger} onClick={toggleRemainingHeader} /> : <RxCross1 className={classes.cross} onClick={toggleRemainingHeader} />}
            {showRemainingHeader && (
              <div className={classes.remainingHeader}>
                <div className={classes.RHCart} onClick={() => navigate("/cart")}>
                  <MdOutlineShoppingCart /> Cart
                </div>

                {isLoggedIn && (
                  <div className={classes.RHUserProfile} onClick={() => navigate("/userprofile")}>
                    <FaUser /> {username}
                  </div>
                )}
                <div className={classes.RHModes}>
                  <button className={`${classes.themeToggle} ${classes.RHThemeToggle} ${isDark ? classes.dark : classes.light}`} onClick={switchModes}>
                    {isDark ? <FaMoon /> : <FaSun />}
                    <span className={classes.srOnly}>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
                  </button>
                  <div>{isDark ? "Dark Mode" : "Light Mode"}</div>
                </div>
                <div className={classes.RHLoginButton} onClick={handleLoginChange}>
                  {isLoggedIn ? "Log Out" : "Sign In"}
                </div>
              </div>
            )}
          </>
        )}
      </header>
    </>
  );
}

export default Header;
