import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./index.css";
import Button from "react-bootstrap/Button";
import Cloud2 from "../../assets/cloud2.svg";
import IconLocalz from "../../assets/IconLocalz.svg";

const Dados = () => {
  async function Consultar() {
    const cep = document.querySelector("#cep").value;
    const ViaCepUrl = `https://viacep.com.br/ws/${cep}/json/`;
    await fetch(ViaCepUrl)
      .then((response) => {
        response.json().then(mostrarEndereco);
      })
      .catch((error) => {
        console.log(error);
      });

    const lat = document.querySelector("#lat").value;
    const long = document.querySelector("#long").value;
    const Weather = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`;
    await fetch(Weather)
      .then((response) => {
        response.json().then(mostrarPrev);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function mostrarEndereco(data) {
    let Logra = document.querySelector("#Logra");
    let Bairro = document.querySelector("#Bairro");
    let UF = document.querySelector("#UF");

    if (data.erro) {
      alert("CEP Incorreto");
    } else {
      Logra.innerHTML = `<p>${data.logradouro}</p>`;
      Bairro.innerHTML = `<p>${data.bairro}</p>`;
      UF.innerHTML = `<p>${data.uf}</p>`;
    }
  }

  function mostrarPrev(data) {
    let prev = document.querySelector("#RespPrev");
    if (data.erro) {
      alert("Informações de Latitude e Longitude incorretas");
    } else {
      prev.innerHTML = `Previsão de tempo de acordo com a região: ${data.hourly.temperature_2m[0]}°C`;
    }
  }

  return (
    <Container fluid>
      <Container>
        <Form className="col-6 mx-auto bg-light rounded-4 mt-5 p-4 pb-2 bg-white" id="formulario" method="post">
          <Row className="m-0 p-5">
            <Form.Group className="mt-3">
              <Form.Label className="inter-400 fs-5 text-body">Primeiro Nome:</Form.Label>
              <Form.Control
                type="text"
                id="nome"
                placeholder="Insira seu primeiro nome:"
                className="bg-light border-0 opacity-75 inter-400"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label className="inter-400">E-mail:</Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="Insira seu e-mail"
                className="bg-light border-0 opacity-75 inter-400"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label className="inter-400">Digite o CEP:</Form.Label>
              <Form.Control
                type="text"
                id="cep"
                placeholder="Insira o CEP"
                className="bg-light border-0 opacity-75 inter-400"
                required
              />
            </Form.Group>
            <Form.Group className="mt-3 mb-5">
              <Form.Label className="inter-400 ">Digite a latitude e longitude para saber a previsão:</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    id="lat"
                    placeholder="Latitude"
                    className="bg-light border-0 opacity-75 inter-400"
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    id="long"
                    placeholder="Longitude"
                    className="bg-light border-0 opacity-75 inter-400"
                    required
                  />
                </Col>
              </Row>
            </Form.Group>
            <Button className=" shadow p-0" id="botao" type="submit" onClick={Consultar}>
              <p className="m-0 fs-4 p-0 inter-600">Acessar</p>
            </Button>
          </Row>
        </Form>
        <Container className="mt-5">
          <Row className="pt-5 pb-3 mx-auto">
            <Col md={8} className="d-flex align-items-center justify-content-around  ">
              <h1 className="inter-800 mb-0">Resultado da busca por CEP:</h1>
            </Col>
            <Col md={4}>
              <img src={IconLocalz} alt="Icone ponteiro" />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="col-9 p-2 mx-auto bg-primary text-white text-center rounded-top-5">
            <Col className="d-flex justify-content-center align-items-center">
              <p className="p-1 fs-5 inter-800 mb-0">Lograduro/Nome</p>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <p className="fs-5 inter-800 mb-0">Bairro/Distrito</p>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <p className="fs-5 inter-800 mb-0">Localidade/UF</p>
            </Col>
          </Row>
          <Row className="col-9 mx-auto p-2 bg-white text-center rounded-bottom-5">
            <Col id="Logra" className="fs-5 inter-800 mb-0"></Col>
            <Col id="Bairro" className="fs-5 inter-800 mb-0"></Col>
            <Col id="UF" className="fs-5 inter-800 mb-0"></Col>
          </Row>
        </Container>
        <Container className="mt-5">
          <Row className="pt-5 pb-3 mx-auto">
            <Col md={8} className="d-flex align-items-center justify-content-around  ">
              <h1 className="inter-800 mb-0">Previsão do tempo na região:</h1>
            </Col>
            <Col md={4}>
              <img src={Cloud2} alt="Icone ponteiro" />
            </Col>
          </Row>
        </Container>
        <Container className="mb-5 p-0">
          <Row className="col-9 mx-auto p-2 bg-white text-center rounded-5">
            <Col className="p-2 d-flex justify-content-center align-items-center">
              <p id="RespPrev" className=" mb-0 fs-5 inter-800"></p>
            </Col>
          </Row>
        </Container>
      </Container>
    </Container>
  );
};

export default Dados;
