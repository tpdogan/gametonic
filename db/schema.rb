# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_19_104401) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "hangmen", force: :cascade do |t|
    t.string "word"
    t.string "letters", default: ""
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "masterminds", force: :cascade do |t|
    t.string "board", default: "0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000"
    t.string "code", default: "9999"
    t.string "colorPlace", default: "00,00,00,00,00,00,00,00,00,00,00,00"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "memorycards", force: :cascade do |t|
    t.string "board", default: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
    t.string "open", default: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tictactoes", force: :cascade do |t|
    t.string "board", default: "0,0,0,0,0,0,0,0,0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_to_games", force: :cascade do |t|
    t.integer "user_id"
    t.integer "game_id"
    t.integer "points", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
