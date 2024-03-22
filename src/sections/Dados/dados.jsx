import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./index.css";
import Button from "react-bootstrap/Button";
import Cloud2 from "../../assets/cloud2.svg";
import IconLocalz from "../../assets/IconLocalz.svg";

const Dados = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [cepResponse, setCepResponse] = useState({});
  const [localResponse, setLocalResponse] = useState();
  const [validated, setValidated] = useState(false);

  const Validar = async (event) => {
    const form = event.target;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      event.preventDefault();
    } else {
      event.preventDefault();

      await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then(async (data) => {
          setCepResponse(data);
          await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`)
            .then((dadosMeteo) => dadosMeteo.json())
            .then((dataMeteo) => setLocalResponse(dataMeteo));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setValidated(true);
  };

  return (
    <Container fluid>
      <Container>
        <Form
          noValidate
          validated={validated}
          onSubmit={Validar}
          className="col-6 mx-auto bg-light rounded-4 mt-5 p-4 pb-2 bg-white"
        >
          <Row className="m-0 p-5">
            <Form.Group className="mt-3">
              <Form.Label className="inter-400 fs-5 text-body">Primeiro Nome:</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="nome"
                placeholder="Insira seu primeiro nome:"
                className="bg-light border-0 opacity-75 inter-400"
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label className="inter-400">E-mail:</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Insira seu e-mail"
                className="bg-light border-0 opacity-75 inter-400"
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label className="inter-400">Digite o CEP:</Form.Label>
              <Form.Control
                pattern="[0-9]{8}"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
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
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    type="text"
                    id="lat"
                    placeholder="Latitude"
                    className="bg-light border-0 opacity-75 inter-400"
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    value={long}
                    onChange={(e) => setLong(e.target.value)}
                    type="text"
                    id="long"
                    placeholder="Longitude"
                    className="bg-light border-0 opacity-75 inter-400"
                    required
                  />
                </Col>
              </Row>
            </Form.Group>
            <Button className=" shadow p-0" id="botao" type="submit">
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
          {cepResponse ? (
            <Row className="col-9 mx-auto p-3 bg-white text-center rounded-bottom-5">
              <Col className="inter-800 mb-0">{cepResponse.logradouro}</Col>
              <Col className="inter-800 mb-0">{cepResponse.bairro}</Col>
              <Col className="inter-800 mb-0">{cepResponse.uf}</Col>
            </Row>
          ) : (
            console.log("Falta o cep")
          )}
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
            {localResponse ? (
              <Col className="d-flex align-items-center justify-content-around p-2 ">
                <p className="inter-800 mb-0">
                  Previsão de tempo de acordo com a região: {localResponse.hourly.temperature_2m[0]}Cº
                </p>
              </Col>
            ) : (
              ""
            )}
          </Row>
        </Container>
      </Container>
    </Container>
  );
};

export default Dados;
