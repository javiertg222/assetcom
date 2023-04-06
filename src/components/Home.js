import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, Container, Row, Col } from "react-bootstrap";
import CardHome from "../components/CardHome";
import { useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Home() {
  const options = {};

  const [estadisticas, setEstadisticas] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/estadisticas")
      .then((res) => res.json())
      .then((data) => setEstadisticas(data))
      .catch((error) => console.log(error));
  }, []);

  //console.log(estadisticas);
  const dataDonuts = {
    labels: ["Baja", "Alta", "Pendientes"],
    datasets: [
      {
        label: ["Assets"],
        data: [
          estadisticas[1].cant,
          estadisticas[0].cant,
          estadisticas[2].cant,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const datos = [
    {
      title: "Usarios",
      color: "info",
      counter: estadisticas[3].total,
    },
    {
      title: "Activos",
      color: "success",
      counter: estadisticas[0].total,
    },
  ];
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
                  <Doughnut data={dataDonuts} options={options} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {datos.map((dato) => (
            <Col>
              <CardHome
                datos={{
                  title: dato.title,
                  color: dato.color,
                  counter: dato.counter,
                }}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
