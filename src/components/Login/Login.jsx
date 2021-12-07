import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { login } from '../../firebase';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleLogin(e) {
        e.preventDefault();
        login(emailRef.current.value, passwordRef.current.value)
            .then(res => console.log(res.user))
            .catch(console.log);
    }

    return (
        <Form className='auth-form' onSubmit={handleLogin}>
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
            <div className={styles['form-controls']}>
                <Button variant='primary' type='submit'>
                    Вход
                </Button>
                <Link to='/register'>създаване на нов профил</Link>
            </div>
        </Form>
    );
}
