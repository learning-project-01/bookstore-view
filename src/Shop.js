import { CatalogComponent } from "./components/CatalogComponent";

function Shop(){
    return <>
      <h1>This is shop</h1>
      <CatalogComponent/> {/** we are importing CatalogComponent */}
    </>
}

export {Shop}