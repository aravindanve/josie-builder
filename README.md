# Josie Builder
##### By [@aravindanve](https://github.com/aravindanve)

Josie Builder allows you to build a schema by chaining JSON Schema keywords.

## Usage

Install using NPM:
```bash
npm i -S josie-builder
```

Basic Usage:
```ts
import * as josie from 'josie-builder';

const person = josie.object({
  name: josie.string().required(),
  email: josie.string('email').required(),
  age: josie.number(),
  roles: josie.array(josie.object({
    type: josie.enum(['exclusive', 'shared']),
    rolId: josie.string('uuid').required()
  }))
});

// compiles and outputs serializable object
person.toJSON();
```

Generated Schema Output:
```json
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
```

### Keywords Support:

All keywords as of [JSON Schema Draft 7](http://json-schema.org/specification-links.html#draft-7) are supported.

### Custom Methods Usage:

Custom Keywords (Type Only):
```ts
declare global {
  interface JosieSchemaObject {
    customKeyword?: string;
  }
}

const schema: JosieBuilder.Schema = {
  $id: '#foo',
  customKeyword: 'my-value'
};
```

Custom Static Methods:
```ts
// define custom method type
declare global {
  interface JosieBuilderStatic {
    email(): JosieBuilder;
  }
}

// define custom method
josie.addMethod('email', () => josie.string('email'));

// use custom method
const schema = josie.object({
  name: josie.string(),
  email: josie.email()
});
```

## Tests

Clone Repository:
```bash
git clone https://github.com/aravindanve/josie-builder
```

Run Tests:
```bash
npm run test
```
