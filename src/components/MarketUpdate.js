import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";


function MarketUpdate() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiLoad, setApiLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

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
              </div>
              <div className="market-content__coin-list__row">
                {apiLoad && <span className="loader"></span>}
                {filteredCoins.map((item) => (
                  <Link
                    onClick={scrollTop}
                    to={`/coin/${item.id}`}
                    className="coin-row"
                    key={item.id}
                  >
                    <span>
                      <img src={item.image} alt={item.name} /> {item.name}
                    </span>
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
                  </Link>
                ))}
              </div>
            </div>
            <div onClick={scrollMarket} className="market-content__coin-list__pagination">
              {paginationButtons}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MarketUpdate;
