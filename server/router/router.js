const express = require("express");
// const blocksControllers = require("../controllers/blockController");
const Blocks = require("../DB/mongodb/blocks");
const DB = process.env.DB || "MONGODB";
const { getBlocks, getBlocksById } = require("../controllers/blockController");
const Blocks = require("../DB/mongodb/blocks");
const DB = process.env.DB || "MONGODB";
const router = express.Router();

// router.use("/",blocksControllers);
// router.get("/", getBlocks);
<<<<<<< HEAD
router.get("/:id", getBlocksById);
=======
// router.get("/:id", getBlocksById);
>>>>>>> 9e55db78e606f2ed138b8465f9677b8dba38a5a4
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
<<<<<<< HEAD

=======
>>>>>>> 9e55db78e606f2ed138b8465f9677b8dba38a5a4
module.exports = router;
