import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from './firebase';
import Catalog from './components/Catalog';
import Contacts from './components/Contacts';
import HeaderNav from './components/HeaderNav';
import Home from './components/Home';
import Login from './components/Login/Login';
import Register from './components/Register';
import './App.css';
import CreateOrUpdateForm from './components/CreateOrUpdateForm';
import Admin from './components/Admin/Admin';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart/Cart';
import { CartProvider } from './context/CartContext';

export default function App() {
    const currentUser = useAuth();
    return (
        <BrowserRouter>
            <CartProvider>
                <HeaderNav email={currentUser?.email} />
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/catalog' element={<Catalog />}></Route>
                        <Route
                            path='/catalog/:id'
                            element={<ProductDetails />}
                        ></Route>
                        <Route path='cart' element={<Cart />}></Route>
                        <Route path='/contacts' element={<Contacts />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/register' element={<Register />}></Route>
                        <Route path='/admin' element={<Admin />}></Route>
                        <Route
                            path='/admin/products/create'
                            element={<CreateOrUpdateForm />}
                        ></Route>
                        <Route
                            path='/admin/products/update/:id'
                            element={<CreateOrUpdateForm />}
                        ></Route>
                    </Routes>
                </div>
            </CartProvider>
        </BrowserRouter>
    );
}
