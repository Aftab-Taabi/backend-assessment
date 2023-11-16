const express = require("express");
const router = express.Router();
const {postTrade,getTrades,getTradeById,operationForbidden} = require("../controllers/trades");

// POST endpoint for creating a new trade
router.post("/", postTrade);

// GET endpoint
router.get("/", getTrades);

router
  .route("/:id")
  // GET endpoint for retrieving a trade by ID
  .get(getTradeById)
  .put(operationForbidden)
  .patch(operationForbidden)
  .delete(operationForbidden);

module.exports = router;
