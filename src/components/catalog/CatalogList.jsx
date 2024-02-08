import { useState } from "react";
import { useEffect } from "react";
import { get } from "../../clients/HttpClient";
import CatalogNav from "./CatalogNav";

function CatalogList() {
  const [data, setData] = useState([]);

  function setTableData(response) {
    setData(response.data);
  }
  useEffect(() => {
    get("http://localhost:8080/catalogItems", setTableData);
  }, []); // Empty dependency array to ensure effect runs only once

  // Function to create table rows from the data
  const createTableRow = (item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.stockQuantity}</td>
    </tr>
  );

  return (
    <>
      <CatalogNav />
      <h1>Catalog List</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock Quantity</th>
            </tr>
          </thead>
          <tbody>{data.map(createTableRow)}</tbody>
        </table>
      </div>
    </>
  );
}

export { CatalogList };
