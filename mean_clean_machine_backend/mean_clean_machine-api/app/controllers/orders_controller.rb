class OrdersController < ApplicationController
    def index
        orders = Order.all
        render json: orders.to_json
    end

    def show
        order = Order.find_by(params: [:id])
        render json: order.to_json
    end
end
