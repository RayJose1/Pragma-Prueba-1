const validations = (values) => {
  const errors = {};

  if (!values.nombre) {
    errors.nombre = "El nombre es obligatorio";
  }
  if (!values.rut) {
    errors.rut = "El RUT es obligatorio";
  }
  if (values.correo && !/\S+@\S+\.\S+/.test(values.correo)) { 
    errors.correo = "Correo inválido"; // Valida solo si el usuario ingresa un correo
  }
  if (!values.fechaNacimiento) {
    errors.fechaNacimiento = "La fecha de nacimiento es obligatoria";
  }

  return errors;
}

export default validations;

