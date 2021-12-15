import { useNavigate } from 'react-router-dom';

import { Card } from '../../react-bootstrap';

import styles from './ProductItem.module.css';

export default function ProductItem({ item }) {
    const navigate = useNavigate();

    function handleShowDetails() {
        navigate('/catalog/' + item.id);
    }

    return (
        <Card
            style={{
                width: '222px',
                height: '554px',
                cursor: 'pointer',
                marginTop: '10px',
            }}
            onClick={handleShowDetails}
        >
            <Card.Body>
                <Card.Img src={item.imageUrl} />
                <p className={styles['product-title']}>{item.title}</p>
            </Card.Body>
            <Card.Footer>
                Цена: <b>{item.price}лв.</b>
            </Card.Footer>
        </Card>
    );
}
