class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name
      t.string :price
      t.string :category
      t.string :type
      t.string :department
      t.string :sku

      t.timestamps
    end
  end
end
