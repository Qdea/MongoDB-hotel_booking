const baseaddressRules = {
  "$jsonSchema":
    {
      "bsonType": "object",
      "additionalProperties": false,
      "required": ["phone", "city"],
      "properties": {
        "_id": {"bsonType": "objectId"},
        "phone": {"bsonType": "string"},
        "createdAt": {"bsonType": "date"},
        "lastUpdate": {"bsonType": "date"},
        "city": {
          "bsonType": "object",
          "additionalProperties": false,
          "required": ["name", "country"],
          "properties": {
            "name": {"bsonType": "string"},
            "createdat": {"bsonType": "date"},
            "lastupdate": {"bsonType": "date"},
            "country": {
              "bsonType": "object",
              "additionalProperties": false,
              "required": ["code", "name"],
              "properties": {
                "code": {"bsonType": "string", "minLength": 3},
                "name": {"bsonType": "string", "maxLength": 255},
                "createdat": {"bsonType": "date"},
                "lastupdate": {"bsonType": "date"}
              }
            },
          }
        },
      }
    },
};

const hotelRules = {
  "$jsonSchema":
    {
      "bsonType": "object",
      "additionalProperties": false,
      "required": ["name", "hoteltype", "services", "fulladdress"],
      "properties": {
        "_id": {"bsonType": "objectId"},
        "name": {"bsonType": "string"},
        "rating": {"bsonType": "double"},
        "createdat": {"bsonType": "date"},
        "lastupdate": {"bsonType": "date"},
        "hoteltype": {
          "bsonType": "object",
          "additionalProperties": false,
          "required": ["name", "description"],
          "properties": {
            "name": {"bsonType": "string"},
            "createdat": {"bsonType": "date"},
            "lastupdate": {"bsonType": "date"},
            "description": {"bsonType": "string", "maxLength": 255}
          }
        },
        "fulladdress": {
          "bsonType": "object",
          "additionalProperties": false,
          "required": ["baseaddressid"],
          "properties": {
            "street": {"bsonType": "string"},
            "house": {"bsonType": "int"},
            "building": {"bsonType": "int"},
            "createdat": {"bsonType": "date"},
            "lastupdate": {"bsonType": "date"},
            "baseaddressid": {"bsonType": "objectId"}
          }
        },
        "description": {"bsonType": "string", "maxLength": 255},
        "services": {
          "bsonType": "array",
          "additionalProperties": false,
          "required": ["name", "categories"],
          "properties": {
            "name": {"bsonType": "string"},
            "createdat": {"bsonType": "date"},
            "lastupdate": {"bsonType": "date"},
            "description": {"bsonType": "string", "maxLength": 255},
            "categories": {
              "bsonType": "array",
              "additionalProperties": false,
              "required": ["name"],
              "properties": {
                "description": {"bsonType": "string", "maxLength": 255},
                "name": {"bsonType": "string", "maxLength": 50},
                "createdat": {"bsonType": "date"},
                "lastupdate": {"bsonType": "date"}
              }
            }
          }
        }
      }
    },
};

const userRules = {
  "$jsonSchema":
    {
      "bsonType": "object",
      "additionalProperties": false,
      "required": ["firstname", "lastname", "email", "password"],
      "properties": {
        "_id": {"bsonType": "objectId"},
        "firstname": {"bsonType": "string"},
        "lastname": {"bsonType": "string"},
        "email": {"bsonType": "string"},
        "password": {"bsonType": "string"},
        "createdat": {"bsonType": "date"},
        "lastupdate": {"bsonType": "date"},
        "lastlogin": {"bsonType": "date"},
        "addressid": {"bsonType": "objectId"},
        "role": {"bsonType": "string"},
        "hotels": {
          "bsonType": "array",
          "additionalProperties": false,
          "required": ["_id"],
          "properties": {
            "_id": {"bsonType": "objectId"}
          }
        }
      }
    },
};

const reservationRules = {
  "$jsonSchema":
    {
      "bsonType": "object",
      "additionalProperties": false,
      "required": ["userid", "hotelid", "status"],
      "properties": {
        "_id": {"bsonType": "objectId"},
        "createdat": {"bsonType": "date"},
        "lastupdate": {"bsonType": "date"},
        "rentaldate": {"bsonType": "date"},
        "returndate": {"bsonType": "date"},
        "description": {"bsonType": "string", "maxLength": 255},
        "userid": {"bsonType": "objectId"},
        "hotelid": {"bsonType": "objectId"},
        "status": {"bsonType": "string"}
      }
    },
};
const paymentRules = {
  "$jsonSchema":
    {
      "bsonType": "object",
      "additionalProperties": false,
      "required": ["reservationid", "userid"],
      "properties": {
        "_id": {"bsonType": "objectId"},
        "createdat": {"bsonType": "date"},
        "lastupdate": {"bsonType": "date"},
        "paymentdate": {"bsonType": "date"},
        "reservationid": {"bsonType": "objectId"},
        "userid": {"bsonType": "objectId"},
        "amount": {"bsonType": "double"}
      }
    },
};

const roomRules = {
  "$jsonSchema":
    {
      "bsonType": "object",
      "additionalProperties": false,
      "required": ["name", "amount", "hotelid", "price"],
      "properties": {
        "_id": {"bsonType": "objectId"},
        "name": {"bsonType": "string"},
        "amount": {"bsonType": "int"},
        "createdat": {"bsonType": "date"},
        "lastupdate": {"bsonType": "date"},
        "description": {"bsonType": "string", "maxLength": 255},
        "hotelid": {"bsonType": "objectId"},
        "prices": {
          "bsonType": "array",
          "additionalProperties": false,
          "required": ["price", "period"],
          "properties": {
            "price": {"bsonType": "double"},
            "createdat": {"bsonType": "date"},
            "lastupdate": {"bsonType": "date"},
            "period": {
              "bsonType": "object",
              "additionalProperties": false,
              "required": ["startdate", "finishdate"],
              "properties": {
                "createdat": {"bsonType": "date"},
                "startdate": {"bsonType": "date"},
                "finishdate": {"bsonType": "date"},
                "lastupdate": {"bsonType": "date"}
              }
            }
          }
        }
      }
    },
};
db.runCommand({"collMod": "baseaddress", "validator": baseaddressRules});
db.runCommand({"collMod": "hotel", "validator": hotelRules});
db.runCommand({"collMod": "user", "validator": userRules});
db.runCommand({"collMod": "reservation", "validator": reservationRules});
db.runCommand({"collMod": "payment", "validator": paymentRules});
db.runCommand({"collMod": "room", "validator": roomRules});