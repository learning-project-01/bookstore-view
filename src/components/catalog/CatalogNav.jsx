import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

function CatalogNav() {
  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink className="btn btn-primary mr-3" to="/catalog/all">Items</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="btn btn-primary" to="/catalog/new">New</NavLink>
        </NavItem>
      </Nav>
    </>
  );
}

export default CatalogNav;
