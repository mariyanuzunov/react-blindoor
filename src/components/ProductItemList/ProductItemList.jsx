import { Col, Row } from 'react-bootstrap';
import ProductItem from '../ProductItem/ProductItem';

export default function ProductItemList({ items }) {
    return (
        <Row sm={1} md={2} lg={3} className='g-4'>
            {items.map(item => (
                <Col key={item.id}>
                    <ProductItem item={item} />
                </Col>
            ))}
        </Row>
    );
}
