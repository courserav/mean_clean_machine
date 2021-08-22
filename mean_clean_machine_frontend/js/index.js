const BASE_URL = `http://localhost:3000`
const CUSTOMER_URL = `${BASE_URL}/customers`

let customerSearchBar = document.getElementById("customer-search-bar")
const customerSearchBtn = document.getElementById("customer-search-btn")
let customerList = document.getElementById("customer-list")
const cListLeftBtn = document.getElementById("customer-list-btn-left")
const cListRightBtn = document.getElementById("customer-list-btn-right")
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
            console.log(customersArray)
        })
        .then(function(e){
                scrollCustomers("all")
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
}

cListLeftBtn.addEventListener('click', (e)=>{
    scrollCustomers('left')
})

cListRightBtn.addEventListener('click', (e)=>{
    scrollCustomers('right')
})

function updateList(placeHolder){
    while (customerList.firstChild){
        customerList.removeChild(customerList.lastChild)
    }
    for (let i = placeHolder; i < (placeHolder + 10); i++){
        let listItem = document.createElement("li")
        listItem.className = "list-group-item"
        listItem.textContent = `Name: ${customersArray[i].first_name} ${customersArray[i].last_name} | Email: ${customersArray[i].email} | Phone#: ${customersArray[i].phone_number} `
        customerList.appendChild(listItem)
    }
}

function scrollCustomers(command){
 
    if (command === 'all'){
        customersArray.sort(function(a, b){
            if (a.last_name < b.last_name){ return -1 }
            if (a.last_name > b.last_name){ return 1 }
            return 0
        })
        updateList(0)
    }
    else if (command == 'left' && placeHolder >= 10){
        placeHolder -= 10
        updateList(placeHolder)
    }
    else if (command == 'right' && placeHolder < customersArray.length){
        placeHolder += 10
        updateList(placeHolder)
    }
}

customerSearchBtn.addEventListener('click', (e)=>{
    e.preventDefault()
 
    let searchValue = customerSearchBar.value //customer could be first name, last name, email or phone #

    listItem.className = "list-group-item"
    let customerListCount = customerList.getElementsByClassName("list-group-item")
    searchValue = searchValue.toLowerCase()
})

/* for (let i = 0; i < customersArray.length; i++) {
    if (customersArray[i].first_name.toLowerCase().includes(searchValue) || customersArray[i].last_name.toLowerCase().includes(searchValue) || customersArray[i].email.toLowerCase().includes(searchValue) || customersArray[i].phone_number.includes(searchValue)) {
        listItem.textContent = `Name: ${customersArray[i].first_name} ${customersArray[i].last_name} | Email: ${customersArray[i].email} | Phone#: ${customersArray[i].phone_number} `
        customerList.appendChild(listItem)
    } */