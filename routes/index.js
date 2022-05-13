const express = require("express");
const router = express.Router(); // TODO: Research præcist hvad express.Router() gør.
const queryController = require("../controllers/queryController");
const bcrypt = require("bcrypt");
const { response } = require("express");

let cart;
let users = [];

// GET all products.
router.get("/", async function (req, res) {
  // Check if there's items in the cart.
  if (req.session.cart) {
    cart = req.session.cart;
  } else {
    req.session.cart = [];
  }

  const products = await queryController.handleQuery(
    "SELECT id, name, description, price, unit FROM products"
  );

  res.render("index", {
    title: "Byggemarked Produkter",
    products: products,
    product: "",
    cart: cart,
    relatedProducts: "",
  });
});

// Login routers
router.get("/users", async function (req, res) {
  const users = await queryController.handleQuery("SELECT * FROM users");
  res.render("users", {
    title: "Brugere",
    users: users,
  });
  res.json(users);
});

router.get("/signup", async function (req, res) {
  res.render("signup", {
    title: "Signup",
  });
});

router.post("/signupCheck", async function (req, res) {
  try {
    const uname = req.body.username;
    const hashedPass = bcrypt.hashSync(req.body.password, 10);

    // Insert users into db
    const user = await queryController.handleQuery(
      `INSERT INTO users (user, password) VALUES ("${uname}","${hashedPass}")`
    );

    if (user) {
      res.redirect("/login");
    }
  } catch {
    res.render("signup", {
      title: "Signup",
      errorMsg: "Username already exists",
    });
  }
  // console.log(users);
});

router.get("/login", async function (req, res) {
  res.render("login", {
    title: "Login",
  });
});

router.post("/loginCheck", async function (req, res) {
  const uname = req.body.username;
  const password = req.body.password;

  if (uname && password) {
    const hashedPass = await queryController.handleQuery(
      `SELECT password FROM users WHERE user="${uname}"`
    );
    const pw = hashedPass[0]["password"];
    const verified = bcrypt.compareSync(password, pw);

    if (verified) {
      res.redirect("/");
    } else {
      res.render("login", {
        title: "Login",
        errorMsg: "Forkert email eller kode",
      });
    }
  }
});

// Produkt routers
router.get("/alle-produkter", async function (req, res) {
  const products = await queryController.handleQuery("SELECT * FROM products");

  res.json(products);
});

// GET one product to show its needed and related products.
router.get("/produkt/:id", async function (req, res) {
  if (req.session.cart) {
    cart = req.session.cart;
  }

  const product = await queryController.handleQuery(
    `SELECT id, name, description, price, unit FROM products WHERE id=${req.params.id}`
  );
  let neededProducts = await queryController.handleQuery(
    `SELECT id, name, description, price, unit FROM products WHERE id !=${req.params.id}`
  );
  const relatedProducts = await queryController.handleQuery(
    `SELECT id, name, description, price, unit FROM products WHERE id !=${req.params.id}`
  );

  neededProducts = neededProducts.filter(
    ({ id }) => !cart.some((e) => e.id === id)
  );

  // Source: https://www.reddit.com/r/learnjavascript/comments/siphq1/compare_two_arrays_with_objects_and_remove/

  cart.push(product[0]);

  res.render("index", {
    title: "Byggemarked Produkter",
    products: neededProducts,
    product: product[0],
    cart: cart,
    relatedProducts: relatedProducts,
  });
});

module.exports = router;
