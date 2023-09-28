const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../errors/index");

const AuthenicationMiddleware = async (req, res, next) => {
  // console.log(req.headers);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("No token Provide!");
  }

  const token = authHeader.split(" ")[1];
  // console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const { id, username } = decoded;
    req.user = { id, username };

    next();
  } catch (error) {
    throw new UnAuthenticatedError("No Authorized to access the route!");
  }
};

module.exports = AuthenicationMiddleware;
