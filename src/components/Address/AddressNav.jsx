import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

function AddressNav() {
  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink className="btn btn-primary mr-3" to="/address/New">New</NavLink>
        </NavItem>
      </Nav>
    </>
  );
}

export default AddressNav;
