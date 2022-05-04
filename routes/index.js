const express = require('express');
const router = express.Router(); // TODO: Research præcist hvad express.Router() gør.
const queryController = require('../controllers/queryController');

// Get all products.
router.get('/', async function (req, res) {
    const products = await queryController.handleQuery('SELECT * FROM products');
    console.log(products);

    res.render('index', {
        title: 'Alle Produkter',
        products: products
    });
});

module.exports = router;
