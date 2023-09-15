import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";

function MarketUpdate() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiLoad, setApiLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [favoriteCoins, setFavoriteCoins] = useState([]); // State for favorite coins

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${currentPage}&sparkline=false`;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setApiLoad(false);
    };
    fetchData();
  }, [url]);

  const paginationButtons = [];
  for (let i = 1; i <= 5; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={i === currentPage ? "activePagi" : ""}
      >
        {i}
      </button>
    );
  }

  const scrollMarket = () => {
    window.scrollTo({
      top: window.pageYOffset - 800,
      behavior: "smooth",
    });
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter coins based on the search query
  const filteredCoins = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle adding/removing coins from favorites
  const toggleFavorite = (coinId) => {
    if (favoriteCoins.includes(coinId)) {
      // Remove from favorites
      const updatedFavorites = favoriteCoins.filter((id) => id !== coinId);
      setFavoriteCoins(updatedFavorites);
    } else {
      // Add to favorites
      setFavoriteCoins([...favoriteCoins, coinId]);
    }
  };

  return (
    <>
      <section id="market" className="market-section">
        <div className="container">
          <div className="market-content">
            <h2>Market Update</h2>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
              />
              <i className="fas fa-search" style={{ color: "#d714d0" }}></i>
            </div>
            <div className="market-content__coin-list">
              <div className="market-content__coin-list__top">
                <p>Coin</p>
                <p>Price</p>
                <p>24h Change</p>
                <p>Market Cap</p>
                <p>Action</p> {/* Add a column for actions */}
              </div>
              <div className="market-content__coin-list__row">
                {apiLoad && <span className="loader"></span>}
                {filteredCoins.map((item) => (
                  <div key={item.id} className="coin-row">
                    <Link to={`/coin/${item.id}`}>
                      <span>
                        <img src={item.image} alt={item.name} /> {item.name}
                      </span>
                    </Link>
                    <p>{"$ " + item.current_price.toFixed(2)}</p>
                    <p
                      className={
                        "slider-coin__price " +
                        (item.price_change_percentage_24h >= 0
                          ? "green-text"
                          : "red-text")
                      }
                    >
                      {item.price_change_percentage_24h?.toFixed(2) + " %"}
                    </p>
                    <p>{"$ " + numberWithCommas(item.market_cap)}</p>
                    <button id="add_delete_btn"
                      onClick={() => toggleFavorite(item.id)} // Add/remove from favorites
                      className={
                        favoriteCoins.includes(item.id)
                          ? "favorite-button favorite"
                          : "favorite-button"
                      }
                    >
                      {favoriteCoins.includes(item.id) ? "Remove" : "Add"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div onClick={scrollMarket} className="market-content__coin-list__pagination">
              {paginationButtons}
            </div>
          </div>
        </div>
      </section>
      {/* Display favorite coins */}
      <section id="favorites" className="market-section">
        <div className="container">
          <div className="market-content">
            <h3>Favorite Coins</h3>
            <div className="market-content__coin-list">
              <div className="market-content__coin-list__top">
                <p>Coin</p>
                <p>Price</p>
                <p>24h Change</p>
                <p>Market Cap</p>
                <p>Action</p> {/* Add a column for actions */}
              </div>
              <div className="market-content__coin-list__row">
                {favoriteCoins.length === 0 ? (
                  <p>No favorite coins yet.</p>
                ) : (
                  favoriteCoins.map((coinId) => {
                    const favoriteCoin = data.find((coin) => coin.id === coinId);
                    return (
                      <div key={favoriteCoin.id} className="coin-row">
                        <Link to={`/coin/${favoriteCoin.id}`}>
                          <span>
                            <img src={favoriteCoin.image} alt={favoriteCoin.name} /> {favoriteCoin.name}
                          </span>
                        </Link>
                        <p>{"$ " + favoriteCoin.current_price.toFixed(2)}</p>
                        <p
                          className={
                            "slider-coin__price " +
                            (favoriteCoin.price_change_percentage_24h >= 0
                              ? "green-text"
                              : "red-text")
                          }
                        >
                          {favoriteCoin.price_change_percentage_24h?.toFixed(2) + " %"}
                        </p>
                        <p>{"$ " + numberWithCommas(favoriteCoin.market_cap)}</p>
                        <button id="add_delete_btn"
                          onClick={() => toggleFavorite(favoriteCoin.id)} // Remove from favorites
                          className="favorite-button remove"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MarketUpdate;
