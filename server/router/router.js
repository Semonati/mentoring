const express = require("express");
// const blocksControllers = require("../controllers/blockController");
const { getBlocks, getBlocksById } = require("../controllers/blockController");
const Blocks = require("../DB/mongodb/blocks");
const DB = process.env.DB || "MONGODB";
const router = express.Router();

// router.use("/",blocksControllers);
// router.get("/", getBlocks);
router.get("/:id", getBlocksById);
router.get("/", async (req, res) => {
  if (DB === "MONGODB") {
    try {
      const blocks = await Blocks.find();
      res.status(200).send(blocks);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
});

module.exports = router;
