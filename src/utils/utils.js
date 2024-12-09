const bcrypt = require("bcrypt");

const createHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const isValidPassword = async (password, user) => {
  //console.log(password, user.password);
  const valid = await bcrypt.compare(password, user.password)
  return valid;
};

const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ erro: "Unathorized" });
    }
    console.log(req.user.role, role);
    if (req.user.role !== role) {
      return res.status(403).json({ erro: "Not authorized" });
    }
    next();
  };
};

module.exports = {
  createHash,
  isValidPassword,
  authorization
};