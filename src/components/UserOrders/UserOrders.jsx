import { useEffect, useState } from 'react';
import { getUserOrders } from '../../firebase';
import OrdersList from '../OrdersList/OrdersList';

export default function UserOrders({ userId }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getUserOrders(userId).then(setOrders);
    }, [userId]);

    return <OrdersList orders={orders} />;
}
