import { Outlet } from "react-router-dom";
import AddressNav from "./Address/AddressNav";

function AddressComponent() {
  // here function name must start with uppercase as we are making it a component

  return (
    <>
      <AddressNav />
      <Outlet />
    </>
  );
}

export { AddressComponent };
