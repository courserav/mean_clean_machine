const BASE_URL = `http://localhost:3000`
const CUSTOMER_URL = `${BASE_URL}/customers`

let customerSearchBar = document.getElementById("customer-search-bar")
const customerSearchBtn = document.getElementById("customer-search-btn")
const customerAddBtn = document.getElementById("customer-add-btn")
let customerList = document.getElementById("customer-list")
let customerListCount = document.getElementsByClassName("list-group-item")
const cListLeftBtn = document.getElementById("customer-list-btn-left")
const cListRightBtn = document.getElementById("customer-list-btn-right")
const mainBox = document.getElementById("main-box")
let placeHolder = 0
let customersArray = []

class Customer{
    constructor(firstName, lastName, email, phone){
        this.first_name = firstName
        this.last_name = lastName
        this.email = email
        this.phone_number = phone
    }

    static getCustomers(){
        fetch(CUSTOMER_URL)
        .then(response => response.json())
        .then(data => {
            customersArray = []
            for (let i = 0; i < data.length; i++){
                let newCustomer = new Customer(data[i].first_name, data[i].last_name, data[i].email, data[i].phone_number)
                customersArray.push(newCustomer)
            }
        })
        .then(function(e){
                scrollCustomers("*all")
        })
    }

    postCustomer(){
        fetch(CUSTOMER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this)
        })
        .then(response => response.json())
    }

    updateCustomer(){
        fetch(CUSTOMER_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this)
        })
        .then(response => response.json())
    }

    changeName(firstName, lastName){
        this.first_name = firstName
        this.last_name = lastName
    }

    changeEmail(newEmail){
        this.email = newEmail
    }

    changePhone(newPhone){
        this.phone_number = newPhone
    }
    openCustomer(){
        clearDiv(mainBox)
        let customerDiv = document.createElement("div")
        customerDiv.textContent = this.first_name + this.last_name
        mainBox.appendChild(customerDiv)
    }
}


cListLeftBtn.addEventListener('click', (e)=>{
    scrollCustomers('*left')
})

cListRightBtn.addEventListener('click', (e)=>{
    scrollCustomers('*right')
})

function clearDiv(theDiv){
    while (theDiv.firstChild){
        theDiv.removeChild(theDiv.lastChild)
    }
}

function updateList(placeHolder){
    clearDiv(customerList)
    for (let i = placeHolder; i < (placeHolder + 10); i++){
        if (customersArray[i] != undefined){
        let listItem = document.createElement("a")
        listItem.className = "list-group-item list-group-item-action"
        listItem.href = "#"
        listItem.value = customersArray[i]
        listItem.addEventListener('click', (e)=>{
            listItem.value.openCustomer()
        })
        listItem.textContent = `Name: ${customersArray[i].first_name} ${customersArray[i].last_name} | Email: ${customersArray[i].email} | Phone#: ${customersArray[i].phone_number} `
        customerList.appendChild(listItem)
        }
    }
    customerListCount = document.getElementsByClassName("list-group-item")
}

function scrollCustomers(command){
    if (command === '*all'){
        customersArray.sort(function(a, b){
            if (a.last_name < b.last_name){ return -1 }
            if (a.last_name > b.last_name){ return 1 }
            return 0
        })
        updateList(0)
    }
    else if (command === '*left' && placeHolder >= 10){
        placeHolder -= 10
        updateList(placeHolder)
    }
    else if (command === '*right'){
        placeHolder += 10
        if (placeHolder >= customersArray.length){
            placeHolder -= 10
        }
        updateList(placeHolder)
    }
    else{
        customersArray.sort(function(a, b){
            return b.last_name.includes(command) - a.last_name.includes(command) || b.first_name.includes(command) - a.first_name.includes(command) || b.email.includes(command) - a.email.includes(command)
        })
        updateList(0)
    }
}

customerSearchBtn.addEventListener('click', (e)=>{
    let searchValue = customerSearchBar.value //value could be first name, last name, email or phone #
    scrollCustomers(searchValue)
})

customerAddBtn.addEventListener('click', (e)=>{
    e.preventDefault()

})
