import { Col, Row } from '../../react-bootstrap';
import ProductItem from '../ProductItem/ProductItem';

import styles from './ProductItemList.module.css';

export default function ProductItemList({ items }) {
    return (
        <Row lg={3} className={styles['pis-row']}>
            {items.map(item => (
                <Col key={item.id}>
                    <ProductItem item={item} />
                </Col>
            ))}
        </Row>
    );
}
