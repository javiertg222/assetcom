import { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AlertData from "./AlertData";
import { FaBarcode } from "react-icons/fa";

function AssetsList() {
  //Constante estado para enviar los datos de un activo al formulario para modificar
  const navigate = useNavigate();
  //Constante estado para todos los activo
  //const [asset, setAsset] = useState([]);
  const [assets, setAssets] = useState([]);

  /**
   * Obtener los activos de la api para mostrarlos en la tabla
   */

  function listAssets() {
    fetch("http://localhost:3001/api/assets")
      .then((res) => res.json())
      .then((data) => setAssets(data))
      .catch((error) => console.log(error));
  }
  /**
   * Borrar usuarios
   * @param {*} id
   */
  function deleteAsset(id) {
    fetch(`http://localhost:3001/api/asset/delete/${id}`, { method: "DELETE" })
      .then((res) => {
        res.json();
        listAssets();
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    listAssets();
  }, []);
  return (
    <>
      <Container className="m-6" fluid>
        <Button className="m-3" as={Link} to="/assets/form" variant="primary">
          Nuevo Activo
        </Button>
        <Table hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Nº Serie</th>
              <th>Estado</th>
              <th>Localización</th>
              <th>Fecha Creación/Modificación</th>
              <th>Código de Barras</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!assets ? (
              <tr>
                <td>{AlertData("No hay activos para mostrar.", "warning")}</td>
              </tr>
            ) : (
              assets.map((asset) => (
                <>
                  <tr key={asset.id_asset}>
                    <td>{asset.id_asset}</td>
                    <td>{asset.image}</td>
                    <td>{asset.name_asset}</td>
                    <td>{asset.serial_number}</td>
                    <td>{asset.status}</td>
                    <td>{asset.location}</td>
                    <td>{asset.fecha}</td>
                    <td>
                      <Button
                        variant="light"
                        onClick={() =>
                          navigate("/barcode", {
                            state: { assetData: asset.serial_number },
                          })
                        }
                      >
                        <FaBarcode size={"2.8em"} />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outline-success"
                        /**
                        Con el Hook usenavigate podemos pasar a una ruta un segundo parámetro como objeto.
                        En este caso paso los datos de un usuario según la fila de usuario.
                        */
                        onClick={() =>
                          navigate("/assets/form", {
                            state: { assetData: asset },
                          })
                        }
                      >
                        Modificar
                      </Button>{" "}
                      <Button
                        onClick={() => deleteAsset(asset.id_asset)}
                        variant="outline-danger"
                      >
                        Borrar
                      </Button>
                    </td>
                  </tr>
                </>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default AssetsList;
