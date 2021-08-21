const BASE_URL = `http://localhost:3000`
const CUSTOMER_URL = `${BASE_URL}/customers`

let customerSearchBar = document.getElementById("customer-search-bar")
const customerSearchBtn = document.getElementById("customer-search-btn")
let customerList = document.getElementById("customer-list")
const cListLeftBtn = document.getElementById("customer-list-btn-left")
const cListRightBtn = document.getElementById("customer-list-btn-right")
let customersArray = []

function createCustomer(){

}

class Customer{
    constructor(lastName){
        self.last_name = lastName
    }

    static getCustomers(){
        fetch(CUSTOMER_URL)
        .then(response => response.json())
        .then(data => {
            customersArray = []
            for (let i = 0; i < data.length; i++){
                customersArray.push(data[i])
            }
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
            body: JSON.stringify(self)
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
            body: JSON.stringify(self)
        })
        .then(response => response.json())
    }

    changeName(firstName, lastName){
        self.first_name = firstName
        self.last_name = lastName
    }

    changeEmail(newEmail){
        self.email = newEmail
    }

    changePhone(newPhone){
        self.phone_number = newPhone
    }
}

cListLeftBtn.addEventListener('click', (e)=>{
    scrollCustomers('left')
})

cListRightBtn.addEventListener('click', (e)=>{
    scrollCustomers('right')
})

function scrollCustomers(command){
    if (command == 'all'){
        customersArray.sort(function(a, b){
            return a.first_name - b.first_name
        })
        for (let i = 0; i < 10; i++){
            let listItem = document.createElement("li")
            listItem.textContent = `Name: ${customersArray[i].first_name} ${customersArray[i].last_name} | Email: ${customersArray[i].email} | Phone#: ${customersArray[i].phone_number} `
            customerList.appendChild(listItem)
        }
    }
    else if (command == 'left'){

    }
    else if (command == 'right'){

    }
}

customerSearchBtn.addEventListener('click', (e)=>{
    e.preventDefault()
 
    let searchValue = customerSearchBar.value //customer could be first name, last name, email or phone #

    listItem.className = "list-group-item"
    let customerListCount = customerList.getElementsByClassName("list-group-item")
    searchValue = searchValue.toLowerCase()

    if (customerListCount.length > 10){
        customerList.removeChild(customerList.firstChild)
    }
})

/* for (let i = 0; i < customersArray.length; i++) {
    if (customersArray[i].first_name.toLowerCase().includes(searchValue) || customersArray[i].last_name.toLowerCase().includes(searchValue) || customersArray[i].email.toLowerCase().includes(searchValue) || customersArray[i].phone_number.includes(searchValue)) {
        listItem.textContent = `Name: ${customersArray[i].first_name} ${customersArray[i].last_name} | Email: ${customersArray[i].email} | Phone#: ${customersArray[i].phone_number} `
        customerList.appendChild(listItem)
    } */