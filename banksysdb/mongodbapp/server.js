// const mongodb = require("mongodb")
// const MongoClient = mongodb.MogoClient

const {MongoClient, ObjectId} = require("mongodb")
const dbName = "g12"
const dbHost = "mongodb://localhost:27017" // localhost ==> 127.0.0.1
console.log(new ObjectId("61938f598cc27cd449e33c09"))
MongoClient.connect(dbHost, {}, (error, client)=>{
    if(error) return console.log(error)
    const myClient = client.db(dbName)
    // myClient.collection("user").insertOne({name:"ahmed"}, (err,res)=>{
    //     if(err) return console.log(err)
    //     else console.log(res.insertedId)
    // })
    // myClient.collection("user").insertMany(
    //     [
    //         {name:"hasan"},
    //         {name:"ahmed"},
    //         {a:5},
    //         {b:17}
    //     ],
    //     (err, res)=>{
    //         if(err) return console.log(err)
    //         console.log(res)
    //     }
    // )
    // myClient.collection("user").find({name:"ahmed"}).toArray((err,res)=>{
    //     if(err) return console.log(err)
    //     console.log(res)
    // })
    // myClient.collection("user").findOne(
    //     {_id:new ObjectId("61938f598cc27cd449e33c09")}, 
    //     (err, res)=>{
    //         if(err) return console.log(err)
    //         console.log(res)
    //     }    
    // )
    //deleteOne
    // myClient.collection("user").deleteMany({name:"ahmed"})
    // .then(res=> console.log(res))
    // .catch(e=>console.log(e))
    // myClient.collection("user").updateOne(
    //     {name:"hasan"},
    //     {
    //         $set:{
    //             name: "marwa",
    //             age:36
    //         }
    //     }
    // )
    //     .then(res=> console.log(res))
    //     .catch(e=> console.log(e))
    myClient.collection("user").updateMany(
        {},
        {
            $inc:{
                age:1            
            }
        }
    )
        .then(res=> console.log(res))
        .catch(e=> console.log(e))
    
})
