import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import CartItem from './CartItems';
import styles from './Cart.module.css';
import CartForm from './CartForm';
import { createOrder, useAuth } from '../../firebase';

export default function Cart() {
    const { products } = useContext(CartContext);
    const user = useAuth();

    function submitOrder(shippingDetails) {
        const order = {
            customerId: user.uid,
            products,
            shippingDetails,
        };

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
        <h1>Empty cart</h1>
    );
}
