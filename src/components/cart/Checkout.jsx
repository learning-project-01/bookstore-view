import React, { useEffect, useState } from "react";
import { Table, Button, Col, Row } from "reactstrap";
import { get, post } from "../../clients/HttpClient";
import { APP_PROPS } from "../../constants/AppConstants";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function Checkout() {
    const [cartData, setCartData] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addressList, setAddressList] = useState([]);
    
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleAddressSelection = (address) => {
        setSelectedAddress(address);
        setDropdownOpen(false);
    };

    const clearSelection = () => {
        setSelectedAddress(null);
    };

    const fetchAddresses = () => {
        const addressUrl = `${APP_PROPS.bookstoreUrl}/address`;
        get(addressUrl,
            response => {
                setAddressList(response.data);
            },
            error => {
                console.error("Error fetching addresses:", error);
            });
    };

    const fetchCartSummary = () => {
        const cartSummaryUrl = `${APP_PROPS.bookstoreUrl}/cart/checkout`;
        get(cartSummaryUrl,
            response => {
                setCartData(response?.data?.items || []); // why we do this
                setCartTotal(response?.data?.total || 0);
            },
            error => {
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

    const handleSubmit = (e) => {
      console.log(selectedAddress);
      e.preventDefault();
      if (!selectedAddress?.id) {
        console.log("please select address");
        return;
      }
      const addressId = selectedAddress.id;
      console.log(addressId);

      const placeOrderUrl = `${APP_PROPS.bookstoreUrl}/orders`;
      const request = {
        addressId: addressId,
      };
      post(
        placeOrderUrl,
        request,
        (response) => {
          console.log("order placed", response.data);
        },
        (error) => {
          console.log("error on order placed", error);
        }
      );
    };

    return (
        <>
            <h1>Checkout Details</h1>
            <div>
            <Button color="primary" onClick={handleSubmit}>
                    Place Order
            </Button>
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

                <Row>
                    <Col md="3">
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle caret>Select Address</DropdownToggle>
                        <DropdownMenu>
                            {addressList.map((address) => (
                                <DropdownItem key={address.id} onClick={(e) =>{ 
                                    console.log('event fired',address.id);
                                    handleAddressSelection(address)
                                    }}>
                                    {`${address.line1}, ${address.city}, ${address.state}, ${address.country}`}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    </Col>

                    <Col md="2">
                    <Button color="primary" onClick={clearSelection}>Clear Address</Button>
                    </Col>

                    <Col md="6">
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
                        </div>
                    )}
                    </Col>
                   
                </Row>
               
            </div>
        </>
    );
}

export { Checkout };
