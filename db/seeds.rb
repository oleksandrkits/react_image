100.times do
  Image.create!(url: Faker::Avatar.image)
end

puts '100 images created!'
