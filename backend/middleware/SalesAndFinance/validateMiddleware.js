// middlewares/validateMiddleware.js
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    console.log("Validation successful");
    next();
  };
};

module.exports = { validate };
