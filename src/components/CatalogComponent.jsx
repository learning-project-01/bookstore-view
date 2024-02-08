import { Outlet } from "react-router-dom";
import appRoutes from "../routes/AppRoutes";
import CatalogForm from "./catalog/CatalogForm";
import CatalogNav from "./catalog/CatalogNav";

function CatalogComponent() {
  // here function name must start with uppercase as we are making it a component

  return (
    <>
      <CatalogNav />
      <Outlet />
    </>
  );
}

export { CatalogComponent };
