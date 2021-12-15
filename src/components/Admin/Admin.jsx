import { Link, Route, Routes } from 'react-router-dom';

import { Nav } from '../../react-bootstrap';

import AllOrders from './AllOrders/AllOrders';
import CreateOrUpdateForm from './CreateOrUpdateForm';

export default function Admin() {
    return (
        <>
            <h3 style={{ textAlign: 'center', margin: '20px 0' }}>
                Контролен панел
            </h3>

            <Nav fill variant='tabs' defaultActiveKey='/home'>
                <Nav.Item>
                    <Nav.Link
                        eventKey='add-product'
                        as={Link}
                        to='/admin/products/create'
                    >
                        Добавяне на нов продукт
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='orders' as={Link} to='/admin/orders'>
                        Преглед на всички поръчки
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <Routes>
                <Route
                    path='products/create'
                    element={<CreateOrUpdateForm />}
                ></Route>
                <Route
                    path='products/update/:id'
                    element={<CreateOrUpdateForm />}
                ></Route>
                <Route path='orders' element={<AllOrders />}></Route>
            </Routes>
        </>
    );
}
