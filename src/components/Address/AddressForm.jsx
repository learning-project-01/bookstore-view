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

function AddressForm() {
  // State for form fields
  
  const [line1, setline1] = useState("");
  const [line2, setline2] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [postalCode, setpostalCode] = useState("");






  // State for global error message
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!line1||!line2||!city||!state||!country||!postalCode) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Your logic for form submission goes here

    // Clear global error message on successful submission
    setErrorMessage("");
    let request = {
       
        line1:line1,
        line2:line2,
        city:city,
        state:state,
        country:country,
        postalCode:postalCode
    
    
    };
    post("http://localhost:8080/app/address", JSON.stringify(request));
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
                <Label for="line1">line1</Label>
                <Input
                  type="text"
                  name="line1"
                  id="line1"
                  value={line1}
                  onChange={(e) => setline1(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="line1">line2</Label>
                <Input
                  type="text"
                  name="line2"
                  id="line2"
                  value={line2}
                  onChange={(e) => setline2(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="city">city</Label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
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
                  onChange={(e) => setcountry(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="postalCode">postalCode</Label>
                <Input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => setpostalCode(e.target.value)}
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

export default AddressForm;
