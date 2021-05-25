const express = require('express')
const router = express.Router()
const {Product, Category} = require('../models')


router.get('/', (req, res, next) => {
    // if(req.query){
        //Debería buscar en Category
    //     Product.findAll({
    //         where: {
    //             category: req.query.category
    //         }
    //     }).then((data) => {
    //         res.status(200).json(data)
    //     })
    // }
    Product.findAll().then((data) => {
        res.status(200).json(data)
    })
})

router.get('/:id', (req, res, next) => {
    Product.findOne({
        where: {
            id: req.params.id
        }
    }).then((data) => {
        res.status(200).json(data)
    })
})

router.post('/add', (req, res, next) => {
    const {name, price, description, available, stock} = req.body
    Product.create({
        name, price, description, available, stock
    }).then((productoCreado) => {
        res.status(200).json(productoCreado)
    }).then((data) => {
        res.status(201).json(data)
    })
})

router.put('/:id', (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, reqx.body, (err, post) => {
        if(err) return next(err)
        res.json(post)
    })
})

router.delete('/:id', (req, res, next) => {
    Product.Remove({
        id: req.params.id
    }, (err, post) => {
        if(err) return next(err)
        res.send('Deleted successfully')
    })
})

module.exports = router;