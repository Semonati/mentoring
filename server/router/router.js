const express = require("express");
// const blocksControllers = require("../controllers/blockController");
const { getBlocks, getBlocksById } = require("../controllers/blockController");

const router = express.Router();

// router.use("/",blocksControllers);
router.get("/", getBlocks);
router.get("/", getBlocksById);

module.exports = router;
