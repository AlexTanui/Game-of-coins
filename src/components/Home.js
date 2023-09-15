import NavBar from "./NavBar";
import Footer from "./Footer";
import Newsletter from "./Newsletter";
import CoinsHeader from "./CoinsHeader";
import MarketUpdate from "./MarketUpdate";
import Join from "./Join";
import WhyUs from "./WhyUs";

function Home () {
    return (
        <>
      <NavBar />
      <CoinsHeader />
      <MarketUpdate />
      <WhyUs />
      <Join />
      <Newsletter />
      <Footer />
    </>
    );
}

export default Home;