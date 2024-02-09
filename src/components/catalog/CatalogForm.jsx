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

export function CatalogMedia({ index, deleteFunc }) {
  const [media, setMedia] = useState({
    index: index,
    url: "",
    format: "",
    type: "",
  });
  const [edit, setEdit] = useState(false);
  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(media);
    setMedia({ ...media, [name]: value });
    setEdit(true);
  };
  const handleSave = (e) => {
    setEdit(false);
  };
  return (
    <Row>
      <Col md="3">
        <FormGroup>
          <Label for="name">URL</Label>
          <Input
            type="text"
            name="url"
            id="url"
            value={media.url}
            onChange={onChange}
          />
        </FormGroup>
      </Col>
      <Col md="3">
        <FormGroup>
          <Label for="name">Format</Label>
          <Input
            type="text"
            name="format"
            id="format"
            value={media.format}
            onChange={onChange}
          />
        </FormGroup>
      </Col>
      <Col md="3">
        <FormGroup>
          <Label for="name">Type</Label>
          <Input
            type="text"
            name="type"
            id="type"
            value={media.type}
            onChange={onChange}
          />
        </FormGroup>
      </Col>
      <Col md="3">
        <FormGroup>
          <Button
            size="sm"
            color="danger"
            onClick={() => {
              deleteFunc(index);
            }}
          >
            Delete
          </Button>

          {edit && (
            <Button size="sm" color="primary" onClick={handleSave}>
              Save
            </Button>
          )}
        </FormGroup>
      </Col>
    </Row>
  );
}

const showMediaComponent = (mediaComponent, index) => (
  <div key={index}>{mediaComponent}</div>
);

function CatalogForm() {
  const [mediaComponents, setMediaComponents] = useState([]);
  // State for form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // State for global error message
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddMedia = (e) => {
    console.log(e, mediaComponents.length);
    setMediaComponents([
      ...mediaComponents,
      <CatalogMedia
        key={mediaComponents.length}
        index={new Date().getTime()}
        deleteFunc={deleteMedia}
      />,
    ]);
  };

  const deleteMedia = (indexOfMedia) => {
    setMediaComponents((prevItems) =>
      prevItems.filter((item) => {
        return item.props.index !== indexOfMedia;
      })
    );
  };

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
          <Col md={{ size: 12 }}>
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

              <Button onClick={handleAddMedia}>Add Media</Button>
              {mediaComponents.map(showMediaComponent)}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CatalogForm;
