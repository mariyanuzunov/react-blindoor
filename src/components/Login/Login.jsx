import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../firebase';

import { Form, Button } from '../../react-bootstrap';

import styles from './Login.module.css';

export default function Login() {
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        login(emailRef.current.value, passwordRef.current.value)
            .then(() => navigate('/'))
            .catch(error => {
                if (
                    error.code === 'auth/invalid-email' ||
                    error.code === 'auth/wrong-password' ||
                    error.code === 'auth/user-not-found'
                ) {
                    setError('Грешен e-mail адрес или парола!');
                } else {
                    setError(error.code);
                }
            });
    }

    return (
        <Form className='auth-form' onSubmit={handleLogin}>
            <Form.Group>
                <Form.Label>Имейл адрес</Form.Label>
                <Form.Control type='email' placeholder='Email' ref={emailRef} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Парола</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Password'
                    ref={passwordRef}
                />
                {error && <p className={styles.error}>{error}</p>}
            </Form.Group>

            <div className={styles['form-controls']}>
                <Button variant='primary' type='submit'>
                    Вход
                </Button>
                <Link to='/register'>създаване на нов профил</Link>
            </div>
        </Form>
    );
}
