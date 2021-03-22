class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      # Games have names and images for gamecards
      t.string :name
      t.string :image

      t.timestamps
    end
  end
end
