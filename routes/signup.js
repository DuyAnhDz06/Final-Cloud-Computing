const express = require("express");
const SignupModel = require("../models/SignupModel");
const router = express.Router();



//URL: localhost:3000/signup
//signup form
router.get("/", (req, res) => {
  SignupModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      //render ra trang index ở thư mục views/signup
      res.render("signup/index", { signup: data });
    }
  });
});
//login form
router.get("/login", (req, res) => {
  SignupModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      //render ra trang index ở thư mục views/signup
      res.render("signup/login", { signup: data });
    }
  });
});

//nhận & xử lý dữ liệu từ form ADD
router.post("/", (req, res) => {
  
  
  //Cách 1: dùng "save"
  // var admin = new adminModel(req.body)
  // admin.save((err) => {
  //     if (err) {
  //         console.log(err)
  //     } else {
  //         console.log("Add admin succeed !")
  //         res.redirect("/admin")
  //     }
  // })
  //Cách 2: dùng "create"
  SignupModel.create(req.body, (err) => {
    if (!err) {
    //   document.write('Signup succeed !');
      console.log('Signup succeed !')
      res.redirect("/toyshop/home");
    }
  });
});




module.exports = router;
