const express = require('express')
const adminModel = require('../models/adminModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    adminModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/admin')
    })
})



//URL: localhost:3000/admin
router.get('/', (req, res) => {
    adminModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/admin
            res.render('admin/index', { admin: data })
        }
    })
})


router.get('/delete/:id', (req, res) => {
    adminModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete admin succeed !");
            //var message = "Delete admin succeed !";
            //redirect về trang /admin (URL không phải view)
            res.redirect("/admin");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("admin/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
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
    adminModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add admin succeed !')
            res.redirect("/admin")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    adminModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/admin)
            //gửi kèm dữ liệu của object admin để load vào form edit
            //admin (tên) , data (dữ liệu)
            res.render("admin/update", { admin: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var admin = req.body;
    adminModel.findByIdAndUpdate(id, admin, (err) => {
        if (!err) {
            console.log("Update admin succeed !")
            res.redirect("/admin")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    adminModel.findById(req.params.id, (err, admin) => {
        if (!err) {
            res.render('admin/info', { admin: admin })
        }
    })
})

//search function
router.post('/search', (req, res) => {
    adminModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('admin/index', { admin: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    adminModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('admin/index', { admin: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    adminModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('admin/index', { admin: data })
            }
        })
})

module.exports = router