import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import routes from "../routes/AppRoutes";
import SidebarNav from "./dashboard/SidebarNav";
import TopNavbar from "./dashboard/TopNavbar";


const DashboardComponent = () => {
  return <>
      <Router>
        <Container>
          <div id="toast"></div>
          <Row>
            <TopNavbar/>
          </Row>
          <Row>
            {/* <Col md="12">
                <h1>Bookstore App</h1>
            </Col>
            <Col md="4">
                <SidebarNav/>
            </Col> */}
            <Col md="12">{routes}</Col>
          </Row>
        </Container>
      </Router>
    </>
};

export default DashboardComponent;
