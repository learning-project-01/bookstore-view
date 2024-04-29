import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function TopNavbar() {

  const navLinks = [
    { link: "/shop", text: "Shop" },
    { link: "/cart", text: "Cart" },
    { link: "/orders", text: "Orders" },
    { link: "/profile", text: "Profile" },
  ];

  const navItem = (item) => {
   return <>
    <NavItem>
      <NavLink>
        <Link to={item.link}>{item.text}</Link>
      </NavLink>
    </NavItem>
   </>
  }

  return (
    <div>
      <Navbar style={{ "backgroundColor": "yellow" }}>
        <Nav className="me-auto" horizontal="true">
          {navLinks.map(navItem)}
        </Nav>
      </Navbar>
    </div>
  );
}

export default TopNavbar;
