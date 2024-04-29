import { Outlet } from "react-router-dom";
import appRoutes from "../../routes/AppRoutes";
import CatalogForm from "./CatalogForm";
import CatalogNav from "./CatalogNav";

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
