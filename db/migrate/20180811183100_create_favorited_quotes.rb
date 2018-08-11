class CreateFavoritedQuotes < ActiveRecord::Migration[5.2]
  def change
    create_table :favorited_quotes do |t|
      t.belongs_to :user, null: false
      t.belongs_to :quote, null: false
    end
  end
end
