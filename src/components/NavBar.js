import { IconBrandTwitter } from "@tabler/icons-react";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  
  function Navbar() {
    const [sticky, setSticky] = useState(false);
  
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    const goTop = () => {
      window.scrollTo({
        top: (0, 0),
        behavior: "smooth",
      });
    };

    return (
      <>
        <nav className={sticky ? "sticky-nav" : ""}>
          <div className="navbar">
            <Link to="/">
              <p onClick={goTop}>Game of Coins</p>
            </Link>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#market">Market</a>
              </li>
              <li>
                <a href="#choose-us">Choose Us</a>
              </li>
              <li>
                <a href="#join">Join</a>
              </li>
            </ul>
            <span>
            <IconBrandTwitter />
          </span>
          </div>
        </nav>
      </>
    );
  }
  
  export default Navbar;