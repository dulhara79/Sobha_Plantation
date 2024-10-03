const jwt = require("jsonwebtoken");

exports.protect = (roles) => {
  return (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    } catch (err) {
      res.status(401).json({ message: "Token is not valid" });
    }
  };
};
