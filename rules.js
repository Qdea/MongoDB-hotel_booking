const baseaddressRules = {
  "$jsonSchema":
    {
      "bsonType": "object",
      "additionalProperties": false,
      "required": ["phone", "city"],
      "properties": {
        "_id": {"bsonType": "objectId"},
        "phone": {"bsonType": "string"},
        "createdat": {"bsonType": "string"},
        "lastupdate": {"bsonType": "string"},
        "city": {
          "bsonType": "object",
          "additionalProperties": false,
          "required": ["name", "country"],
          "properties": {
            "name": {"bsonType": "string"},
            "createdat": {"bsonType": "string"},
            "lastupdate": {"bsonType": "string"},
            "country": {
              "bsonType": "object",
              "additionalProperties": false,
              "required": ["code", "name"],
              "properties": {
                "code": {"bsonType": "string", "minLength": 3},
                "name": {"bsonType": "string", "maxLength": 255},
                "createdat": {"bsonType": "string"},
                "lastupdate": {"bsonType": "string"}
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
        "createdat": {"bsonType": "string"},
        "lastupdate": {"bsonType": "string"},
        "hoteltype": {
          "bsonType": "object",
          "additionalProperties": false,
          "required": ["name", "description"],
          "properties": {
            "name": {"bsonType": "string"},
            "createdat": {"bsonType": "string"},
            "lastupdate": {"bsonType": "string"},
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
            "createdat": {"bsonType": "string"},
            "lastupdate": {"bsonType": "string"},
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
            "createdat": {"bsonType": "string"},
            "lastupdate": {"bsonType": "string"},
            "description": {"bsonType": "string", "maxLength": 255},
            "categories": {
              "bsonType": "array",
              "additionalProperties": false,
              "required": ["name"],
              "properties": {
                "description": {"bsonType": "string", "maxLength": 255},
                "name": {"bsonType": "string", "maxLength": 50},
                "createdat": {"bsonType": "string"},
                "lastupdate": {"bsonType": "string"}
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
        "createdat": {"bsonType": "string"},
        "lastupdate": {"bsonType": "string"},
        "lastlogin": {"bsonType": "string"},
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
        "createdat": {"bsonType": "string"},
        "lastupdate": {"bsonType": "string"},
        "rentaldate": {"bsonType": "string"},
        "returndate": {"bsonType": "string"},
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
        "createdat": {"bsonType": "string"},
        "lastupdate": {"bsonType": "string"},
        "paymentdate": {"bsonType": "string"},
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
        "createdat": {"bsonType": "string"},
        "lastupdate": {"bsonType": "string"},
        "description": {"bsonType": "string", "maxLength": 255},
        "hotelid": {"bsonType": "objectId"},
        "prices": {
          "bsonType": "array",
          "additionalProperties": false,
          "required": ["price", "period"],
          "properties": {
            "price": {"bsonType": "double"},
            "createdat": {"bsonType": "string"},
            "lastupdate": {"bsonType": "string"},
            "period": {
              "bsonType": "object",
              "additionalProperties": false,
              "required": ["startdate", "finishdate"],
              "properties": {
                "createdat": {"bsonType": "string"},
                "startdate": {"bsonType": "string"},
                "finishdate": {"bsonType": "string"},
                "lastupdate": {"bsonType": "string"}
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
//or cd C:\Users\ivano\MongoDB-rules && mongosh --host 127.0.0.1 --port 27018 -u test -p test -f rules.js на винде