import { useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import { logout } from '../../firebase';

export default function HeaderNav({ email }) {
    const { products: cartItems } = useContext(CartContext);
    return (
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand>BLINDOOR</Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link as={NavLink} to='/'>
                            Начало
                        </Nav.Link>
                        <Nav.Link as={NavLink} to='/catalog'>
                            Каталог
                        </Nav.Link>
                        <Nav.Link as={NavLink} to='/contacts'>
                            Контакти
                        </Nav.Link>
                        <Nav.Link as={NavLink} to='/admin/products/create'>
                            add product
                        </Nav.Link>
                        <Nav.Link as={NavLink} to='/cart'>
                            cart ({cartItems.length})
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {email ? (
                            <UserControls email={email} />
                        ) : (
                            <GuestControls />
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function UserControls({ email }) {
    return (
        <NavDropdown title={email} id='collasible-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>Профил</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to='/admin'>
                Админ панел
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Изход</NavDropdown.Item>
        </NavDropdown>
    );
}

function GuestControls() {
    return (
        <>
            <Nav.Link as={NavLink} to='/login'>
                Вход
            </Nav.Link>
            <Nav.Link as={NavLink} to='/register'>
                Регистрация
            </Nav.Link>
        </>
    );
}
