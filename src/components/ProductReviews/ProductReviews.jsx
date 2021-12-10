import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {
    createReview,
    getProductReviews,
    removeReview,
    useAuth,
} from '../../firebase';

import './ProductReviews.css';

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
        <section className='reviews-container'>
            <h3>Потребителски ревюта</h3>

            <section className='reviews-list'>
                {reviews.map(review => (
                    <article key={review.id} className='review'>
                        <p className='author'>
                            <span>{review.email}</span> написа:
                        </p>
                        <hr />
                        <p className='text'>{review.text}</p>
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

            <section className='add-review'>
                <h5>Добави ново ревю</h5>
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        as='textarea'
                        name='text'
                        rows={6}
                        // placeholder='Описание на продукта'
                    />
                    <Button type='submit'>Изпрати</Button>
                </Form>
            </section>
        </section>
    );
}
