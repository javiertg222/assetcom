import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import CardHome from "../components/CardHome";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Home() {
  const [loanding, setLoanding] = useState(true);
  const [estadisticas, setEstadisticas] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:3001/api/estadisticas")
        .then((res) => res.json())
        .then((data) => {
          setEstadisticas(data);
          setLoanding(false);
        })
        .catch((error) => console.log(error));
    }, 1000);
  }, []);

  if (loanding) {
    return (
      <Alert key="info" variant="info">
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Cargando...
      </Alert>
    );
  } else {
    //Datos para loas gráficas
    const options = {};
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
        title: "Usuarios",
        color: "info",
        counter: estadisticas[3].cant,
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
            {datos.map((dato, index) => (
              <Col key={index}>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={dato.title === "Usuarios" ? "/admin/users" : "assets"}
                >
                  <CardHome
                    data={{
                      title: dato.title,
                      color: dato.color,
                      counter: dato.counter,
                    }}
                  />
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
