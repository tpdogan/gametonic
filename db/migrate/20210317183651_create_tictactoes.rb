class CreateTictactoes < ActiveRecord::Migration[6.1]
  def change
    create_table :tictactoes do |t|
      # Board has 9 tiles default to zero
      t.string :board, default: Array.new(9,'0').join(',')

      t.timestamps
    end
  end
end
