export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    //Recorrido del diccionario para mostrar de una forma mas amigable los errores
    return res
      .status(400)
      .json(error.errors.map((error) => error.message));
  }
};
