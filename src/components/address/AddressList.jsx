import { useState } from "react";
import { useEffect } from "react";
import { Table } from "reactstrap";
import { get } from "../../clients/HttpClient";
import {APP_PROPS} from "../../constants/AppConstants";

function AddressList() {
  const [data, setData] = useState([]);

  function setTableData(response) {
    setData(response.data);
  }
  useEffect(() => {
      const apiUrl = `${APP_PROPS.bookstoreUrl}/address`;
    get(apiUrl, setTableData);
  }, []);

  const createTableRow = (address) => (
    <tr key={address.id}>
      <td>{address.id}</td>
      <td>{address.line1}</td>
      <td>{address.line2}</td>
      <td>{address.city}</td>
      <td>{address.state}</td>
      <td>{address.country}</td>
      <td>{address.postalCode}</td>
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
              <th>Line-1</th>
              <th>Line-2</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Postal Code</th>
            </tr>
          </thead>
          <tbody>{data.map(createTableRow)}</tbody>
        </Table>
      </div>
    </>
  );
}

 export { AddressList };
