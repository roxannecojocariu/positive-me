class User < ApplicationRecord
  has_many :favorited_quotes
  has_many :quotes, through: :favorited_quotes
  has_many :created_quotes, foreign_key: "creator_id", class_name: "Quote"

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def admin?
    role == "admin"
  end
end
