class Quote < ApplicationRecord
  has_many :favorited_quotes
  has_many :users, through: :favorited_quotes
  belongs_to :creator, class_name: "User", optional: true


  validates :mood, presence: true
  validates :body, presence: true
end
