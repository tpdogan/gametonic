class CreateMasterminds < ActiveRecord::Migration[6.1]
  def change
    create_table :masterminds do |t|
      # Board has 4 colors at each round (total 12 rounds)
      t.string :board, default: Array.new(12,'0000').join(',')
      # Code corresponds to color
      t.string :code, default: '9999'
      # Color and place are the checked for each round
      t.string :colorPlace, default: Array.new(12,'00').join(',')

      t.timestamps
    end
  end
end
