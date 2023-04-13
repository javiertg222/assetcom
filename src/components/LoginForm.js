import { Alert, Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import renderErrorMessage from "../utils-client/renderErrorMessage";

function FormLogin() {
  //Estado para abrir/cerrar la ventana modal
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  const [users, setUsers] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const errors = {
    email: "Invalid email",
    pass: "Invalid password",
  };

  const handleSubmit = (e) => {
    //Previene al navegador recargar la página
    e.preventDefault();

    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
    // LEER DATOS DEL FORMULARIO

    // const form = e.target;
    // const formData = new FormData(form);
    // const formJson = Object.fromEntries(formData.entries());
    //Encontrar el usuario en la BBDD
    //const user = users.find((user) => user.email_user === formJson.email);
    // Comparamos la información de usuario
  //   if (user) {
  //     if (bcrypt.compare(formJson.pass, user.password_user)) {
  //       // Password inválido
  //       setErrorMessages({ name: "pass", message: errors.pass });
  //     } else {
  //       setIsSubmitted(true);
  //     }
  //   } else {
  //     // Usuario no encontrado
  //     setErrorMessages({ name: "email", message: errors.email });
  //   }
   };

  const renderForm = (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          required
        />
        <Form.Text className="text-muted">
          No compartas este email con nadie.
        </Form.Text>
        <br />
        {renderErrorMessage("email", errorMessages)}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="pass"
          placeholder="Password"
          required
        />
        {renderErrorMessage("pass", errorMessages)}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Recordarme" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Acceder
      </Button>
    </Form>
  );

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSubmitted ? (
            <Alert key="success" variant="success">
              Login correcto.
            </Alert>
          ) : (
            renderForm
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FormLogin;
