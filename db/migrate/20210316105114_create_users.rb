class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      # Users will only have username
      # Additional password etc can be done
      t.string :username

      t.timestamps
    end
  end
end
