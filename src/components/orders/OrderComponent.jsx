import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Badge,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Table,
} from "reactstrap";
import { get } from "../../clients/HttpClient";
import { APP_PROPS } from "../../constants/AppConstants";

export function ViewOrder() {
  const [order, setData] = useState({});
  const [itemIndex, setItemIndex] = useState(0);
  const [item, setItem] = useState({});
  const { orderId } = useParams();

  useEffect(() => {
    const apiUrl = `${APP_PROPS.bookstoreUrl}/orders/${orderId}`;
    get(apiUrl, setViewOrder);
  }, []);

  function setViewOrder(response) {
    const order = response.data;
    setData(order);
    setItem(order.orderItems[0]);
  }

  const Address = ({ address }) => {
    if (!address) {
      return;
    }
    const addressInfo = JSON.parse(address);
    return (
      <>
        <ListGroup>
          <ListGroupItem>Line1: {addressInfo.line1}</ListGroupItem>
          <ListGroupItem>Line2: {addressInfo.line2}</ListGroupItem>
          <ListGroupItem>City: {addressInfo.city}</ListGroupItem>
          <ListGroupItem>State: {addressInfo.state}</ListGroupItem>
          <ListGroupItem>ZipCode: {addressInfo.postalCode}</ListGroupItem>
        </ListGroup>
      </>
    );
  };

  const OrderItem = ({ item }) => {
    return (
      <div key={item.id}>
        <Card
          style={{
            width: "18rem",
          }}
        >
          <img alt="Sample" src="https://picsum.photos/300/200" />
          <CardBody>
            <CardTitle tag="h5">{item.catalogItemId}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Unit Price: {item.unitPrice}
            </CardSubtitle>
            <CardText>
              Quantity: {item.quantity} | Total: {item.total}
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  };

  const nextItem = () => {
    const orderItems = order.orderItems || [];
    if (itemIndex < orderItems.length - 1) {
      setItemIndex((prev) => prev + 1);
    }
  };

  const prevItem = () => {
    if (itemIndex > 0) {
      setItemIndex(itemIndex - 1);
    }
  };

  useEffect(() => {
    const orderItems = order.orderItems || [];
    const orderItem = orderItems[itemIndex];
    if (orderItem) setItem(orderItem);
  }, [itemIndex]);

  return (
    <>
      <h1>Order: {orderId}</h1>
      <Row>
        <Col md={{ size: 6 }}>
            <h5>Total Amount: <Badge>{order.totalAmount}</Badge></h5> 
            <h5>Item Count: <Badge>{order.totalItemCount}</Badge></h5> 
            <h5>Date: {order.orderDate}</h5> 
          <span>
            <label>
              Shipping Address:
              <Address address={order.address} />
            </label>
          </span>
        </Col>

        <Col md={{ size: 6 }}>
          <label>
            Items: {itemIndex + 1}/{order.orderItems?.length}
          </label>
          <OrderItem item={item} />
          <br />
          <Button color="primary" onClick={prevItem}>
            Prev
          </Button>
          <Button color="primary" onClick={nextItem}>
            Next
          </Button>
        </Col>
      </Row>
    </>
  );
}
export function OrderComponent() {
  const [data, setData] = useState([]);
  const viewOrder = useNavigate();

  function setTableData(response) {
    setData(response.data);
  }

  const handleViewOrder = (orderId) => {
    console.log("view order", orderId);
    viewOrder(`${orderId}`);
  };

  useEffect(() => {
    const apiUrl = `${APP_PROPS.bookstoreUrl}/orders`;
    get(apiUrl, setTableData);
  }, []);

  const createTableRow = (order) => (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.totalAmount}</td>
      <td>{order.totalItemCount}</td>
      <td>{order.orderDate}</td>
      <td>
        <Button
          onClick={(e) => {
            handleViewOrder(order.id);
          }}
        >
          View
        </Button>
      </td>
    </tr>
  );

  return (
    <>
      <h1>Orders</h1>
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th scope="row">ID</th>
              <th>Amount</th>
              <th>Item Count</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{data.map(createTableRow)}</tbody>
        </Table>
      </div>
    </>
  );
}
