const {MongoClient, ObjectId} = require("mongodb")
class DealWithJSON{

    static dbConnection = (callback) =>{
        MongoClient.connect('mongodb://localhost:27017', {}, (err, client)=>{
            if(err) return callback(err, false)
            const dbClient = client.db('customers')
            callback(false, dbClient)
        })
    }
   
    
}
module.exports= DealWithJSON