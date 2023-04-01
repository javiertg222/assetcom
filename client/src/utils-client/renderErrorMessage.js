/**
 * Función para mostrar errores
 * @param {*} name 
 * @param {*} errorMessages 
 * @returns 
 */
 const renderErrorMessage = (name, errorMessages) =>
 name === errorMessages.name && (
   <span style={{ color: "red" }}>{errorMessages.message}</span>
 );

 export default renderErrorMessage;