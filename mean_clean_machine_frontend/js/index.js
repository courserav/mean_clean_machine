const BASE_URL = `https://localhost:3000`
const CUSTOMER_URL = BASE_URL + `/customers`

let customerSearchBar = document.getElementById("customer-search-bar")
const customerSearchBtn = document.getElementById("customer-search-btn")
let customerList = document.getElementById("customer-list")

customerSearchBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    let customer = customerSearchBar.value //customer could be first name, last name, email or phone #
    let listItem = document.createElement("li")
    listItem.className = "list-group-item"
    listItem.textContent = customer
    let customerListCount = customerList.getElementsByClassName("list-group-item")

    fetch(CUSTOMER_URL, (e) => {})
    .then(response => response.json())
    .then(json => findCustomer(json){
        for (let i = 0; i < json.length; i++){
            if (json[i].first_name == customer|| json[i].last_name == customer|| json[i].email == customer || json[i].phone_number == customer){
                customerList.appendChild(listItem)
            }
        }
    })


    if (customerListCount.length > 10){
        customerList.removeChild(customerList.firstChild)
    }
})