// Import necessary dependencies
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import { post } from "../../clients/HttpClient";
import { APP_PROPS } from "../../constants/AppConstants";

function CatalogForm() {
  // State for form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // State for global error message
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !price || !quantity) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Your logic for form submission goes here

    // Clear global error message on successful submission
    setErrorMessage("");
    let request = {
      name: name,
      price: price,
      stockQuantity: quantity,
    };
    post("http://localhost:8080/catalogItems", JSON.stringify(request));
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <h3>Catalog Form</h3>
            <Form onSubmit={handleSubmit}>
              {/* Global Error Message */}
              {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

              {/* Form Fields */}
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  type="text"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="quantity">Quantity</Label>
                <Input
                  type="text"
                  name="quantity"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </FormGroup>

              {/* Submit Button */}
              <Button color="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CatalogForm;
