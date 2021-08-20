let customerSearchBar = document.getElementById("customer-search-bar")
const customerSearchBtn = document.getElementById("customer-search-btn")
let customerList = document.getElementById("customer-list")

customerSearchBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    let customer = customerSearchBar.value
    let listItem = document.createElement("li")
    listItem.className = "list-group-item"
    listItem.textContent = customer
    let customerListCount = customerList.getElementsByClassName("list-group-item")

    customerList.appendChild(listItem)
    if (customerListCount.length > 10){
        customerList.removeChild(customerList.firstChild)
    }
})