import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Faqs from "./pages/faqs";
import { Box} from "@chakra-ui/react";
import NavigationBar from "./components/NavigationBar";
import TopBar from "./components/TopBar";
import Home from "./pages/Home"
import ContactUs from "./pages/contact-us"
import ShoppingCart from "./pages/shopping-cart"
import Dresses from "./pages/DressesPage"
import Pants from "./pages/PantsPage";
import Tops from "./pages/TopsPage";
import IndividualItem from "./pages/individualItem";
import { ShoppingCartProvider } from "./context/cartFunction";
import PaymentPage from './pages/PaymentPage'
import SearchResults from './pages/SearchResults'
import Wishlist from './pages/wishlist'
import { WishlistProvider } from './components/WishlistContext'

function App() {
  

  return (
    <>
    <ShoppingCartProvider>
      <WishlistProvider>
      <HashRouter basename="/">
        <Box backgroundColor="#FFFFFF">
          <TopBar />
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" />
            <Route path="/dresses" element={<Dresses />}></Route>
            <Route path="/pants" element={<Pants />}></Route>
            <Route path="/tops" element={<Tops />}></Route>
            <Route path="/:itemId" element={<IndividualItem />}></Route>
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/search/:itemName" element={<SearchResults />}></Route>
            <Route path="/wishlist" element={<Wishlist />}></Route>
          </Routes>
        </Box>
      </HashRouter>
      </WishlistProvider>
    </ShoppingCartProvider>
      
    </>
  );
}

export default App;
