import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";
import { useEffect, useState } from "react";
import { get, post } from "../../clients/HttpClient";
import { APP_PROPS } from "../../constants/AppConstants";

function UserCatalog() {
  const [data, setData] = useState([]);

  function setTableData(response) {
    setData(response.data);
  }

  useEffect(() => {
    const catalogUrl = `${APP_PROPS.bookstoreUrl}/catalogItems`;
    get(catalogUrl, setTableData);
  }, []);
  function handelAddToCart(item) {
    const addToCartUrl = `${APP_PROPS.bookstoreUrl}/cart/${item.id}`;
    post(addToCartUrl, item.id);
    console.log("Item added to cart : ", item);
  }

  const createTableRow = (item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.stockQuantity}</td>
      <td>
        {item.stockQuantity > 0 ? (
          <Button
            color="primary"
            onClick={() => {
              handelAddToCart(item);
            }}
          >
            Add to Cart{" "}
          </Button>
        ) : (
          <Button color="secondary" disabled>
            Out of Stock
          </Button>
        )}
      </td>
    </tr>
  );

  const cardItem = (item) => (
    <Col md="4">
      <Card>
        <img alt="Sample" src="https://picsum.photos/300/200" />
        <CardBody>
          <CardTitle tag="h5">Card title</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {item.name} | {item.price}
          </CardSubtitle>
          {/* <CardText>
      Some quick example text to build on the card title and make up the bulk of the card‘s content.
    </CardText> */}
          {item.stockQuantity > 0 ? (
            <Button
              color="primary"
              onClick={() => {
                handelAddToCart(item);
              }}
            >
              Add to Cart{" "}
            </Button>
          ) : (
            <Button color="secondary" disabled>
              Out of Stock
            </Button>
          )}
        </CardBody>
      </Card>
    </Col>
  );

  return (
    <>
      <Row>
        {data.map(cardItem)}
      </Row>
    </>
  );
}

export { UserCatalog };
