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
import { callToast, ToastMessage } from "../common/ToastMessage";

function UserCatalog() {
  const [data, setData] = useState([]);
  const [toast, setToast] = useState({enable: false, eventType:'', message: ''});

  function setTableData(response) {
    setData(response.data);
  }

  useEffect(() => {
    const catalogUrl = `${APP_PROPS.bookstoreUrl}/catalogItems`;
    get(catalogUrl, setTableData);
  }, []);

  const resetToast = ()=> setToast({enable: false, eventType:'', message: ``} )

  function handelAddToCart(item) {
    const addToCartUrl = `${APP_PROPS.bookstoreUrl}/cart/${item.id}`;
    post(addToCartUrl, item.id);
    console.log("Item added to cart : ", item);
    setToast({enable: true, eventType:'1', message: `Item ${item.name} added to cart`} )
  }

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
            <Button disabled={toast.enable}
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
    {toast.enable && <ToastMessage eventType={toast.eventType} message={toast.message} reset={resetToast}/>}
      <Row>
        {data.map(cardItem)}
      </Row>
    </>
  );
}

export { UserCatalog };
