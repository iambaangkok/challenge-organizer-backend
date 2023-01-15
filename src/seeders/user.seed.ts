const user_json = [
    {
        "_id": {
          "$oid": "45c9e7d8b8d00f9aa7e7f18a"
        },
        "username": "johndoe",
        "passoerdHasd": "$2a$10$b2yJz0/H8sdjhjgsdfgsdfg.J5aJI7H5G5f.g5a5J5I5J5a5J",
        "name": {
          "fname": "John",
          "lname": "Doe"
        },
        "rating": 4.5,
        "challenge ": {
          "joinedChallenge ": {
            "task": [
              {
                  "name": "Run a marathon",
                  "status": "Completed"
              },
              {
                  "name": "Climb Mount Everest",
                  "status": "In Progress"
              }
            ]
          },
          "banChallenge ": [
            "Drug use"
          ],
          "createdChallenge ": [
            "Swim across the English Channel"
          ]
        },
        "inventory ": [
          {
              "itemName": "Tent",
              "quantity": 1
          },
          {
              "itemName": "Sleeping Bag",
              "quantity": 1
          }
        ],
        "coin ": {
          "$numberLong": "10000"
        },
        "profileImg ": "https://example.com/images/johndoe.jpg",
        "equipFrame": {
          "frameName": "Carbon Fiber",
          "brandName": "Trek"
        },
        "statusBan ": false,
        "task ": "Training for next marathon",
        "isAdmin ": true
      }
]