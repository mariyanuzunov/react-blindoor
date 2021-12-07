import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getAllDoors, getAllOrders } from '../../firebase';
import CatalogSidebar from '../CatalogSidebar/CatalogSidebar';
import ProductItemList from '../ProductItemList';

export default function Catalog() {
    const [doorItems, setDoorItems] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllDoors().then(doors => {
            console.log(doors);
            setDoorItems(doors);
        });
        getAllOrders().then(orders => {
            console.log(orders);
            setOrders(orders);
        });
    }, []);

    return (
        <>
            {orders.map(x => (
                <pre key={x.id}>{JSON.stringify(x, null, 4)}</pre>
            ))}
            <Row xs={1} sm={2}>
                <Col md={4}>
                    <CatalogSidebar />
                </Col>
                <Col md={8}>
                    <ProductItemList items={doorItems} />
                </Col>
            </Row>
        </>
    );
}
