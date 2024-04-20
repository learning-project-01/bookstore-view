import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

function SidebarNav() {
  return  (
    <div style={{ width: '200px', backgroundColor: '#f0f0f0', height: '100vh', paddingTop: '20px' }}>
      <Nav vertical>
        <NavItem>
          <NavLink  to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink  to="/catalog/all">Catalog</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/media">Media</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/cart">Cart</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/orders">Orders</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/login">log in</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default SidebarNav;