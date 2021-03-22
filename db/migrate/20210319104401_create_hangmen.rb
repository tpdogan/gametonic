class CreateHangmen < ActiveRecord::Migration[6.1]
  def change
    create_table :hangmen do |t|
      # Word is the selected word for the game
      t.string :word
      # Letters are the guessed letters
      # The reason to keep them at database is to avoid user interference / hacking
      # Also this allows improvement to interface for any additional information
      t.string :letters, default: ''

      t.timestamps
    end
  end
end
