import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ChangePass() {
  return (
    <>
      <Container className="m-6">
        <h3>Cambiar la contraseña:</h3>
        <Row>
          <Col sm={4}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPasswordOld">
                <Form.Label>Contraseña actual</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPasswordNew">
                <Form.Label>Contraseña nueva</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPasswordNewRepeat"
              >
                <Form.Label>Repita la contraseña nueva</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col sm={8}>sm=8</Col>
        </Row>
      </Container>
    </>
  );
}

export default ChangePass;
