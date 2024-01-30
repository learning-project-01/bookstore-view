import React from "react";
import { NavLink } from "react-router-dom";

function CatalogNav() {
  return <>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/catalog/all" activeclassname="active">
                All
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog/new" activeclassname="active">
                New
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
}

export default CatalogNav;
