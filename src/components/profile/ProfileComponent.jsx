import { Outlet } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { ProfileNav } from "./ProfileNav";

export function ProfileComponent() {
  return (
    <>
      <Row>
        <Col md="3">
          <ProfileNav />
        </Col>
        <Col md="9">
          <Outlet />
        </Col>
      </Row>
    </>
  );
}
