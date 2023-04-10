import { Button, Container, Col, Form, Row } from "react-bootstrap";
import AlertData from "./AlertData";
function Settings() {
  const handleSubmitConfig = (e) => e.preventDefault;

  return (
    <Container className="m-5">
      <Form id="form-config" method="POST" onSubmit={handleSubmitConfig}>
        <h3>Configuración:</h3>
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Título..."
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group controlId="formFileSm" as={Col} className="mb-3">
              <Form.Label>Imagen:</Form.Label>
              <Form.Control
                type="file"
                name="image"
                size="sm"
                accept="image/*"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="secondary" type="reset">
          Reset
        </Button>{" "}
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
}

export default Settings;
