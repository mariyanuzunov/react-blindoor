import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './ProductItem.module.css';

export default function ProductItem({ item }) {
    const navigate = useNavigate();

    function handleShowDetails() {
        navigate('/catalog/' + item.id);
    }

    return (
        <Card
            style={{ width: '14rem', cursor: 'pointer' }}
            onClick={handleShowDetails}
        >
            <Card.Body>
                <Card.Img src={item.imageUrl} />
                <p className={styles['product-title']}>{item.title}</p>
            </Card.Body>
            {/* <Card.Subtitle> */}
            {/* </Card.Subtitle> */}
            <Card.Footer>
                Цена: <b>{item.price}лв.</b>
            </Card.Footer>
        </Card>
    );
}
