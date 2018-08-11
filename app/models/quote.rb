class Quote < ApplicationRecord
  validates :mood, presence: true
  validates :body, presence: true
end
