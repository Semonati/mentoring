const express = require("express");
const blocksControllers = require("../controllers/blockController");

const router = express.Router();

router.use("/", blocksControllers);

module.exports = router;
