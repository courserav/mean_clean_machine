class OrdersController < ApplicationController
    def index
        orders = Order.all
        render json: orders.to_json
    end

    def show
        order = Order.find_by(params[:id])
        render json: order.to_json
    end

    def create
        order = Order.new(params.require(:order).permit(:customer_id, :price, :item))
        if (order.save!)
            render json: order.to_json
        end
    end
end
