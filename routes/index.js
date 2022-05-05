const express = require('express');
const router = express.Router(); // TODO: Research præcist hvad express.Router() gør.
const queryController = require('../controllers/queryController');

let cart;

// GET all products.
router.get('/', async function (req, res) {
    
    // Check if there's items in the cart.
    if (req.session.cart) {
        cart = req.session.cart;
    } else {
        req.session.cart = [];
    }

    const products = await queryController.handleQuery('SELECT id, name, description, price, unit FROM products');

    res.render('index', {
        title: 'Byggemarked Produkter',
        products: products,
        product: '',
        cart: cart,
        relatedProducts: ''
    });
});

// GET one product to show its needed and related products.
router.get('/produkt/:id', async function (req, res) {

    if (req.session.cart) {
        cart = req.session.cart;
    }

    const product = await queryController.handleQuery(`SELECT id, name, description, price, unit FROM products WHERE id=${req.params.id}`);
    let neededProducts = await queryController.handleQuery(`SELECT id, name, description, price, unit FROM products WHERE id !=${req.params.id}`);
    const relatedProducts = await queryController.handleQuery(`SELECT id, name, description, price, unit FROM products WHERE id !=${req.params.id}`);;
    
    neededProducts = neededProducts.filter(({ id }) => !cart.some((e) => e.id === id));
    // Source: https://www.reddit.com/r/learnjavascript/comments/siphq1/compare_two_arrays_with_objects_and_remove/
    
    cart.push(product[0]);

    res.render('index', {
        title: 'Byggemarked Produkter',
        products: neededProducts,
        product: product[0],
        cart: cart,
        relatedProducts: relatedProducts
    });
});

module.exports = router;