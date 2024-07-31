import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<h1 className="p-4 text-2xl">Product Listing Page</h1>} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update' element={<h1 className="p-4 text-2xl">Update Product Page</h1>} />
            <Route path='/logout' element={<h1 className="p-4 text-2xl">Logout Page</h1>} />
            <Route path='/profile' element={<h1 className="p-4 text-2xl">Profile Page</h1>} />
          </Route>

          <Route path='/login' element={<Login />} />

          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
