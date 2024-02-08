import CatalogForm from "./catalog/CatalogForm";
import CatalogNav from "./catalog/CatalogNav";

function CatalogComponent() {
  // here function name must start with uppercase as we are making it a component

  return (
    <>
      <h1>This is Catalog Component</h1>
      <CatalogNav />
    </>
  );
}

export { CatalogComponent };
