const express = require("express");
const router = express.Router();

const orderPaymentHandler = require("./handler/orderPayment");
/* GET users listing. */

router.get("/", orderPaymentHandler.getOrder);

module.exports = router;
