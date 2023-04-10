import Card from "react-bootstrap/Card";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import users from "../imagenes/users.svg";
import settings from "../imagenes/settings.svg";

function Cards() {
  return (
    <>
      <Container className="m-6" fluid>
        <Row xs={1} md={3} className="m-3">
          <Col>
            <Card>
              <Link to="users">
                <Card.Img
                  className="m-2"
                  variant="top"
                  src={users}
                  style={{ height: "5rem" }}
                />
              </Link>
              <Card.Body>
                <Card.Title>Usuarios</Card.Title>
                <Card.Text>Espacio para administrar los usuarios.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Link to="settings">
                <Card.Img
                  className="m-2"
                  variant="top"
                  src={settings}
                  style={{ height: "5rem" }}
                />
              </Link>
              <Card.Body>
                <Card.Title>Configuración</Card.Title>
                <Card.Text>Espacio para configurar la aplicación.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Cards;
