const chalk = require("chalk")
const fs = require("fs")
const uniqueid =require("uniqid")
const validator = require("validator")

const writeToFile = (users) => {
fs.writeFileSync("users.json" , JSON.stringify(users))
}
const readDataFromFile =() =>{
    let data
    try{
        data = JSON.parse(fs.readFileSync("users.json"))
        if(!Array.isArray(data)) throw new Error()
    }
    catch(e){
        data = []
    }
    return data
}
addNewUser = (userData)=>{
    try{
        if(!validator.isEmail(userData.email)) throw new Error("invalid Email")
        const allUsers = readDataFromFile()
        const notUnique = allUsers.find(user=> user.email == userData.email)
        if(notUnique) throw new Error("Email used before")
        let user = { id: uniqueid(), ...userData}
        allUsers.push(user)
        writeToFile(allUsers)
        console.log(chalk.green("data inserted successfuly"))
    }
    catch(e){
        console.log(chalk.red(e.message))
    }
}
getAllData = () =>{
    const allUsers = readDataFromFile()
    if(allUsers.length==0)return console.log(chalk.red("No users yet"))
    console.log(`your file has ${allUsers.length} record`)
    allUsers.forEach(user=>{
        console.log(chalk.green(`id: ${user.id} - user name: ${user.name} - user email: ${user.email}`))
    })

}
//show single
showSingle = (userId) =>{
    const allUsers = readDataFromFile()
    try{
        const userData = allUsers.find(user =>user.id ==userId)
        if(!userData) throw new Error("this user not found")
    console.log(chalk.green(`id: ${userData.id} - user name: ${userData.name} - user email: ${userData.email}`))

    }
    catch(e){
        console.log(chalk.red(e))
    }
    

}
//delete user
deleteUser =(userId) =>{
    const allUsers = readDataFromFile()
    try{
        const userData = allUsers.find(user =>user.id ==userId)
        const index = allUsers.indexOf(userData)
        if(!userData) throw new Error("this user not found")
        allUsers.splice(index,1)
        fs.writeFileSync("users.json" , JSON.stringify(allUsers))
        console.log(chalk.green("user deleted successfuly"))
    }
    catch(e){
        console.log(chalk.red(e))
    }
}
//edit user
editUser = (id,name,email) =>{
    const allUsers = readDataFromFile()
    try{
        const userData = allUsers.find(user =>user.id ==id)
        if(!userData) throw new Error("this user not found")
        if(!validator.isEmail(email)) throw new Error("invalid Email")
        const notUnique = allUsers.find(user=> user.email == email)
        if(notUnique) throw new Error("Email used before")
    userData.name=name
    userData.email=email
    fs.writeFileSync("users.json" , JSON.stringify(allUsers))
    console.log(chalk.green("user data updated successfuly"))

    }
    catch(e){
        console.log(chalk.red(e))
    }
    

}
module.exports ={
    addNewUser,
    getAllData,
    showSingle,
    deleteUser,
    editUser
}