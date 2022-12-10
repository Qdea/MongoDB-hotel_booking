db.createUser({
  user: "qdea",
  pwd: "qwerty",
  roles: [  {role: "readWrite", db: "hotel_booking" }  ]
})