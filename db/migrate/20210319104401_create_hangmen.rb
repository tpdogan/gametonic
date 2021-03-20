class CreateHangmen < ActiveRecord::Migration[6.1]
  def change
    create_table :hangmen do |t|
      t.string :word
      t.string :letters, default: ''

      t.timestamps
    end
  end
end
