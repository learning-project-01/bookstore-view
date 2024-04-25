import { useState } from "react";
import { useEffect } from "react";
import { Table } from "reactstrap";
import { get } from "../../clients/HttpClient";

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
      <h1>Catalog List</h1>
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th scope="row">ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock Quantity</th>
            </tr>
          </thead>
          <tbody>{data.map(createTableRow)}</tbody>
        </Table>
      </div>
    </>
  );
}

export { CatalogList };
