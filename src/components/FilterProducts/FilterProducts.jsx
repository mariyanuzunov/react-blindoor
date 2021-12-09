import { useRef } from 'react';
import { Col, Form, Row, Card, Button } from 'react-bootstrap';
import {
    categories,
    manufacturers,
} from '../CreateOrUpdateForm/formValidation';

// TODO: Refactor
export default function FilterProducts({ filterItems }) {
    const formRef = useRef();

    function handleChange() {
        const values = Object.fromEntries(new FormData(formRef.current));
        filterItems(values);
    }

    function handleReset() {
        formRef.current.reset();
        filterItems({});
    }

    return (
        <Card style={{ padding: '15px', boxSizing: 'border-box' }}>
            <Form ref={formRef}>
                <Form.Group>
                    <Form.Label>Категория:</Form.Label>
                    {categories.map(category => (
                        <Form.Check
                            key={category}
                            type='radio'
                            name='category'
                            label={category}
                            value={category}
                            onChange={handleChange}
                        ></Form.Check>
                    ))}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Производител:</Form.Label>
                    {manufacturers.map(manufacturer => (
                        <Form.Check
                            key={manufacturer}
                            type='radio'
                            label={manufacturer}
                            name='manufacturer'
                            value={manufacturer}
                            onChange={handleChange}
                        ></Form.Check>
                    ))}
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            От
                            <Form.Control
                                type='number'
                                name='minPrice'
                                onChange={handleChange}
                            ></Form.Control>{' '}
                            лв.
                        </Col>

                        <Col>
                            До
                            <Form.Control
                                type='number'
                                name='maxPrice'
                                onChange={handleChange}
                            ></Form.Control>{' '}
                            лв.
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Ключова дума</Form.Label>
                    <Form.Control
                        type='text'
                        name='keyword'
                        onChange={handleChange}
                    ></Form.Control>
                </Form.Group>
                <Button onClick={handleReset}>Изчисти</Button>
            </Form>
        </Card>
    );
}
