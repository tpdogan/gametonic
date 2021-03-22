class CreateMemorycards < ActiveRecord::Migration[6.1]
  def change
    create_table :memorycards do |t|
      # Board is made for 16 tiles
      t.string :board, default: Array.new(16, 0).join(',')
      # Opened tiles are saved as 1 (true), default is closed 0 (false)
      t.string :open, default: Array.new(16, 0).join(',')
      # Number of clicks is needed for points
      t.integer :clicks, default: 0

      t.timestamps
    end
  end
end
