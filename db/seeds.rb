# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Each games is seeded
Game.create(:name => 'Tic Tac Toe', :image => 'https://res.cloudinary.com/dan7xvmnt/image/upload/v1617015760/gametonic/xox_bawxa5.jpg')
Game.create(:name => 'Mastermind', :image => 'https://res.cloudinary.com/dan7xvmnt/image/upload/v1617015760/gametonic/mastermind_nhlxwm.jpg')
Game.create(:name => 'Hangman', :image => 'https://res.cloudinary.com/dan7xvmnt/image/upload/v1617015760/gametonic/hangman_lp2kld.jpg')
Game.create(:name => 'Memory Card', :image => 'https://res.cloudinary.com/dan7xvmnt/image/upload/v1617015760/gametonic/memory_lyqv4r.jpg')