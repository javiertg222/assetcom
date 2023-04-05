import { Card } from "react-bootstrap";

function CardHome(props) {
  return (
    <Card style={{ width: "20rem" }} bg={props.datos.color}>
      <Card.Body>
        <Card.Title>{props.datos.title}</Card.Title>
        <Card.Text>{props.datos.counter}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardHome;
