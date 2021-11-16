const router = require("express").Router()
const customer = require("../app/controller/customer.controller")
router.get("", customer.homeScreen)
router.get("/addCustomer", customer.addCustomerScreen)
router.post("/addCustomer", customer.addCustomer)
router.get("/delete/:id", customer.deleteSingle)
router.get("/deleteall", customer.deleteAll)
router.get("/showsingle/:id", customer.showSingle)
module.exports=router 