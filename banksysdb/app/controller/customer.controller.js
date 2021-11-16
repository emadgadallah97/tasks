const dealWithJson = require("../helpers/dealWithJson.helper")
const {MongoClient, ObjectId} = require("mongodb")

class Customer{
    static homeScreen = (req, res) =>{
        dealWithJson.dbConnection((err,client)=>{
        if(err) res.send("database error")
        client.collection("customersData").find().toArray((e,data)=>{
            if(e) res.send("database error")
            res.render("home", {
                pageTitle:"All Cutomers",
                allCustomers:data,
                noData: data.length==0? true: false
            })
        })
    })
    }
    static addCustomerScreen = (req, res) =>{
        res.render("addCustomer", {
            pageTitle:"Add New Customer"
        })
    }
    static addCustomer = (req, res) =>{
        
    let customer = {
        ...req.body,
        currentBalance : Number(req.body.IntialBalance),
         transaction: []}
         dealWithJson.dbConnection((err,client)=>{
        if(err) res.send("database error")
        client.collection("customersData").insertOne(customer, (e, r)=>{
            if(e) res.send("database error")
            res.redirect('/')
        })
    })}
    static showSingle = (req, res) =>{
        dealWithJson.dbConnection((error, client)=>{
            if(error) res.send("db error")
            client.collection("customersData").findOne({_id: new ObjectId(req.params.id)}, 
            (e,d)=>{
                if(e) res.send("db error")
                if(!d) res.render('err404', {pageTitle:'user not found', err:"invalid user id"})
                res.render("singleCustomer", { pageTitle:"Single User", customer:d })
            // console.log(JSON.parse(d.transaction) )
            }
            )
        })
    }
    static deleteSingle = (req, res) =>{
        
        dealWithJson.dbConnection((err,client)=>{
            if(err) res.send("database error")
            client.collection("customersData").deleteOne({_id: new ObjectId(req.params.id)})
               
                res.redirect('/')
            
       }) }
    
       static deleteAll = (req, res) =>{
        
        dealWithJson.dbConnection((err,client)=>{
            if(err) res.send("database error")
            client.collection("customersData").deleteMany()
               
                res.redirect('/')
            
       }) }
    
       


    }
     
    


module.exports = Customer