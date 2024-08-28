const express = require("express");

const sessionRouter = express.Router();

const auth = (req, res, next) => {
  if (req.session?.admin) {
    return next();
  }
  res.send("Não autorizado");
};

sessionRouter.get("/admin", auth, (req, res) => {
  return res.send("Admin");
});

sessionRouter.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send('Bem vindo(a) de volta!')
  } else {
    req.session.views = 1;
    res.send("Bem vindo(a) ao site!")
  }
})

sessionRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err)
      res.clearCookie("connect.sid").render("login");
    else res.send({ status: "Erro ao efetuar logout", body: err });
  });
});

module.exports = sessionRouter;