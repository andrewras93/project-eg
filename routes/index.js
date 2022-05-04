const express = require('express');
const router = express.Router(); // TODO: Research præcist hvad express.Router() gør.
const queryController = require('../controllers/queryController');

// GET all products.
router.get('/', async function (req, res) {
    const products = await queryController.handleQuery('SELECT id, name, description, price, unit FROM products');

    res.render('index', {
        title: 'Byggemarked Produkter',
        products: products,
        product: ''
    });
});

// GET one product to show its needed and related products.
router.get('/produkt/:id', async function (req, res) {
    const product = await queryController.handleQuery(`SELECT id, name, description, price, unit FROM products WHERE id=${req.params.id}`);
    const neededProducts = await queryController.handleQuery(`SELECT id, name, description, price, unit FROM products WHERE id !=${req.params.id}`);
    // const relatedProducts = '';

    res.render('index', {
        title: 'Byggemarked Produkter',
        products: neededProducts,
        product: product[0]
    });
});

module.exports = router;