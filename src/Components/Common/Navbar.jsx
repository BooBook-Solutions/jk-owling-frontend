import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';

import { useAuthContext } from '../Context/AuthContext';

function Navigation() {

    const { authState, logout } = useAuthContext();

    const handleLogout = () => {
        logout();
        window.location.href="/authentication";
    };

    return (
        <Navbar expand="lg" className="navbar-light bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" width="40px" height="40px" className="d-inline-block align-center"/>
                {' '} J.K. Owling
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/catalogue">Catalogue</Nav.Link>
                    { !authState.isAuth && <Nav.Link href="/authentication">Authentication</Nav.Link> }
                </Nav>
                { authState.isAuth && (
                    <Nav className="d-flex align-items-center">
                    <Dropdown autoClose="outside" align={{ lg: 'end' }}>
                        <Dropdown.Toggle variant="info" className="bg-transparent border-light color-black">
                        <Image src={authState.user?.picture} width="30px" className="rounded-circle img-responsive"></Image>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                        <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                        { authState.user.role.name === "admin" && <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>}
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </Nav>
                )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;