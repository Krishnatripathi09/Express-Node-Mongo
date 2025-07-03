const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  let token;

  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Un-Authorized! Please Log-In Again" });
    }
    try {
      const decodedMsg = jwt.verify(token, "MySecretToken#$6789");
      req.user = decodedMsg;

      next();
    } catch (err) {
      res.status(400).json({ Error: err });
    }
  }
};

module.exports = {
  adminAuth,
};
