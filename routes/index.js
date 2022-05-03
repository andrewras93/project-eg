const express = require('express');
const router = express.Router(); // TODO: Research præcist hvad express.Router() gør.

router.get('/', async function (req, res) {
    res.send('Hello, World!');
});

module.exports = router;
  