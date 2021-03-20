class CreateMasterminds < ActiveRecord::Migration[6.1]
  def change
    create_table :masterminds do |t|
      t.string :board, default: Array.new(12,'0000').join(',')
      t.string :code, default: '9999'
      t.string :colorPlace, default: Array.new(12,'00').join(',')

      t.timestamps
    end
  end
end
