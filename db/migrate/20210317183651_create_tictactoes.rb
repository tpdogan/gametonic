class CreateTictactoes < ActiveRecord::Migration[6.1]
  def change
    create_table :tictactoes do |t|
      t.string :board, default: Array.new(9,'0').join(',')

      t.timestamps
    end
  end
end
