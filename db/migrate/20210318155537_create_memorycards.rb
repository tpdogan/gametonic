class CreateMemorycards < ActiveRecord::Migration[6.1]
  def change
    create_table :memorycards do |t|
      t.string :board, default: Array.new(16, 0).join(',')
      t.string :open, default: Array.new(16, 0).join(',')
      t.integer :clicks, default: 0

      t.timestamps
    end
  end
end
