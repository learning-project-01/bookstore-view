import {useEffect, useState} from "react";
import {Table} from "reactstrap";
import {get} from "../clients/HttpClient";
import {APP_PROPS} from "../constants/AppConstants";

function CartComponent() {
    const [cartData, setCartData] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    function setCartTableData(response) {
        setCartData(response.data.items);
        setCartTotal(response.data.total);
    }

    useEffect(() => {
        const cartSummaryUrl = `${APP_PROPS.bookstoreUrl}/cart`
        get(cartSummaryUrl, setCartTableData);
    }, []);

    const createCartTableRow = (cartItem) => (
        <tr key={cartItem.id}>
            <td>{cartItem.id}</td>
            <td>{cartItem.name}</td>
            <td>${cartItem.price.toFixed(2)}</td>
            <td>{cartItem.quantity}</td>
            <td>${cartItem.total.toFixed(2)}</td>
        </tr>
    );

    return (
        <>
            <h1>Cart Details</h1>
            <div>
                <Table bordered>
                    <thead>
                    <tr>
                        <th scope="row">ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>{cartData.map(createCartTableRow)}</tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="4"></td>
                        <td><strong>Total:</strong> ${cartTotal.toFixed(2)}</td>
                    </tr>
                    </tfoot>
                </Table>
            </div>
        </>
    );
}

export {CartComponent};
