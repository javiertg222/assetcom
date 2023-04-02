import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import AlertData from "./AlertData";
const paises = require("../data/paises.json");
const arbol = require("../data/ccaa-provincias-poblaciones.json");
const roles = require("../data/roles.json");

function UserForm() {
  //Constante estado para todos los usuarios
  const [users, setUsers] = useState([]);
  /**Constante estado para los datos del usuario a modificar.
   Recupero con el hook useLocation el usuario enviado con useNavigate 
   */
  const { state } = useLocation();
  const [alerta, setAlerta] = useState(null);

  //VALIDACIONES
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const [datos, setDatos] = useState({
    onename: "",
    nick: "",
    email: "",
    password: "",
    rol: "",
    address: "",
    ciudad: "",
    provincia: "",
    pais: "",
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
   * Función para obtener todos los usuarios de la BBDD
   */
  function getUsers() {
    fetch("http://localhost:3001/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getUsers();
  }, []);

  /**
   * Función para saber si está repetido el email de un usuario
   * @param {*} email
   * @returns true o flase
   */

  function findEmail(email) {
    const user = users.find((user) => user.email_user === email);
    if (user) {
      return true;
    }
  }
  /**
   * Función para manejar el envio del formulario
   * @param {*} datos
   * @param {*} e
   * @returns
   */
  function handleSubmitUser(datos, e) {
    //Previene al navegador recargar la página
    e.preventDefault();

    // LEER DATOS DEL FORMULARIO

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    //Variables para modificar los parámetros del fetch según sea crear/modificar usuario
    let url = "";
    let metodo = "";

    if (state != null) {
      url = `http://localhost:3001/api/user/update/${state.userData.id_user}`;
      metodo = "PUT";
    } else {
      if (!findEmail(datos.email)) {
        url = "http://localhost:3001/api/user";
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
    <>
      <Container className="m-5">
        {alerta
          ? AlertData(
              `Usuario ${
                state == null ? "añadido" : "modificado"
              } correctamente!`,
              "success"
            )
          : null}

        <Form
          id="form-user"
          method="POST"
          onSubmit={handleSubmit(handleSubmitUser)}
        >
          <h3>{state == null ? "Crear" : "Modificar"} Usuario:</h3>
          <Row className="mb-6">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                name="onename"
                placeholder="Enter name"
                defaultValue={state != null ? state.userData.name_user : ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridNickName">
              <Form.Label>Apodo</Form.Label>
              <Form.Control
                type="text"
                name="nick"
                placeholder="Nick Name"
                defaultValue={state != null ? state.userData.nickname_user : ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={state != null ? state.userData.email_user : ""}
                onChange={handleInputChange}
                required
              />
              <span className="text-danger text-small d-block mb-2">
                {findEmail(datos.email)
                  ? "Ya existe un usuario con este email"
                  : ""}
              </span>
            </Form.Group>
            {state == null ? (
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  defaultValue={
                    state != null ? state.userData.password_user : ""
                  }
                  onChange={handleInputChange}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password es requerido",
                    },
                    maxLength: {
                      value: 30,
                      message: "No puede contener más de 30 caracteres",
                    },
                    minLength: {
                      value: 8,
                      message: "Mínimo 8 carácteres",
                    },

                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&][^'\s]/g,
                      message: "Debe contener mayús. min. dígitos y @$!%*?&",
                    },
                  })}
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.password && errors.password.message}
                </span>
              </Form.Group>
            ) : (
              ""
            )}
            <Form.Group as={Col} controlId="formGridRol">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                name="rol"
                defaultValue={state != null ? state.userData.name_rol : ""}
                onChange={handleInputChange}
              >
                {roles.map((rol) => (
                  <option>{rol}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="formGridAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                name="address"
                placeholder="Calle..."
                defaultValue={state != null ? state.userData.address_user : ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Ciudad</Form.Label>

              <Form.Select
                name="ciudad"
                defaultValue={state != null ? state.userData.ciudad_user : "Narón"}
                onChange={handleInputChange}
                required
              >
                {arbol.map((provincias) =>
                  provincias.provinces.map((provinces) =>
                    (state == null ? datos.provincia : state.userData.prov_user) === provinces.label
                      ? provinces.towns.map((towns) => (
                          <option>{towns.label}</option>
                        ))
                   :null
                  )
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridProvincia">
              <Form.Label>Provincia</Form.Label>
              <Form.Select
                name="provincia"
                defaultValue={state != null ? state.userData.prov_user : "Coruña, A"}
                onChange={handleInputChange}
              >
                {arbol.map((provincias) =>
                  provincias.provinces.map((towns) => (
                    <option>{towns.label}</option>
                  ))
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>País</Form.Label>

              <Form.Select
                name="pais"
                defaultValue={state != null ? state.userData.pais_user : "Spain"}
                onChange={handleInputChange}
              >
                {paises.map((pais) => (
                  <option>{pais.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <Button variant="secondary" type="reset" onClick={() => reset()}>
            Reset
          </Button>{" "}
          <Button variant="primary" type="submit">
            {state == null ? "Crear" : "Modificar"}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default UserForm;
