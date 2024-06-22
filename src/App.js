import { Header, Footer, Home, Catalog, Favorites, Cart, Product, ContactForm, Checkout } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Header/>
        <main className="content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/catalog" element={<Catalog/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/product/:id" element={<Product/>}/>
          <Route path="/ContactForm" element={<ContactForm/>}/>
          <Route path="/Checkout" element={<Checkout/>}/>
        </Routes>
        <Footer/>
        </main>
      </div>
    </Router>
  );
}

export default App;
