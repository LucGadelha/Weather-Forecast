import React from "react";
import Header from "./sections/Header/header.jsx";
import Info from "./sections/Info/info.jsx";
import Dados from "./sections/Dados/dados.jsx";
import Footer from "./sections/Footer/footer.jsx";
import "./style.css";

const App = () => {
  return (
    <>
      <Header />
      <Info />
      <Dados />
      <Footer />
    </>
  );
};

export default App;
