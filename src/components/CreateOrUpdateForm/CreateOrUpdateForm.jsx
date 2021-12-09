import { Formik } from 'formik';
import { Col, Form, Row, Button } from 'react-bootstrap';
import styles from './CreateOrUpdateForm.module.css';
import validationSchema from './formValidation';
import { createDoor, getDoorById, updateDoor } from '../../firebase';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateOrUpdateForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mode, setMode] = useState('create');
    const [initialValues, setInitialValues] = useState({
        category: '',
        manufacturer: '',
        title: '',
        imageUrl: '',
        price: '',
        discountedPrice: '',
        description: '',
    });

    useEffect(() => {
        if (id) {
            getDoorById(id)
                .then(item => {
                    setInitialValues(item);
                    setMode('update');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [id]);

    function handleSubmit(item) {
        // TODO: UPDATE IN GLOBAL STATE
        if (mode === 'create') {
            createDoor(item);
        } else {
            updateDoor(id, item)
                .then(res => {
                    navigate(`/catalog/${id}`);
                })
                .then(error => {
                    console.error(error);
                });
        }
    }

    return (
        <div className='container'>
            <Formik
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                initialValues={initialValues}
                enableReinitialize={true}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                }) => (
                    <Form
                        noValidate
                        onSubmit={handleSubmit}
                        className={styles.form}
                    >
                        <Row>
                            <Col>
                                <Form.Label className={styles.label}>
                                    Категория
                                </Form.Label>
                                <Form.Select
                                    name='category'
                                    value={values.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.category}
                                    isValid={
                                        touched.category && !errors.category
                                    }
                                >
                                    <option>Изберете категория</option>
                                    <option value='Входни врати'>
                                        Входни врата
                                    </option>
                                    <option value='Интериорни врати'>
                                        Интериорни врата
                                    </option>
                                </Form.Select>
                                <Form.Control.Feedback type='invalid'>
                                    {errors.category}
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Label className={styles.label}>
                                    Производител
                                </Form.Label>
                                <Form.Select
                                    name='manufacturer'
                                    value={values.manufacturer}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.manufacturer}
                                    isValid={
                                        touched.manufacturer &&
                                        !errors.manufacturer
                                    }
                                >
                                    <option>Изберете производител</option>
                                    <option value='Variodor'>Variodor</option>
                                    <option value='Eurostill'>Eurostill</option>
                                    <option value='New Style Doors'>
                                        New Style Doors
                                    </option>
                                    <option value='Star Security Door'>
                                        Star Security Door
                                    </option>
                                </Form.Select>
                                <Form.Control.Feedback type='invalid'>
                                    {errors.manufacturer}
                                </Form.Control.Feedback>
                            </Col>
                        </Row>

                        <Form.Label className={styles.label}>
                            Заглавие
                        </Form.Label>
                        <Form.Control
                            type='text'
                            name='title'
                            placeholder='Тип, производител, модел, специфики'
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.title}
                            isValid={touched.title && !errors.title}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.title}
                        </Form.Control.Feedback>

                        <Form.Label className={styles.label}>
                            Линк към изображение
                        </Form.Label>
                        <Form.Control
                            type='text'
                            name='imageUrl'
                            placeholder='http://www.imageurl.com'
                            value={values.imageUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.imageUrl}
                            isValid={touched.imageUrl && !errors.imageUrl}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.imageUrl}
                        </Form.Control.Feedback>

                        <Row>
                            <Col>
                                <Form.Label className={styles.label}>
                                    Цена (лв.)
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='price'
                                    placeholder='0'
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.price}
                                    isValid={touched.price && !errors.price}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.price}
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Label className={styles.label}>
                                    Промоционална цена (лв.)
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='discountedPrice'
                                    placeholder='0'
                                    value={values.discountedPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.discountedPrice}
                                    isValid={
                                        touched.discountedPrice &&
                                        !errors.discountedPrice
                                    }
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.discountedPrice}
                                </Form.Control.Feedback>
                            </Col>
                        </Row>

                        <Form.Label className={styles.label}>
                            Описание
                        </Form.Label>
                        <Form.Control
                            as='textarea'
                            name='description'
                            rows={10}
                            placeholder='Описание на продукта'
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.description && !errors.description}
                        />

                        <Button type='submit' className={styles['submit-btn']}>
                            {mode === 'create' ? 'Добави' : 'Редактирай'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
