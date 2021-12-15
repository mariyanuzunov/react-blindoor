import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import { createOrder, useAuth } from '../../firebase';

import { Alert } from '../../react-bootstrap';
import CartItem from './CartItems';
import CartForm from './CartForm';

import styles from './Cart.module.css';

export default function Cart() {
    const { products, resetCart } = useContext(CartContext);
    const user = useAuth();

    function submitOrder(shippingDetails) {
        const order = {
            customerId: user.uid,
            products,
            shippingDetails,
        };
        resetCart();
        return createOrder(order);
    }

    return products.length > 0 ? (
        <>
            <div className={styles['cart-page']}>
                <div>
                    {products.map(product => (
                        <CartItem key={product.id} product={product} />
                    ))}
                </div>
                <CartForm submitOrder={submitOrder} />
            </div>
        </>
    ) : (
        <Alert variant='warning' className={styles['info-box']}>
            Вашата количка е празна! Може да разгледате всички налични продукти
            в нашия <Link to='/catalog'>каталог</Link>.
        </Alert>
    );
}
