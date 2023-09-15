import React from "react";
import "../styles/app.css";
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes from react-router-dom
import Home from "./Home";
import NavBar from "./NavBar";
import CoinsHeader from "./CoinsHeader";

function App() {
  return (
      <Routes>
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/" element={<Home />} />
        <Route path="/CoinsHeader" element={<CoinsHeader />}>
          <Route path=":coinId" element={<CoinsHeader />} />
        </Route>
      </Routes>
  );
}

export default App;
