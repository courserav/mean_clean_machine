# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

customer = Customer.create(first_name: "Ricky", last_name: "Spanish", email: "rickyspan1sh@aol.com", phone_number: "555-555-5555")
customer.save!

Customer.create(first_name: "Matilda", last_name: "Woormwood", email: "psychick@yahoo.com", phone_number: "555-555-5555")
Customer.create(first_name: "", last_name: "Pitoo", email: "secondpit@aol.com", phone_number: "555-555-5555")
Customer.create(first_name: "", last_name: "Pit", email: "firstpit@aol.com", phone_number: "555-555-5555")
Customer.create(first_name: "Reggie", last_name: "Rocket", email: "", phone_number: "")
Customer.create(first_name: "Otto", last_name: "Rocket", email: "", phone_number: "")
Customer.create(first_name: "Raymundo", last_name: "Rocket", email: "daddyrocket@aol.com", phone_number: "555-555-5555")
Customer.create(first_name: "Ash", last_name: "Ketchum", email: "", phone_number: "")
Customer.create(first_name: "Bernard", last_name: "Sanders", email: "icouldhavebeenpresidentifthedemocratsdidntcannabalizeme@whitehouse.gov", phone_number: "")
Customer.create(first_name: "Donald", last_name: "Garison", email: "yuge@trumpu.edu", phone_number: "")
Customer.create(first_name: "", last_name: "test", email: "", phone_number: "")
Customer.create(first_name: "Bubbles", last_name: "n/a", email: "", phone_number: "")
Customer.create(first_name: "LastPlaceHolder", last_name: "Z", email: "", phone_number: "")