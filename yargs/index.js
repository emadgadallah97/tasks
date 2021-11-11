const fs = require("fs")
const yargs = require("yargs")

const utils = require("./utils/myFunctions")

yargs.command({
    command: "addUser",
    builder:{
        name: {type:'string', demandOption:true},
        email: {type:'string', demandOption:true}
    },
    handler: function(argv){
        let user ={
            name: argv.name,
            email: argv.email
        }
        utils.addNewUser(user)
    }
})
//show all
yargs.command({
    command: "showAllUsers",
    handler: function(){
        utils.getAllData()
    }
})
//show single user
yargs.command({
    command: "showSingleUser",
    builder:{
        id: {type:'string', demandOption:true}
    },
    handler: function(argv){
        let userId = argv.id
        utils.showSingle(userId)
    }
    
})
// //edit user
yargs.command({
    command: "editUser",
    builder:{
        id: {type:'string', demandOption:true},
        name: {type:'string', demandOption:true},
        email: {type:'string', demandOption:true}
    },
    handler: function(argv){
        let userId = argv.id
        let name = argv.name
        let email = argv.email
        utils.editUser(userId,name,email)
    }
})
// //delete user
yargs.command({
    command: "deleteUser",
    builder:{
        id: {type:'string', demandOption:true}
    },
    handler: function(argv){
        let userId = argv.id
        utils.deleteUser(userId)
    }
})
//end
yargs.argv


