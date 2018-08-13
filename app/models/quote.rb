class Quote < ApplicationRecord
  has_many :favorited_quotes
  has_many :users, through: :favorited_quotes


  validates :mood, presence: true
  validates :body, presence: true
end
