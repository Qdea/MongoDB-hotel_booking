db.createView("user_info", "user", [
  {
    $lookup:
      {
        from: "baseaddress",
        localField: "baseaddressid",
        foreignField: "_id",
        as: "addressDocs"
      }
  },
  {
    $project: {
      _id: 1,
      user_id: "$user._id",
      firstname: 1,
      lastname: 1,
      role: 1,
      address: "$addressDocs"
    }
  }
])

db.user.createIndex({ firstname: "text", lastname: "text", email: "text", role: "text" }, {
  name: "user_search_text",
  weights: {
    firstname: 8,
    lastname: 6,
    role: 4,
    email: 2
  }
})