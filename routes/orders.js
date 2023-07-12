const router = require("express").Router();
const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders");
const { requiresAuth } = require("express-openid-connect");

router.get("/", getAllOrders);
router.get("/:id", getOrder);
router.post("/", requiresAuth(), createOrder);
router.put("/:id", requiresAuth(), updateOrder);
router.delete("/:id", requiresAuth(), deleteOrder);

module.exports = router;
