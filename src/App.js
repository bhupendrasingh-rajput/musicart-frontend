import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import Register from './Components/Register/Register';
import LoginPage from './Pages/LoginPage/LoginPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductPage from './Pages/ProductPage/ProductPage';
import CartPage from './Pages/CartPage/CartPage';
import { useSelector } from 'react-redux';
import CheckoutPage from './Pages/CheckoutPage/CheckoutPage';
import OrderPlacedPage from './Pages/OrderPlacedPage/OrderPlacedPage';
import InvoicePage from './Pages/InvoicePage/InvoicePage';
import InvoiceDetailsPage from './Pages/InvoiceDetailsPage/InvoiceDetailsPage';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product/:productId' element={<ProductPage />} />
        <Route path='/cart' element={isAuthenticated ? <CartPage /> : <Navigate to='/login' replace />} />
        <Route path='/checkout' element={isAuthenticated ? <CheckoutPage /> : <Navigate to='/login' replace />} />
        <Route path='/order' element={isAuthenticated ? <OrderPlacedPage /> : <Navigate to='/login' replace />} />
        <Route path='/invoices' element={isAuthenticated ? <InvoicePage /> : <Navigate to='/login' replace />} />
        <Route path='/invoice/:invoiceId' element={isAuthenticated ? <InvoiceDetailsPage /> : <Navigate to='/login' replace />} />
      </Routes>
    </div>
  );
}

export default App;
