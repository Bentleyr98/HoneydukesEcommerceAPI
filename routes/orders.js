const router = require("express").Router();
const {
  getAllOrders,
  getOrder,
  //   createOrder,
  //   updateOrder,
  //   deleteOrder,
} = require("../controllers/orders");
const { requiresAuth } = require("express-openid-connect");

router.get("/", getAllOrders);
router.get("/:id", getOrder);
// router.post('/', requiresAuth, );
// router.put('/:id', requiresAuth, );
// router.delete('/:id', requiresAuth, );

module.exports = router;
