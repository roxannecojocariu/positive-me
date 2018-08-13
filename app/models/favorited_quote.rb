class FavoritedQuote < ApplicationRecord
  belongs_to :user
  belongs_to :quote
  validates :user_id, presence: true
  validates :quote_id, presence: true
end
