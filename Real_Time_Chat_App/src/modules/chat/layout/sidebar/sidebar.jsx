import { Nav } from 'react-bootstrap';
import './sidebar.css';
import { sidebarItems } from './sidebarMenu';
import ownAI_logo from '../../../../assets/ownAI_logo1.png'; 


const Sidebar = ({ isSidebarExpanded: SidebarExpanded, isMobileOpen , activePath, setActivePath='messages'}) => {
    const handleItemClick = (e, path) => {
        e.preventDefault(); 
        setActivePath(path);
    };

    return (
        <div className={`sidebar-navigation bg-white d-flex flex-column ownai-sidebar ${!SidebarExpanded ? 'collapsed' : ''} ${isMobileOpen ? 'show' : ''}`}>
            <div className="sidebar-brand-section">
                {/* Logo */}
                <img id="logo" src={ownAI_logo}  />
            </div>

            <Nav className="flex-column flex-grow-1 p-3 gap-2  ">
                {sidebarItems.map((item, index) => (
                    <Nav.Link
                        key={index}
                        href={item.path}
                        className={`sidebar-menu-item ${activePath === item.path ? 'active' : ''}`}
                        title={!SidebarExpanded ? item.label : ''}
                        onClick={(e) => handleItemClick(e, item.path)}
                        
                    >
                        <span className="fs-5 d-flex align-items-center">{item.icon}</span>
                        <span className="fw-medium sidebar-label">{item.label }</span>
                    </Nav.Link>
                ))}
            </Nav>
        </div>
    );
};

export default Sidebar;