const express = require("express");
const Blocks = require("../DB/mongodb/blocks");

const DB = process.env.DB || "MONGODB";
const router = express.Router();

// router.get("/", async (req, res) => {
//   if (DB === "MONGODB") {
//     try {
//       const blocks = await Blocks.find();
//       res.status(200).send(blocks);
//     } catch (error) {
//       error.status = 404;
//       return Promise.reject(error);
//     }
//   }
// });

router.get("/", (req, res) => {
    res.json("Hello");
})

router.get("/:id", async (req, res) => {
  if (DB === "MONGODB") {
    try {
      const { id } = req.params;
      const blocks = await Blocks.findById(id);
      res.status(200).send(blocks);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
});

module.exports = router;
