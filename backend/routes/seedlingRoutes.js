const express = require("express");
const {
  getSeedlings,
  addSeedling,
  updateSeedling,
  deleteSeedling,
} = require("../controllers/seedlingController");

const router = express.Router();

router.get("/", getSeedlings);
router.post("/", addSeedling);
router.put("/:id", updateSeedling);
router.delete("/:id", deleteSeedling);

module.exports = router;
