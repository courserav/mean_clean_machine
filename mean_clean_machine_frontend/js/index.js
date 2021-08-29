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
let updateForm = document.getElementById("update-order-form")
updateForm.style.display = "none"
let placeHolder = 0
let customersArray = []
let currentOrder = "none"

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
        clearDiv(formDiv)
        let currentCustomer = this

        updateForm.style.display = "none"

        let orderForm = document.createElement("form")
        let itemNameForm = document.createElement("div")
        let itemNameFormLabel = document.createElement("label")
        let itemNameFormSelect = document.createElement("select")
        let itemNameFormPrice = document.createElement("input")
        itemNameForm.class = "form-group"
        itemNameFormLabel.textContent = "Garment: "
        itemNameFormSelect.class, itemNameFormPrice.class = "form-control"
        itemNameFormPrice.placeholder = "Price"
        itemNameFormPrice.type = "text"
        let option1 = document.createElement("option")
        option1.textContent = "Shirt"
        option1.value = "Shirt"
        let option2 = document.createElement("option")
        option2.textContent = "Pants"
        option2.value = "Pants"
        let option3 = document.createElement("option")
        option3.textContent = "Dress"
        option3.value = "Dress"
        itemNameFormSelect.appendChild(option1)
        itemNameFormSelect.appendChild(option2)
        itemNameFormSelect.appendChild(option3)
        itemNameForm.appendChild(itemNameFormLabel).appendChild(itemNameFormSelect)
        let submitOrder = document.createElement("button")
        submitOrder.type = "submit"
        submitOrder.class = "btn btn-primary"
        submitOrder.textContent = "Submit"
        submitOrder.addEventListener('click', function() {
            let newOrder = new Order(parseInt(currentCustomer.id), parseInt(itemNameFormPrice.value), itemNameFormSelect.value)
            newOrder.postOrder(currentCustomer)
        })
        let options = [option1, option2, option3]
        itemNameFormSelect.addEventListener("change", function() {
            if (this.value == "Shirt" || this.value == "Pants"){
                itemNameFormPrice.value = "10.00"
            }
            else if (this.value == "Dress"){
                itemNameFormPrice.value = "15.00"
            }

        }, false)
        orderForm.appendChild(itemNameForm)
        orderForm.appendChild(itemNameFormPrice)
        orderForm.appendChild(submitOrder)
        formDiv.appendChild(orderForm)

        Order.getOrders(currentCustomer)
    }
}

class Order{
    constructor(customer_id, price, item, id = "none"){
        this.customer_id = customer_id
        this.price = price
        this.item = item
        this.id = id
    }
    static getOrders(customer){
        fetch(`${CUSTOMER_URL}/${customer.id}/orders`)
        .then(response => response.json())
        .then(data => {
            let customerOrders = []
            customerOrders = data.map(dbOrder => {
                if (dbOrder != undefined){
                return new Order(dbOrder.customer_id, dbOrder.price, dbOrder.item, dbOrder.id)
                } 
            })
            return customerOrders
        })
        .then(orders => {
            clearDiv(orderList)
            let customerDiv = document.getElementById("open-name")
            customerDiv.textContent = customer.first_name + " " + customer.last_name
            for (let i = 0; i < orders.length; i ++){
                let orderDiv = document.createElement("li")
                orderDiv.textContent = `item: ${orders[i].item} price: ${orders[i].price}`
                orderDiv.className = "list-group-item list-group-item-action"
                orderDiv.addEventListener("click", function(){
                    currentOrder = orders[i]
                    currentOrder.updateOrder(customer)
                })
                orderList.appendChild(orderDiv)
            }
        })
    }
    postOrder(customer){
        fetch(`${CUSTOMER_URL}/${this.customer_id}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                customer_id: this.customer_id,
                price: this.price,
                item: this.item
            })
        })
        .then(response => response.json())
        .then((e) => {
            Order.getOrders(customer)
        })
    }
    updateOrder(customer){
        updateForm.style.display = "initial"
        let updatePrice = document.getElementById("update-price")
        let updateGarment = document.getElementById("update-garment")
        let updateButton = document.getElementById("update-button")
        currentOrder = this
        updateGarment.addEventListener("change", function() {
            if (this.value == "Shirt" || this.value == "Pants"){
                updatePrice.value = "10.00"
            }
            else if (this.value == "Dress"){
                updatePrice.value = "15.00"
            }
        }, false)
        updateButton.addEventListener("click", function() {
            currentOrder.item = updateGarment.value
            currentOrder.price = updatePrice.value

            fetch(`${CUSTOMER_URL}/${currentOrder.customer_id}/orders/${currentOrder.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    price: currentOrder.price,
                    item: currentOrder.item
                })
            })
            .then(response => response.json())
            .then(function() {
                Order.getOrders(customer)
            })
        })
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
