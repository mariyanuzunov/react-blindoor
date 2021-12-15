import { useEffect, useState } from 'react';
import { getAllOrders } from '../../../firebase';
import OrdersList from '../../OrdersList/OrdersList';

export default function AllOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllOrders().then(setOrders);
    }, []);

    return <OrdersList orders={orders} />;
}
