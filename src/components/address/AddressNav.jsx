import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

function AddressNav() {
  return (
    <>
      <Nav tabs>
        <NavItem>
            <Link className="btn btn-primary mr-3" to="/profile/address/all">All</Link>
            <Link className="btn btn-primary mr-3" to="/profile/address/new">New</Link>
        </NavItem>
      </Nav>
    </>
  );
}

export default AddressNav;
