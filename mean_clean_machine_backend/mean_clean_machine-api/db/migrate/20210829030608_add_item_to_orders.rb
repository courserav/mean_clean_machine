class AddItemToOrders < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :item, :string
  end
end
