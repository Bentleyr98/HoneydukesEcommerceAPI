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
router.post("/", requiresAuth(), createOrder); // requiresAuth() DON'T FORGET
router.put("/:id", requiresAuth(), updateOrder); // requiresAuth() DON'T FORGET
router.delete("/:id", requiresAuth(), deleteOrder); // requiresAuth() DON'T FORGET

module.exports = router;
