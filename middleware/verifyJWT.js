const jwt = require("jsonwebtoken");

const verifyJWt = (req, res, next) => {
  const authHeader = req.headers.authorziation || req.headers.Authorziation;
  if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401); //didn't send a token with the req
  const token = authHeader.split("")[1];
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.UserInfo.username;
    next();
  });
};

module.exports = verifyJWt;
