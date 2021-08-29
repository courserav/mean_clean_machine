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
let orderList = document.getElementById("order-list")
let formDiv = document.getElementById("form-div")
let thirdBox = document.getElementById("third-box")
let placeHolder = 0
let customersArray = []

class Customer{
    constructor(id, firstName, lastName, email, phone){
        this.id = id
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
                let newCustomer = new Customer(data[i].id, data[i].first_name, data[i].last_name, data[i].email, data[i].phone_number)
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
        clearDiv(orderList)
        clearDiv(thirdBox)
        clearDiv(formDiv)

        let orderForm = document.createElement("form")
        let itemNameForm = document.createElement("div")
        let itemNameFormLabel = document.createElement("label")
        let itemNameFormSelect = document.createElement("select")
        itemNameForm.class = "form-group"
        itemNameFormLabel.textContent = "Garment: "
        itemNameFormSelect.class = "form-control"
        const option1 = document.createElement("option")
        option1.textContent = "Shirt"
        const option2 = document.createElement("option")
        option2.textContent = "Jeans"
        const option3 = document.createElement("option")
        option3.textContent = "Dress"
        itemNameFormSelect.appendChild(option1)
        itemNameFormSelect.appendChild(option2)
        itemNameFormSelect.appendChild(option3)
        itemNameForm.appendChild(itemNameFormLabel).appendChild(itemNameFormSelect)
        orderForm.appendChild(itemNameForm)
        formDiv.appendChild(orderForm)

        Order.getOrders(this)
    }
}

class Order{
    constructor(id, customer_id, price, item){
        this.id = id
        this.customer_id = customer_id
        this.price = price
        this.item = item
    }
    static getOrders(customer){
        fetch(`${BASE_URL}/customers/${customer.id}/orders`)
        .then(response => response.json())
        .then(data => {
            let customerOrders = data.map(dbOrder => {
                if (dbOrder != undefined){
                return new Order(dbOrder.id, dbOrder.customer_id, dbOrder.price, dbOrder.item)
                } 
            })
            return customerOrders
        })
        .then(orders => {
            let customerDiv = document.getElementById("open-name")
            customerDiv.textContent = customer.first_name + " " + customer.last_name
            for (let i = 0; i < orders.length; i ++){
                let orderDiv = document.createElement("ul")
                orderDiv.appendChild(document.createElement("li").textContent(`item: ${orders[i].item} price: ${orders[i].price}`))
                orderList.appendChild(orderDiv)
            }
        })
    }
}

class Item{

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
            listItem.className += " list-group-item-active"
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
