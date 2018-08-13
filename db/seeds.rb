# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

test1 = Quote.create(
  mood: 'motivation',
  body: 'this is a test',
  author: 'author'
)

test2 = Quote.create(
  mood: 'sad',
  body: 'this is a test2',
  author: 'author2'
)

test3 = Quote.create(
  mood: 'inspirational',
  body: 'this is a test3',
  author: 'author3'
)
