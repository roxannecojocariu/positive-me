class CreateQuotes < ActiveRecord::Migration[5.2]
  def change
    create_table :quotes do |t|
      t.string :mood, null: false
      t.string :body, null: false
      t.string :author
    end
  end
end
