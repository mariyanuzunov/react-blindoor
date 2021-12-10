import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from './firebase';

import { CartProvider } from './context/CartContext';

import Catalog from './components/Catalog';
import Contacts from './components/Contacts';
import HeaderNav from './components/HeaderNav';
import Home from './components/Home';
import Login from './components/Login/Login';
import Register from './components/Register';
import CreateOrUpdateForm from './components/CreateOrUpdateForm';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart/Cart';
import RequireAuth from './components/RequireAuth/RequireAuth';
import RequireGuest from './components/RequireGuest';
// make lazy
import Admin from './components/Admin/Admin';

import './App.css';
import UserOrders from './components/UserOrders/UserOrders';
import AllOrders from './components/AllOrders/AllOrders';

export default function App() {
    const user = useAuth();

    return (
        <BrowserRouter>
            <CartProvider>
                <HeaderNav user={user} />
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/catalog' element={<Catalog />}></Route>
                        <Route
                            path='/catalog/:id'
                            element={<ProductDetails />}
                        ></Route>
                        <Route
                            path='cart'
                            element={
                                <RequireAuth user={user}>
                                    <Cart />
                                </RequireAuth>
                            }
                        ></Route>
                        <Route path='/contacts' element={<Contacts />}></Route>
                        <Route
                            path='/login'
                            element={
                                <RequireGuest>
                                    <Login />
                                </RequireGuest>
                            }
                        ></Route>
                        <Route
                            path='/register'
                            element={
                                <RequireGuest>
                                    <Register />
                                </RequireGuest>
                            }
                        ></Route>
                        <Route
                            path='/admin'
                            element={
                                <RequireAuth user={user} requireAdmin={true}>
                                    <Admin />
                                </RequireAuth>
                            }
                        ></Route>
                        <Route
                            path='/admin/products/create'
                            element={
                                <RequireAuth user={user} requireAdmin={true}>
                                    <CreateOrUpdateForm />
                                </RequireAuth>
                            }
                        ></Route>
                        <Route
                            path='/admin/products/update/:id'
                            element={
                                <RequireAuth user={user} requireAdmin={true}>
                                    <CreateOrUpdateForm />
                                </RequireAuth>
                            }
                        ></Route>
                        <Route
                            path='/admin/orders'
                            element={
                                <RequireAuth user={user} requireAdmin={true}>
                                    <AllOrders />
                                </RequireAuth>
                            }
                        ></Route>
                        <Route
                            path='/user/my-orders'
                            element={
                                <RequireAuth user={user}>
                                    <UserOrders userId={user?.uid} />
                                </RequireAuth>
                            }
                        ></Route>
                    </Routes>
                </div>
            </CartProvider>
        </BrowserRouter>
    );
}
