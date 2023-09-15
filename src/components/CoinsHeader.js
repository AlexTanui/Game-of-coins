import { useEffect, useState } from "react";
import Btc from "../images/CoinsHeader/bitcoin.png";
import Eth from "../images/CoinsHeader/ethereum.png";
import { Link } from "react-router-dom";

function CoinsHeader () {
    const [data, setData] = useState([]);
    const [coinsLoad, setCoinsLoad] = useState(true);

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false
  `;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error!");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <>
      <section id="home" className="CoinsHeader-section">
        <div className="container">
          <div className="CoinsHeader-content">
            <div className="CoinsHeader-content__text">
              <img className="btc-float" src={Btc} alt="floating-el" />
              <h1>
                Track and Trade
                <br /> <span>Crypto currencies</span>
              </h1>
              <img className="eth-float" src={Eth} alt="floating-el" />
            </div>

            <div onLoad={() => setCoinsLoad(false)} className="coin-slider">
              {coinsLoad && <span className="loader"></span>}
              {data.map((item) => (
                <Link
                  to={`/coin/${item.id}`}
                  key={item.id}
                  className="slider-coin"
                >
                  <img src={item?.image} alt={item?.name} />
                  <p className="slider-coin__name">
                    {item?.name}{" "}
                    <span
                      className={
                        "slider-coin__price " +
                        (item.price_change_percentage_24h <= 0
                          ? "red-text"
                          : "green-text")
                      }
                    >
                      {item?.price_change_percentage_24h?.toFixed(2) + "%"}
                    </span>
                  </p>
                  <p className="slider-coin__price">
                    {"$ " + numberWithCommas(item.current_price?.toFixed(2))}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CoinsHeader;