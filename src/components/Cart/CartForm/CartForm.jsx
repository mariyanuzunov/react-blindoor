import { Col, Form, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './CartForm.module.css';

export default function CartForm({ submitOrder }) {
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        submitOrder(data).then(() => navigate('/'));
    }

    return (
        <Form className={styles['cart-form']} onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Име</Form.Label>
                        <Form.Control
                            type='text'
                            name='firstName'
                        ></Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type='text'
                            name='lastName'
                        ></Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group>
                <Form.Label>Адрес</Form.Label>
                <Form.Control type='text' name='address'></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Телефон</Form.Label>
                <Form.Control type='number' name='phone'></Form.Control>
            </Form.Group>

            <Button type='submit'>Изпрати</Button>
        </Form>
    );
}
