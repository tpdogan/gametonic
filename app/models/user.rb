class User < ApplicationRecord
  has_many :userToGames
  has_many :games, through: :userToGames

  validates :username, length: { minimum: 6 }, presence: true
end
