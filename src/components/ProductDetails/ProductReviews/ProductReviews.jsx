import { useEffect, useState } from 'react';
import { Form, Button, Alert } from '../../../react-bootstrap';
import {
    createReview,
    getProductReviews,
    removeReview,
    useAuth,
} from '../../../firebase';

import styles from './ProductReviews.module.css';

export default function ProductReviews(productId) {
    const user = useAuth();

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getProductReviews(productId).then(setReviews);
    }, [productId]);

    function handleSubmit(e) {
        e.preventDefault();

        const { text } = Object.fromEntries(new FormData(e.target));

        const data = {
            userId: user.uid,
            email: user.email,
            productId,
            text: text.trim(),
        };

        createReview(data).then(() => {
            setReviews(state => [...state, data]);
            e.target.reset();
        });
    }

    function handleDelete(reviewId) {
        removeReview(reviewId)
            .then(() => {
                console.log(reviewId);
                setReviews(state => state.filter(x => x.id !== reviewId));
            })
            .catch(console.log);
    }

    return (
        <section className={styles['reviews-container']}>
            <h3>Потребителски ревюта</h3>
            <hr />

            {reviews.length > 0 ? (
                <section className={styles['reviews-list']}>
                    {reviews.map(review => (
                        <article key={review.id} className={styles['review']}>
                            <p className={styles['author']}>
                                <span>{review.email}</span> написа:
                            </p>
                            <hr />
                            <p className={styles['text']}>{review.text}</p>
                            {user?.uid === review.userId || user?.isAdmin ? (
                                <>
                                    <hr />
                                    <Button
                                        variant='outline-danger'
                                        size='sm'
                                        onClick={() => handleDelete(review.id)}
                                    >
                                        Изтрий
                                    </Button>
                                </>
                            ) : null}
                        </article>
                    ))}
                </section>
            ) : (
                <Alert variant='warning'>
                    Все още няма ревюта на този продукт!
                </Alert>
            )}

            <section className={styles['add-review']}>
                <h5>Добави ново ревю</h5>
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        as='textarea'
                        name='text'
                        rows={6}
                        // placeholder='Описание на продукта'
                    />
                    <Button type='submit' variant='outline-success'>
                        Изпрати
                    </Button>
                </Form>
            </section>
        </section>
    );
}
