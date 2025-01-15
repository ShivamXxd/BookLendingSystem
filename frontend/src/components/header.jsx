import { useEffect, useState } from "react";
import { FaMoon, FaSearch, FaSun, FaUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useBooks } from "../context/bookcontext";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/logincontext";
import { useMode } from "../context/modecontext";
import classes from "./header.module.css";

function Header() {
  const { cartCount } = useCart();
  const { isDark, switchModes } = useMode();
  const { books, setFoundBook } = useBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, setIsLoggedIn, currentUser } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      switchModes();
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const formattedQuery = searchQuery.toLowerCase().trim();
      books.forEach((book) => {
        if (formattedQuery == book.name.toLowerCase()) {
          setFoundBook(book);
        }
      });
      setSearchQuery("");
    } else return;
  };

  const handleLoginChange = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      <header className={classes.header}>
        <Link to="/" className={classes.logoContainer}>
          <img src="/logo.png" alt="Logo" className={classes.logo} />
        </Link>

        <div className={classes.welcomeUserBox}>
          {currentUser && (
            <>
              <div className={classes.welcomeText}>Welcome, </div>
              <div className={classes.currentUserName}>{currentUser.firstName.charAt(0).toUpperCase() + currentUser.firstName.slice(1).toLowerCase()}</div>
            </>
          )}
        </div>

        <div className={classes.searchContainer}>
          <input type="text" placeholder="Search for Your Favourite Books" className={classes.searchInput} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button className={classes.searchButton} onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

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
      </header>
    </>
  );
}

export default Header;
