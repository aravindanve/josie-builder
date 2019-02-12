const josie = require('..');

const person = josie.object({
  name: josie.string().required(),
  email: josie.string('email').required(),
  age: josie.number(),
  roles: josie.array(josie.object({
    type: josie.enum(['exclusive', 'shared']),
    rolId: josie.string('uuid').required()
  }))
});

console.log(JSON.stringify(person, null, 2));
/* console output:
  {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "email": {
        "type": "string",
        "format": "email"
      },
      "age": {
        "type": "number"
      },
      "roles": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "type": {
              "enum": [
                "exclusive",
                "shared"
              ]
            },
            "rolId": {
              "type": "string",
              "format": "uuid"
            }
          },
          "required": [
            "rolId"
          ]
        }
      }
    },
    "required": [
      "name",
      "email"
    ]
  }
*/
