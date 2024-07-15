const express = require("express");
const blocksControllers = require("../controllers/blockController");

const router = express.Router();

router.use("/blocks", blocksControllers);

module.exports = router;
