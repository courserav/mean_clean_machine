class CustomersController < ApplicationController
    def index
        customers = Customer.all
        render json: customers.to_json
    end

    def show
        customer = Customer.find_by(params: [:id])
        render json: customer.to_json
    end
end
