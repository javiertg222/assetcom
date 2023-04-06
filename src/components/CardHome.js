import { Card } from "react-bootstrap";

function CardHome(props) {
  const estilos = {
    title: {
      textAlign: "center",
      fontSize: "1.5rem",
    },
    counter: {

        textAlign: "center",
        fontSize: "5rem",

    },
  };
  return (
    <Card style={{ width: "20rem" }} bg={props.datos.color}>
      <Card.Body>
        <Card.Title style={estilos.title}>{props.datos.title}</Card.Title>
        <Card.Text style={estilos.counter}>{props.datos.counter}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardHome;
