import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ProductPage from './pages/ProductPage';
import AddPage from './pages/AddPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="products" element={<ProductPage />} />
          <Route path="addProduct" element={<AddPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
