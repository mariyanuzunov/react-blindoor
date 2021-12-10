import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Admin() {
    return (
        <>
            <Nav.Link as={Link} to='/admin/products/create'>
                Добавяне на нов продукт
            </Nav.Link>
            <Nav.Link as={Link} to='/admin/orders'>
                Списък с направените поръчки
            </Nav.Link>
        </>
    );
}
