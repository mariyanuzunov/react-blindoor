import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../firebase';

import { Form, Button } from '../../react-bootstrap';

import styles from './Register.module.css';

const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default function Register() {
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const repeatPasswordRef = useRef();

    const [errors, setErrors] = useState([]);

    function handleRegister(e) {
        e.preventDefault();

        setErrors([]);
        let valid = true;

        const email = emailRef.current.value;
        const pass = passwordRef.current.value;
        const rePass = repeatPasswordRef.current.value;

        if (!emailRegex.test(email)) {
            setErrors(state => [...state, 'Невалиден e-mail адрес!']);
            valid = false;
        }
        if (pass.length < 6) {
            setErrors(state => [
                ...state,
                'Паролата трябва да се състои от поне 6 символа!',
            ]);
            valid = false;
        }
        if (pass !== rePass) {
            setErrors(state => [...state, 'Паролите не съвпадат!']);
            valid = false;
        }

        if (valid) {
            register(emailRef.current.value, passwordRef.current.value)
                .then(() => navigate('/'))
                .catch(console.log);
        }
    }

    return (
        <Form className='auth-form' onSubmit={handleRegister}>
            {errors &&
                errors.map(x => (
                    <p key={x} className={styles.error}>
                        {x}
                    </p>
                ))}
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
            </Form.Group>
            <Form.Group>
                <Form.Label>Повтаряне на паролата</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Repeat password'
                    ref={repeatPasswordRef}
                />
            </Form.Group>
            <div className={styles['form-controls']}>
                <Button variant='primary' type='submit'>
                    Регистрация
                </Button>
                <Link to='/login'>влизане със съществуващ профил</Link>
            </div>
        </Form>
    );
}
