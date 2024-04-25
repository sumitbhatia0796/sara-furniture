const bcrypt = require('bcrypt');

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: "Token is not valid",
    });
  }
};

exports.hasPass = async (password, next) => {
const res = await bcrypt.hash(password, 10);
return res;
};

exports.compare = async (userPass, hasPass) => {
  const res = await bcrypt.compare(userPass, hasPass);
  return res;
  };
  
