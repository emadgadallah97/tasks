const addCustomerForm = document.querySelector("#addCustomer")
const tbody = document.querySelector("#allCustomers")
const form = document.querySelector("#customerDetails")
const tbodytranc = document.querySelector("#trancactionsDetailes")
const readLocalStaorageData = () =>{
    let data
    try{
        data = JSON.parse(localStorage.getItem('Customers'))
        if(!data || !Array.isArray(data) ) throw new Error()
    }
    catch(e){
        data = []
    }
    return data
}
//get customer index
const customerindex = () =>{
  let  data = JSON.parse(localStorage.getItem('index'))
  return data
}

//get customer trancactions
const readLocalStaorageDataOfTrancactions = () =>{
    let  data = JSON.parse(localStorage.getItem('Customers'))[customerindex()]["transactions"]
   return data
}
//get customer all details
const customerDetails = () =>{
    let  data = JSON.parse(localStorage.getItem('Customers'))[customerindex()]
   return data
}

const writeDataToLocalStorage = (data) =>{
    localStorage.setItem("Customers", JSON.stringify(data))
}
const addCustomer = (customer) =>{
    let data=readLocalStaorageData();
    data.push(customer)
    writeDataToLocalStorage(data)
}
if(addCustomerForm){
    addCustomerForm.addEventListener('submit', function(e){
        e.preventDefault()
        const customer = {
            accountNumber: Date.now(),
            name : this.elements.customerName.value,
            address: { 
                        city: this.elements.city.value,
                        street: this.elements.street.value,
                        building: this.elements.buildingNumber.value,
            },
            balance: Number(this.elements.balance.value) ,
            transactions: []
        
        }
        addCustomer(customer)
        this.reset()
        window.location.replace("index.html");
    
    })
    
}
//withdraw
const withdraw = function(i, customers){

let value = prompt("Please enter withdraw value");

if (value > customers[i].balance) {
     
alert("faild withdraw ! your balance is  => " + customers[i].balance  );
} else{
    //code
    let newbalance=(customers[i].balance)-value
    customers[i].balance=newbalance
    customers[i].transactions.push({type: "withdraw" ,amount: value,balance: newbalance})
    alert(`done ! your new balance is: ${newbalance}`)
    writeDataToLocalStorage(customers)
    showCustomers(customers)
}
    
}


//add balance
const addb = function(i, customers){

    let add = prompt("Please enter your new balance")
    if(add<100){
        alert("your valu must more than 100")
    }else if(add>6000){
        alert("your value must be less than 6000")
    }else{
    customers[i].balance +=Number(add) 
    customers[i].transactions.push({type: "add balance" ,amount: add,balance: customers[i].balance})
    alert(`done ! your new balance is: ${customers[i].balance}`)
    writeDataToLocalStorage(customers)
    showCustomers(customers)}

}



const createMyOwnElement = (parent, ele, txt=null, classes=null) =>{
    myElement = document.createElement(ele)
    parent.appendChild(myElement)
    if(txt) myElement.textContent = txt
    if(classes) myElement.classList=classes
    return myElement
}
//show trancactions details
const showtranc = (trancactions) =>{
    
     tbodytranc.textContent=""
     trancactions.forEach( (trancaction, i) => {
        const tr = createMyOwnElement(tbodytranc, "tr")
       

        createMyOwnElement(tr, "td", trancaction["type"] )
        createMyOwnElement(tr, "td", trancaction["amount"])
        createMyOwnElement(tr, "td", trancaction["balance"])
    })
}

//show all customers in index page
const showCustomers = (customers) =>{
    tbody.textContent=""
    customers.forEach( (customer, i) => {
        const tr = createMyOwnElement(tbody, "tr")
        

        createMyOwnElement(tr, "td", customer["accountNumber"])
        createMyOwnElement(tr, "td", customer["name"])

        const td = createMyOwnElement(tr, "td")
        //withdraw btn
        const withdrawBtn = createMyOwnElement(td, "button","withdraw","btn btn-primary mx-2")
        withdrawBtn.addEventListener("click", ()=> withdraw(i, customers))
        //add balance btn
        const addBalance = createMyOwnElement(td, "button", "add balance","btn btn-success mx-2 showBtn")
        addBalance.addEventListener("click", ()=> addb (i, customers))
        //show details btn
        const showDetailsBtn = createMyOwnElement(td, "button", "show details", "btn btn-warning mx-2")
        showDetailsBtn.addEventListener("click", ()=>{
            localStorage.setItem("index", JSON.stringify(i) )
            window.location.href = "showDetailes.html";
        })
    })
}

if(tbody){
    let data = readLocalStaorageData()
    showCustomers(data)
}
if(tbodytranc){
    
    let data = readLocalStaorageDataOfTrancactions()
    showtranc(data);
}
if(form){
    
    let data = customerDetails()
    form.elements.accountNumber.value = data.accountNumber
    form.elements.name.value = data.name
    form.elements.city.value = data.address.city
    form.elements.street.value = data.address.street
    form.elements.building.value = data.address.building
    form.elements.balance.value = data.balance
    
}
