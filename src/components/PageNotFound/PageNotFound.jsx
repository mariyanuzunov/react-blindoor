import { useNavigate } from 'react-router-dom';

import { Button } from '../../react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-regular-svg-icons';

import styles from './PageNotFound.module.css';

export default function PageNotFound() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/');
    }
    return (
        <section className={styles['not-found']}>
            <h1 className={styles.code}>404</h1>
            <h3 className={styles.message}>
                Упс, страницата не беше намерена!
                <FontAwesomeIcon icon={faFrown} />
            </h3>

            <Button
                variant='outline-primary'
                className={styles['btn-back']}
                onClick={handleClick}
            >
                ВЪРНИ МЕ НА НАЧАЛНАТА СТРАНИЦА
            </Button>
        </section>
    );
}
