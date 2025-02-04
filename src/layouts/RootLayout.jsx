import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";
import Header from "../pages/Header";

const RootLayout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
