import React from "react";
import Cloud from "../../assets/cloud.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Info() {
  return (
    <Container fluid>
      <Container>
        <Row className="p-5">
          <Col md={8} className=" d-flex align-items-center justify-content-around  ">
            <h1 className="inter-800 mb-0">
              Descubra Mais com Precisão:
              <br />
              Previsões do Tempo e endereços
              <br />
              em tempo real.
            </h1>
          </Col>
          <Col md={4}>
            <img src={Cloud} alt="Nuvenzinha bonitinha" />
          </Col>
        </Row>
      </Container>
    </Container>
    //<div className="container">
    //  <section className="Text">
    //    <p>
    //      Descubra Mais com Precisão:
    //      <br />
    //      Previsões do Tempo e endereços
    //      <br />
    //      em tempo real.
    //    </p>
    //  </section>
    //  <img src={Cloud} className="Img" alt="" />
    //</div>
  );
}

export default Info;
