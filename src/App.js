import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useAuth } from './firebase';

import { Spinner } from './react-bootstrap';
import HeaderNav from './components/HeaderNav';
import Home from './components/Home';
import Catalog from './components/Catalog';
import Contacts from './components/Contacts';
import Login from './components/Login/Login';
import Register from './components/Register';
import Cart from './components/Cart/Cart';
import UserOrders from './components/UserOrders/UserOrders';
import ProductDetails from './components/ProductDetails';
import RequireAuth from './components/RequireAuth/RequireAuth';
import RequireGuest from './components/RequireGuest';

import './App.css';

const Admin = lazy(() => import('./components/Admin/Admin'));

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
                            path='/admin/*'
                            element={
                                <RequireAuth user={user} requireAdmin={true}>
                                    <Suspense fallback={<Spinner />}>
                                        <Admin />
                                    </Suspense>
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
