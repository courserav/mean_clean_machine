# mean_clean_machine

# Introduction
Mean Clean Machine is a point-of-sale web app designed to simulate a worker making orders for dry cleaning. 
The project runs off an html webpage that is supported with Javascript, some CSS, and other tools like Bootstrap. 
The page makes AJAX calls to a local server that allows the employee/user to look through customers, pull up their orders, make new ones, and edit them. 

# How-To
To use the application you will need to make sure the connection to whatever server you're running is properly working.
After that I have some data already seeded into the project. You can use the blue arrows to search through the customer list.
Searching for a customer's case-sensitive name will pull up matching profiles to the top of the list instead of you having to scroll through everything. 

Click on a customer to pull up their orders. Orders will appear in the middle box of the page. You can create new orders via the form at the top. New orders will appear
below the form. You can then select those existing orders and make changes through the menu that will appear on the right. 
Left box is for customers, middle is the order list, and right box is to update the selected order. 
The items available have default prices set but you can change the number to whatever you want. Once the item type and price are set you can hit submit or update
and watch the changes happen. 

# Project Requirements
As stated in the project requirements, my project is a one-page web application front end that is supported by a Rails API backend. All client-server communcation is in the form of asynchronous calls (AJAX) and the data is in the form of JSON. I use classes to manage nearly all data and fetch calls are made through the classes themselves. I have a domain model in Rails that operates on two objects - Customers and Orders. Customers have many orders; an order belongs to a customer. Customers cannot pull up any orders other than their own. 
I have four AJAX calls and I cover Create, Read, and Update portions of CRUD operations. I also impliement RESTful routing.  