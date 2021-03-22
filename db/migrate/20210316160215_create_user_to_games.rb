class CreateUserToGames < ActiveRecord::Migration[6.1]
  def change
    create_table :user_to_games do |t|
      # Each users points for a game are added
      t.integer :user_id
      t.integer :game_id

      t.integer :points, default: 0

      t.timestamps
    end
  end
end
