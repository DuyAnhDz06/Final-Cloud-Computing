const express = require('express')
const toyshopModel = require('../models/ToyModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    ToyModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/toyshop')
    })
})



//URL: localhost:3000/toyshop
router.get('/', (req, res) => {
    toyshopModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/toyshop
            res.render('toyshop/index', { toyshop: data })
        }
    })
})


router.get('/delete/:id', (req, res) => {
    toyshopModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete toyshop succeed !");
            //var message = "Delete toyshop succeed !";
            //redirect về trang /toyshop (URL không phải view)
            res.redirect("/toyshop");
        }
    })
})
//Not Found 404 ok
router.get('/notfound', (req, res) => {
    res.render("toyshop/notfound");
})
//Order pizza coffee trứng thêm ly machiato
router.get('/order', (req, res) => {
    res.render("toyshop/order");
})


//render ra form ADD
router.get('/add', (req, res) => {
    res.render("toyshop/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    //Cách 1: dùng "save"
    // var toyshop = new toyshopModel(req.body)
    // toyshop.save((err) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Add toyshop succeed !")
    //         res.redirect("/toyshop")
    //     }
    // })
    //Cách 2: dùng "create"
    toyshopModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add toyshop succeed !')
            res.redirect("/toyshop")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    toyshopModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/toyshop)
            //gửi kèm dữ liệu của object toyshop để load vào form edit
            //toyshop (tên) , data (dữ liệu)
            res.render("toyshop/update", { toyshop: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var toyshop = req.body;
    toyshopModel.findByIdAndUpdate(id, toyshop, (err) => {
        if (!err) {
            console.log("Update toyshop succeed !")
            res.redirect("/toyshop")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    toyshopModel.findById(req.params.id, (err, toyshop) => {
        if (!err) {
            res.render('toyshop/info', { toyshop: toyshop })
        }
    })
})

//search function
router.post('/search', (req, res) => {
    toyshopModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('toyshop/index', { toyshop: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    toyshopModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('toyshop/index', { toyshop: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    toyshopModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('toyshop/index', { toyshop: data })
            }
        })
})

//List
router.get('/list', (req, res) => {
    toyshopModel.find((err, data) => {
        if (!err) {
            res.render('toyshop/list', { toyshop: data, })
        }
    })
})
//HOme Page Customer
router.get('/home', (req, res) => {
    toyshopModel.find((err, data) => {
        if (!err) {
            res.render('toyshop/home', { toyshop: data, })
        }
    })
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/order', (req, res) => {
    //Cách 1: dùng "save"
    // var toyshop = new toyshopModel(req.body)
    // toyshop.save((err) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Add toyshop succeed !")
    //         res.redirect("/toyshop")
    //     }
    // })
    //Cách 2: dùng "create"
    toyshopModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add your product succeed !')
            res.redirect("/toyshop/order")
        }
    })
})


module.exports = router