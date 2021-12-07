import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { register } from '../../firebase';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

export default function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const repeatPasswordRef = useRef();

    function handleRegister(e) {
        e.preventDefault();
        // TODO: Validation
        register(emailRef.current.value, passwordRef.current.value)
            .then(res => console.log(res.user))
            .catch(console.log);
    }

    return (
        <Form className='auth-form' onSubmit={handleRegister}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Имейл адрес</Form.Label>
                <Form.Control type='email' placeholder='Email' ref={emailRef} />
                {/* <Form.Text className='text-muted'>
                    We'll never share your email with anyone else.
                </Form.Text> */}
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Парола</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Password'
                    ref={passwordRef}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
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
