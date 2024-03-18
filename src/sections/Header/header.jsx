import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Header = () => {
  return (
    <>
      <Container fluid className="bg-primary">
        <Container className="text-white p-4">
          <Row>
            <Col md={8}>
              <h1 className="inter-800 m-auto">DncWeather</h1>
            </Col>
            <Col className="m-auto text-end">
              <Row>
                <Col className="d-flex justify-content-around">
                  <h3 className="mb-0 fs-5 inter-800">Endereços</h3>
                  <h3 className="mb-0 fs-5 inter-800">Previsão do tempo</h3>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Header;
