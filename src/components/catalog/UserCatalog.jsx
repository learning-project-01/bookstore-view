import {Button, Table} from "reactstrap";
import {useEffect, useState} from "react";
import {get, post} from "../../clients/HttpClient";
import {APP_PROPS} from "../../constants/AppConstants";

function UserCatalog() {
    const [data, setData] = useState([]);

    function setTableData(response) {
        setData(response.data);
    }

    useEffect(() => {
        const catalogUrl = `${APP_PROPS.bookstoreUrl}/catalogItems`
        get(catalogUrl, setTableData);
    }, []);
    function handelAddToCart(item) {
        const addToCartUrl = `${APP_PROPS.bookstoreUrl}/cart/${item.id}`
        post(addToCartUrl, item.id);
        console.log("Item added to cart : ", item);
    }

    const createTableRow = (item) => (<tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.stockQuantity}</td>
        <td>
            {item.stockQuantity > 0 ? (<Button color="primary" onClick={() => {
                handelAddToCart(item)
            }}>Add to Cart </Button>) : (<Button color="secondary" disabled>Out of Stock</Button>)}
        </td>
    </tr>);

    return (<>
        <h1>Catalog List</h1>
        <div>
            <Table bordered>
                <thead>
                <tr>
                    <th scope="row">ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock Quantity</th>
                    <th>Add to Cart</th>
                </tr>
                </thead>
                <tbody>{data.map(createTableRow)}</tbody>
            </Table>
        </div>
    </>);
}

export {UserCatalog};