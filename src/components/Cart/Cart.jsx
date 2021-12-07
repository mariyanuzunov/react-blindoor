import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import CartItem from './CartItems';
import styles from './Cart.module.css';
import CartForm from './CartForm';
import { createOrder, useAuth } from '../../firebase';

// TODO refactor, fix quantity and total price
export default function Cart() {
    const { products } = useContext(CartContext);
    const user = useAuth();

    function submitOrder(shippingDetails) {
        const totalPrice = products.reduce(
            (acc, product) => product.price * product.quantity + acc,
            0
        );

        const order = {
            customerId: user.uid,
            products,
            shippingDetails,
            status: 'регистрирана',
            totalPrice,
        };

        createOrder(order);
    }

    return (
        <div className={styles['cart-page']}>
            <div>
                {products.map(product => (
                    <CartItem key={product.id} product={product} />
                ))}
            </div>
            <CartForm submitOrder={submitOrder} />
        </div>
    );
}
