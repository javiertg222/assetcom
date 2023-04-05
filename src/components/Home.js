import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, Container, Row, Col } from "react-bootstrap";
import CardHome from "../components/CardHome";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const data = {
  labels: ["Baja", "Alta", "Pendientes"],
  datasets: [
    {
      label: ["Assets"],
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const options = {};

function Home() {
  return (
    <>
      <Container className="m-5">
        <Row>
          <Col>
            <Card style={{ width: "20rem" }}>
              <Card.Body>
                <Card.Title>Activos</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Activos en la empresa
                </Card.Subtitle>
                <Card.Text>
                  <Doughnut data={data} options={options} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <CardHome
              datos={{ title: "Activos", color: "info", counter: 5 }}
            />
          </Col>
          <Col>
            <CardHome
              datos={{ title: "Usuarios", color: "success", counter: 6 }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
