import { Col, Row } from 'react-bootstrap';
import ProductItem from '../ProductItem/ProductItem';

export default function ProductItemList({ items }) {
    return (
        <Row
            lg={3}
            className='g-4'
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            {items.map(item => (
                <Col key={item.id}>
                    <ProductItem item={item} />
                </Col>
            ))}
        </Row>
    );
}
