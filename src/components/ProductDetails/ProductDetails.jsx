import { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import { deleteDoor, getDoorById } from '../../firebase';
import styles from './ProductDetails.module.css';

// TODO: refactor add to cart

export default function ProductDetails() {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const { addProductToCart } = useContext(CartContext);

    // const [quantity, setQuantity] = useState(1);
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
        // console.log(quantity);
        // addProductToCart({ ...product, quantity });
        console.log(product.id);
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
                    <h1 className={styles['product-title']}>{product.title}</h1>
                    <p className={styles['product-price']}>
                        {product.price} лв.
                    </p>
                    <p className={styles['product-de']}>
                        {product.description}
                    </p>
                </div>
                <div className={styles['product-controls']}>
                    {/* <Button onClick={() => setQuantity(q => q + 1)}>+</Button>
                    <input
                        type='text'
                        style={{ width: '35px' }}
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                    />
                    <Button onClick={() => setQuantity(q => q - 1)}>-</Button> */}
                    {isAddedToCart ? (
                        <Button
                            variant='outline-danger'
                            size='lg'
                            onClick={handleRemoveFromCart}
                        >
                            Премахни от количката
                        </Button>
                    ) : (
                        <Button
                            variant='outline-primary'
                            size='lg'
                            onClick={handleAddToCart}
                        >
                            Добави в количката
                        </Button>
                    )}

                    {/* <Button
                        variant='outline-primary'
                        size='lg'
                        onClick={handleAddToCart}
                    >
                        Добави в количката
                    </Button> */}
                    <ButtonGroup>
                        <Button
                            variant='outline-secondary'
                            size='sm'
                            onClick={handleUpdate}
                        >
                            Редактирай
                        </Button>
                        <Button
                            variant='outline-danger'
                            size='sm'
                            onClick={handleDelete}
                        >
                            Изтрий
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
}
