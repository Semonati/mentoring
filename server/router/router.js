const express = require("express");
// const blocksControllers = require("../controllers/blockController");

const router = express.Router();

// router.use("/blocks", blocksControllers);
router.get("/", (req, res) => {
    res.json("Hello");
})


module.exports = router;
