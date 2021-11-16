const DealWithJSON = require('../helpers/dealWithJson.helper')
const {ObjectId} = require("mongodb")

class Balance{
    static addTransactionScreen = (req, res) =>{
        let transactionType = req.params.type
        let userId = req.params.userId
        let type=""
        if(transactionType=="addBalance") type="Add Balance"
        else if(transactionType=="withdraw") type="Withdraw"
        else res.render('err404', { 
                pageTitle:"Not Found", 
                errMsg:"Requested Transaction Type Not Valid"
        })
        res.render("balanceOperation", {
            pageTitle:`Add Transaction ${transactionType}`,
            userId, transactionType:type
        })
    }
    static addTransaction = (req, res) =>{
        let transactionType = req.params.type, userId = req.params.userId
        if(transactionType!="addBalance" &&transactionType!="withdraw") 
            res.render('err404', { pageTitle:"Not Found",  errMsg:"Requested Transaction Type Not Valid" })
           DealWithJSON.dbConnection((e,client)=>{
                if(e) res.send("db error")
                let amount = +req.body.amount
                client.collection("customersData").updateOne(
                    {
                        _id: new ObjectId(userId)
                    },
                   {
                      $push:{
                        transaction: {
                        $each: [ { type: transactionType, amount: req.body.amount }]}
          }})
                //...........update balance
                    if(transactionType=="withdraw") amount = amount *-1
                client.collection("customersData").updateOne(
                    {
                        _id: new ObjectId(userId)
                    },
                   {
                      $inc:{
                        currentBalance: amount
                             }
            })
                .then(r=> res.redirect("/"))
                .catch(e=> res.send(e))
            })
        }}
module.exports = Balance