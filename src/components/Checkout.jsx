import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { get } from "../clients/HttpClient";
import { APP_PROPS } from "../constants/AppConstants";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function Checkout() {
    const [cartData, setCartData] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addresses, setAddresses] = useState([]);
    
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const selectAddress = (address) => {
        setSelectedAddress(address);
        setDropdownOpen(false);
    };

    const clearSelection = () => {
        setSelectedAddress(null);
    };

    const fetchAddresses = () => {
        const addressUrl = `${APP_PROPS.bookstoreUrl}/address`;
        get(addressUrl)
            (response => {
                setAddresses(response.data);
            })
            (error => {
                console.error("Error fetching addresses:", error);
            });
    };

    const fetchCartSummary = () => {
        const cartSummaryUrl = `${APP_PROPS.bookstoreUrl}/cart/checkout`;
        get(cartSummaryUrl)
            (response => {
                setCartData(response.data.items);
                setCartTotal(response.data.total);
            })
            (error => {
                console.error("Error fetching cart summary:", error);
            });
    };

    useEffect(() => {
        fetchAddresses();
        fetchCartSummary();
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
            <h1>Checkout Details</h1>
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

                <div>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle caret>Select Address</DropdownToggle>
                        <DropdownMenu>
                            {addresses.map((address) => (
                                <DropdownItem key={address.id} onClick={() => selectAddress(address)}>
                                    {`${address.line1}, ${address.city}, ${address.state}, ${address.country}`}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    {selectedAddress && (
                        <div>
                            <h2>Selected Address</h2>
                            <p>ID: {selectedAddress.id}</p>
                            <p>Line 1: {selectedAddress.line1}</p>
                            <p>Line 2: {selectedAddress.line2}</p>
                            <p>City: {selectedAddress.city}</p>
                            <p>State: {selectedAddress.state}</p>
                            <p>Country: {selectedAddress.country}</p>
                            <p>Postal Code: {selectedAddress.postalCode}</p>
                            <button onClick={clearSelection}>Clear Selection</button>
                        </div>
                    )}
                </div>
                <Button type="submit" color="light">
                    <Link to="/placeorder"><b>Place Order</b></Link>
                </Button>
            </div>
        </>
    );
}

export { Checkout };
