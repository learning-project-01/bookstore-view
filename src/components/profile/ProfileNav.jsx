import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap"


export function ProfileNav(){
    return ( <div style={{ width: '200px', backgroundColor: '#f0f0f0', height: '100vh', paddingTop: '20px' }}>
    <Nav vertical>
      <NavItem>
        <Link to="/profile/address">Manage Address</Link>
      </NavItem>
      <NavItem>
        <NavLink to="/logout">Logout</NavLink>
      </NavItem>
    </Nav>
  </div>
);
}