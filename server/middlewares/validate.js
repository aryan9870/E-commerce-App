const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.path[0],
      message: err.message.replace(/"/g, ""), // quotes hata diye
    }));

    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

export default validate;
