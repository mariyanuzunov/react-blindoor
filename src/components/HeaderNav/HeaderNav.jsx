import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../firebase';
import CartContext from '../../context/CartContext';

import { Container, Nav, Navbar, NavDropdown } from '../../react-bootstrap';

export default function HeaderNav({ user }) {
    const { products: cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    function handleLogout() {
        logout().then(() => navigate('/'));
    }

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
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                {!user.isAdmin ? (
                                    <Nav.Link as={NavLink} to='/cart'>
                                        Количка ( {cartItems.length} )
                                    </Nav.Link>
                                ) : null}

                                <UserControls
                                    user={user}
                                    products={cartItems}
                                    handleLogout={handleLogout}
                                />
                            </>
                        ) : (
                            <GuestControls />
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function UserControls({ user, handleLogout }) {
    return (
        <NavDropdown title={user.email} id='collasible-nav-dropdown'>
            {user.isAdmin ? (
                <NavDropdown.Item as={NavLink} to='/admin'>
                    Админ панел
                </NavDropdown.Item>
            ) : (
                <NavDropdown.Item as={NavLink} to='/user/my-orders'>
                    Моите поръчки
                </NavDropdown.Item>
            )}

            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Изход</NavDropdown.Item>
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
