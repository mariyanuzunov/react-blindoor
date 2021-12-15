import { useContext, useState } from 'react';
import CartContext from '../../../context/CartContext';

import { Button, Form } from '../../../react-bootstrap';

import styles from './CartItem.module.css';

export default function CartItem({ product }) {
    const { updateProductQuantity, removeProductFromCart } =
        useContext(CartContext);
    const [quantity, setQuantity] = useState(product.quantity);

    function handleQuantityChange(productId) {
        updateProductQuantity(productId, quantity);
    }
    return (
        <div key={product.id} className={styles['card']}>
            <Button
                variant='outline-danger'
                className={styles['btn-delete']}
                onClick={() => removeProductFromCart(product.id)}
            >
                X
            </Button>
            <div className={styles['image-container']}>
                <img
                    src={product.imageUrl}
                    alt='door'
                    className={styles['product-image']}
                />
            </div>
            <div className={styles['title-quantity-container']}>
                <p className={styles['product-title']}>{product.title}</p>
                <div className={styles['quantity-controls']}>
                    <span className={styles['product-quantity']}>
                        Количество:
                    </span>

                    <Button
                        variant='outline-success'
                        size='sm'
                        onClick={() => setQuantity(q => q + 1)}
                    >
                        +
                    </Button>

                    <Form.Control
                        className={styles['quantity-field']}
                        value={quantity}
                        onChange={e => {
                            setQuantity(Number(e.target.value));
                        }}
                    ></Form.Control>
                    <Button
                        variant='outline-danger'
                        size='sm'
                        onClick={() => setQuantity(q => q - 1)}
                    >
                        -
                    </Button>
                    <Button
                        variant='light'
                        size='sm'
                        onClick={() => handleQuantityChange(product.id)}
                    >
                        Приложи
                    </Button>
                </div>
            </div>
            <p className={styles['product-price']}>
                Цена: {product.price * product.quantity || 1} лв.
            </p>
        </div>
    );
}
