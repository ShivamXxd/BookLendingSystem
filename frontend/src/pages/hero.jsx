import { useEffect, useState } from "react";
import Filter from "../components/filter";
import { useBooks } from "../context/bookcontext";
import { useMode } from "../context/modecontext";
import Card from "../ui/card";
import classes from "./hero.module.css";

function Hero() {
  const BOOK_URL = "http://localhost:3000/books";
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [gotBook, setGotBook] = useState(null);
  const [randomBooks, setRandomBooks] = useState([]);
  const { books, setBooks, foundBook } = useBooks();
  const { isDark } = useMode();

  useEffect(() => {
    fetch(BOOK_URL)
      .then((rawData) => rawData.json())
      .then((response) => {
        setBooks(response);
      });
  }, [setBooks]);

  useEffect(() => {
    if (books.length > 0) {
      setRandomBooks(generateRandomBooks());
    }
  }, [books]);

  const handleFilterChange = (option) => {
    setSelectedFilter(option);
    setGotBook(null);
  };

  const showSelected = () => {
    let filteredBooks = [];
    if (selectedFilter !== "All") {
      filteredBooks = books.filter((book) => book.category === selectedFilter);
    } else {
      filteredBooks = books;
    }
    return filteredBooks;
  };

  const showSearchedBook = () => {
    setGotBook(foundBook);
  };

  const generateRandomBooks = () => {
    const shuffled = books.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }

    return shuffled;
  };

  useEffect(() => {
    showSearchedBook();
  }, [foundBook]);

  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <div className={`${selectedFilter ? classes.gridBooksContainer : classes.flexBooksContainer}`}>
        {gotBook ? (
          <>
            <div className={classes.searchedBook}>
              <Card name={gotBook.name} authorName={gotBook.authorName} lendingPrice={gotBook.lendingPrice} category={gotBook.category} />
            </div>
            <div className={`${isDark ? classes.lightSpaceFiller : classes.darkSpaceFiller}`}>Explore more books and keep learning!</div>
          </>
        ) : selectedFilter ? (
          <>
            <div className={classes.selectedFilterDisplay}>
              <div className={classes.selectedFilterText}>{selectedFilter}</div>
              <img className={`${selectedFilter === "History" ? classes.historyImg : selectedFilter === "Horror" ? classes.horrorImg : classes.selectedFilterImg}`} src={`/${selectedFilter}.png`} alt={selectedFilter} />
            </div>
            {showSelected().map((book, index) => (
              <Card name={book.name} authorName={book.authorName} lendingPrice={book.lendingPrice} category={book.category} key={index} />
            ))}
          </>
        ) : (
          <>
            <div className={classes.topPicks}>
              <div className={classes.topPicksText}>Top Selling Books</div>
              <div className={classes.topPicksContainer}>
                {randomBooks.slice(0, 5).map((book, index) => (
                  <Card name={book.name} authorName={book.authorName} lendingPrice={book.lendingPrice} category={book.category} key={index} top={true} />
                ))}
              </div>
            </div>
            <div className={classes.deals}>
              <div className={classes.dealsText}>Today's Hottest Deals</div>
              <div className={classes.dealsContainer}>
                {randomBooks.slice(6, 11).map((book, index) => (
                  <Card name={book.name} authorName={book.authorName} lendingPrice={book.lendingPrice} category={book.category} key={index} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Hero;
