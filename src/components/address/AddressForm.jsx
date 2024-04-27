import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { post } from "../../clients/HttpClient";
import { APP_PROPS } from "../../constants/AppConstants";

function AddressForm() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setstate] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!line1||!line2||!city||!state||!country||!postalCode) {
      setErrorMessage("All fields are required.");
      return;
    }

    let request = {
        line1:line1,
        line2:line2,
        city:city,
        state:state,
        country:country,
        postalCode:postalCode
    };
    
    post(`${APP_PROPS.bookstoreUrl}/address`, JSON.stringify(request));

    setLine1("")
    setLine2("")
    setCity("")
    setstate("")
    setCountry("")
    setPostalCode("")
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
              <FormGroup>
                <Label for="line1">line1</Label>
                <Input
                  type="text"
                  name="line1"
                  id="line1"
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="line1">line2</Label>
                <Input
                  type="text"
                  name="line2"
                  id="line2"
                  value={line2}
                  onChange={(e) => setLine2(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="city">city</Label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="state">state</Label>
                <Input
                  type="text"
                  name="state"
                  id="state"
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="country">country</Label>
                <Input
                  type="text"
                  name="country"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="postalCode">postalCode</Label>
                <Input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </FormGroup>
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

export default AddressForm;