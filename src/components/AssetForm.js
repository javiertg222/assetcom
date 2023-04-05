import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import AlertData from "./AlertData";
const statuses = require("../data/status.json");
const locations = require("../data/location.json");

function AssetForm() {
  //Constante estado para todos los activos
  const [assets, setAssets] = useState([]);
  /**Constante estado para los datos del activo a modificar.
   Recupero con el hook useLocation el activo enviado con useNavigate 
   */
  const { state } = useLocation();
  const [alerta, setAlerta] = useState(null);

  //VALIDACIONES
  const { reset } = useForm({ mode: "onChange" });
  const [datos, setDatos] = useState({
    assetname: "",
    serialnumber: "",
    status: "",
    location: "",
    image: "",
  });

  /**
   * Recoge los datos del evento onChange del formulario
   * @param {*} e
   */
  const handleInputChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Función para obtener todos los activos de la BBDD
   */
  function getAssets() {
    fetch("http://localhost:3001/api/assets")
      .then((res) => res.json())
      .then((data) => setAssets(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getAssets();
  }, []);

  /**
   * Función para saber si está repetido el serial number  de un asset
   * @param {*} serialnumber
   * @returns true o flase
   */

  function findAsset(serialnumber) {
    const asset = assets.find((asset) => asset.serial_number === serialnumber);
    if (asset) {
      return true;
    }
  }
  /**
   * Función para manejar el envio del formulario
   * @param {*} e
   * @returns
   */
  function handleSubmitAsset(e) {
    //Previene al navegador recargar la página
    e.preventDefault();

    // LEER DATOS DEL FORMULARIO

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    //Variables para modificar los parámetros del fetch según sea crear/modificar activos
    let url = "";
    let metodo = "";

    if (state != null) {
      url = `http://localhost:3001/api/asset/update/${state.assetData.id_asset}`;
      metodo = "PUT";
    } else {
      if (!findAsset(datos.serialnumber)) {
        url = "http://localhost:3001/api/asset";
        metodo = "POST";
      } else {
        return;
      }
    }

    // Se pasa formJson en el cuerpo directamente:

    fetch(url, {
      method: metodo,
      body: JSON.stringify(formJson),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setAlerta(true);
        }
      })
      .catch((error) => console.error(error));

    // Limpiar campos
    e.target.reset();
  }

  return (
    <Container className="m-5">
      {alerta
        ? AlertData(
            `Asset ${state == null ? "añadido" : "modificado"} correctamente!`,
            "success"
          )
        : null}
      <Form
        id="form-asset"
        method="POST"
        onSubmit={handleSubmitAsset}
      >
        <h3>{state == null ? "Crear" : "Modificar"} Activo:</h3>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAssetName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="assetname"
              placeholder="Name"
              defaultValue={state != null ? state.assetData.name_asset : ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridSerialNumber">
            <Form.Label>Nº de Serie</Form.Label>
            <Form.Control
              type="text"
              name="serialnumber"
              placeholder="Serial Number"
              defaultValue={state != null ? state.assetData.serial_number : ""}
              onChange={handleInputChange}
              required
            />
            <span className="text-danger text-small d-block mb-2">
              {findAsset(datos.serialnumber)
                ? "Ya existe un asset con este serial number"
                : ""}
            </span>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridStatus">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              id="status"
              name="status"
              aria-label="Default select example"
              defaultValue={state != null ? state.assetData.status : ""}
              onChange={handleInputChange}
            >
              {statuses.map((status) => (
                <option value={status}>{status}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLocation">
            <Form.Label>Localización</Form.Label>
            <Form.Select
              id="location"
              name="location"
              aria-label="Default select example"
              defaultValue={state != null ? state.assetData.location : ""}
              onChange={handleInputChange}
            >
              {locations.map((location) => (
                <option value={location}>{location}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Form.Group controlId="formFileSm" as={Col} className="mb-3">
          <Form.Label>Seleccione un archivo</Form.Label>
          <Form.Control
            type="file"
            name="image"
            size="sm"
            accept="image/*"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="secondary" type="reset" onClick={() => reset()}>
          Reset
        </Button>{" "}
        <Button variant="primary" type="submit">
          {state == null ? "Crear" : "Modificar"}
        </Button>
      </Form>
    </Container>
  );
}

export default AssetForm;
