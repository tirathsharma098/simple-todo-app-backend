const router = require("express").Router();

// Importing All routes
const todoRoute = require("./todoRoute");

// All routes
router.use("/todo", todoRoute);

module.exports = router;