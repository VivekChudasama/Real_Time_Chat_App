import { Navbar, Form, InputGroup } from 'react-bootstrap';
import { BsSearch, BsList, BsPersonCircle } from 'react-icons/bs';
import { CgShoppingBag } from "react-icons/cg";
import './header.css';

const Header = ({ toggleSidebarVisibility }) => {
    return (
        <Navbar bg="white" expand={false} className="header-navigation sticky-top shadow-sm ownai-header">
            <div className="d-flex align-items-center w-100 h-100 " style={{
                padding:'12px 0'
            }} >

                {/* Toggle & Search Section */}
                <div className="d-flex align-items-center flex-grow-1">
                    <div className="icon-button me-3" onClick={toggleSidebarVisibility} title="Toggle Sidebar">
                        <BsList className="fs-4 text-secondary" />
                    </div>

                    <Form className="flex-grow-1 header-search-container d-none d-sm-flex" style={{
                        marginRight:'20px'
                    }}>
                        <InputGroup className="search-input-group">
                            <InputGroup.Text className="search-icon-container">
                                <BsSearch className="text-muted" />
                            </InputGroup.Text>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="search-text-field"
                                label="Search"
                            />
                        </InputGroup>
                    </Form>
                </div>

                {/* Right Icons Section */}
                <div className="d-flex align-items-center gap-2">
                    <div className="icon-button text-warning fs-6" title="Theme Toggle">
                        <Form>
                            <Form.Check 
                                type="switch"
                                id="custom-switch"
                            />
                        </Form>
                    </div>

                    <div className="icon-button position-relative text-secondary" title="Messages">
                        <CgShoppingBag className="fs-5" />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <BsPersonCircle className="fs-3 text-secondary" />
                        <span className="fw-semibold text-dark d-none d-md-block">admin</span>
                    </div>
                </div>
            </div>
        </Navbar>
    );
};

export default Header;