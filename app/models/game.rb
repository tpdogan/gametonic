class Game < ApplicationRecord
  has_many :userToGames
  has_many :users, through: :userToGames
end
