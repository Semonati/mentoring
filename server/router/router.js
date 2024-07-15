const express = require("express");
const blocksControllers = require("../controllers/blockController");
// const Blocks = require("../DB/mongodb/blocks");
// const DB = process.env.DB || "MONGODB";
// const { getBlocks, getBlocksById } = require("../controllers/blockController");
const router = express.Router();

router.use("/", blocksControllers);
// router.get("/", getBlocks);
// router.get("/", getBlocksById);

module.exports = router;
