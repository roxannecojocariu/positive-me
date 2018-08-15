class AddCreatorToQuotes < ActiveRecord::Migration[5.2]
  def change
    add_column :quotes, :creator_id, :integer
  end
end
