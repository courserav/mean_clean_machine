class OrdersController < ApplicationController
    def index
        customer = Customer.find(params[:customer_id])
        orders = customer.orders.all
        render json: orders.to_json
    end

    def show
        customer = Customer.find_by_id(params[:customer_id])
        order = customer.orders.find(params[:id])
        render json: order.to_json
    end

    def create
        customer = Customer.find_by_id(params[:customer_id])
        order = customer.orders.new(params.require(:order).permit(:customer_id, :price, :item))
        if (order.save!)
            render json: order.to_json
        end
    end

    def update
        customer = Customer.find_by_id(params[:customer_id])
        order = customer.orders.find_by_id(params[:id])
        order.update(price: params[:price], item: params[:item])
        if (order.save!)
            render json: order.to_json
        end
    end
end
