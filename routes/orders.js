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
router.post("/", createOrder); // requiresAuth(),
router.put("/:id", updateOrder); // requiresAuth(),
router.delete("/:id", deleteOrder); // requiresAuth(),

module.exports = router;
