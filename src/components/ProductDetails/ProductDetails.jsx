import { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import { deleteDoor, getDoorById, useAuth } from '../../firebase';
import ProductReviews from '../ProductReviews/ProductReviews';
import styles from './ProductDetails.module.css';

// TODO: refactor add to cart

export default function ProductDetails() {
    const user = useAuth();
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const { addProductToCart } = useContext(CartContext);

    const [isAddedToCart, setIsAddedToCart] = useState(false);

    useEffect(() => {
        getDoorById(id).then(setProduct).catch(console.error);
    }, [id]);

    function handleUpdate() {
        navigate(`/admin/products/update/${id}`);
    }

    function handleDelete() {
        deleteDoor(id);
        navigate('/catalog');
    }

    function handleAddToCart() {
        if (!user) {
            navigate('/login');
        }

        addProductToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
        });
        setIsAddedToCart(true);
    }

    function handleRemoveFromCart() {}

    return (
        <>
            <div className={styles['product-container']}>
                <div className={styles['product-img-container']}>
                    <img
                        className={styles['product-img']}
                        src={product.imageUrl}
                        alt='door img'
                    />
                </div>
                <div className={styles['product-details-container']}>
                    <div className={styles['product-details']}>
                        <h1 className={styles['product-title']}>
                            {product.title}
                        </h1>
                        <p className={styles['product-price']}>
                            {product.price} лв.
                        </p>
                        <p className={styles['product-de']}>
                            {product.description}
                        </p>
                    </div>
                    <div className={styles['product-controls']}>
                        {user && !user.isAdmin ? (
                            <UserControls
                                isInCart={isAddedToCart}
                                addToCart={handleAddToCart}
                                removeFromCart={handleRemoveFromCart}
                            />
                        ) : null}

                        {user && user.isAdmin ? (
                            <AdminControls
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
            <ProductReviews productId={id} />
        </>
    );
}

function UserControls({ isInCart, addToCart, removeFromCart }) {
    if (isInCart) {
        return (
            <Button variant='outline-danger' size='lg' onClick={removeFromCart}>
                Премахни от количката
            </Button>
        );
    } else {
        return (
            <Button variant='outline-primary' size='lg' onClick={addToCart}>
                Добави в количката
            </Button>
        );
    }
}

function AdminControls({ handleUpdate, handleDelete }) {
    return (
        <ButtonGroup>
            <Button
                variant='outline-secondary'
                size='sm'
                onClick={handleUpdate}
            >
                Редактирай
            </Button>
            <Button variant='outline-danger' size='sm' onClick={handleDelete}>
                Изтрий
            </Button>
        </ButtonGroup>
    );
}
