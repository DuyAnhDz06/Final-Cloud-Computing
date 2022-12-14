const express = require("express");
const UserModel = require("../models/UserModel");
const router = express.Router();

router.get("/drop", (req, res) => {
  UserModel.deleteMany({}, () => {
    console.log("Delete all data succeed !");
    res.redirect("/user");
  });
});

//URL: localhost:3000/user
router.get("/", (req, res) => {
  UserModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      //render ra trang index ở thư mục views/user
      res.render("user/index", { user: data });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  UserModel.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Delete user succeed !");
      //var message = "Delete user succeed !";
      //redirect về trang /user (URL không phải view)
      res.redirect("/user");
    }
  });
});

//render ra form ADD
router.get("/add", (req, res) => {
  res.render("user/new");
});

//nhận & xử lý dữ liệu từ form ADD
router.post("/add", (req, res) => {
  //Cách 1: dùng "save"
  // var user = new UserModel(req.body)
  // user.save((err) => {
  //     if (err) {
  //         console.log(err)
  //     } else {
  //         console.log("Add user succeed !")
  //         res.redirect("/user")
  //     }
  // })
  //Cách 2: dùng "create"
  UserModel.create(req.body, (err) => {
    if (!err) {
      console.log("Add user succeed !");
      res.redirect("/user");
    }
  });
});

//render ra form EDIT
router.get("/edit/:id", (req, res) => {
  UserModel.findById(req.params.id, (err, data) => {
    if (!err) {
      //render ra file: update.hbs (trong thư mục views/user)
      //gửi kèm dữ liệu của object user để load vào form edit
      //user (tên) , data (dữ liệu)
      res.render("user/update", { user: data });
    }
  });
});

//nhận & xử lý dữ liệu từ form EDIT
router.post("/edit/:id", (req, res) => {
  var id = req.params.id;
  var user = req.body;
  UserModel.findByIdAndUpdate(id, user, (err) => {
    if (!err) {
      console.log("Update user succeed !");
      res.redirect("/user");
    }
  });
});

router.get("/detail/:id", (req, res) => {
  UserModel.findById(req.params.id, (err, user) => {
    if (!err) {
      res.render("user/info", { user: user });
    }
  });
});

//search function
router.post("/search", (req, res) => {
  UserModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
    if (!err) {
      res.render("user/index", { user: data });
    }
  });
});
//sort function
router.get("/sort/asc", (req, res) => {
  UserModel
    .find()
    .sort({ name: 1 })
    .exec((err, data) => {
      if (!err) {
        res.render("user/index", { user: data });
      }
    });
});

router.get("/sort/desc", (req, res) => {
  UserModel
    .find()
    .sort({ name: -1 })
    .exec((err, data) => {
      if (!err) {
        res.render("user/index", { user: data });
      }
    });
});

router.get("/login", (req, res) => {
  UserModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      //render ra trang index ở thư mục views/user
      res.render("user/login", { user: data });
    }
  });
});

module.exports = router;
