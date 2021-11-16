const router = require("express").Router()
const Balance = require("../app/controller/balance.controller")
router.get("/transaction/:type/:userId", Balance.addTransactionScreen)
router.post("/transaction/:type/:userId", Balance.addTransaction)
module.exports=router