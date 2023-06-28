const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const bcrypt = require("bcrypt");

router.get("/", function (req, res, next) {
  const isAuth = req.isAuthenticated();
  res.render("signup", {
    title: "Sign up",
    isAuth,
  });
});

router.post("/", function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const repassword = req.body.repassword;
  const isAuth = req.isAuthenticated();

  knex("users")
    .where({ name: username })
    .select("*")
    .then(async function (result) {
      if (result.length !== 0) {
        res.render("signup", {
          title: "Sign up",
          isAuth,
          errorMessage: ["this username is already used"],
        });
      } else if (password === repassword) {
        const hashedPassword = await bcrypt.hash(password, 10);
        knex("users")
          .insert({ name: username, password: hashedPassword })
          .then(function () {
            res.redirect("/");
          })
          .catch(function (err) {
            console.error(err);
            res.render("signup", {
              title: "Sign up",
              errorMessage: [err.sqlMessage],
              isAuth,
            });
          });
      } else {
        res.render("signup", {
          title: "Sign up",
          errorMessage: ["password incorrect"],
        });
      }
    })
    .catch(function (err) {
      console.error(err);
      res.render("signup", {
        title: "Sign up",
        errorMessage: [err.sqlMessage],
        isAuth,
      });
    });
});

module.exports = router;
