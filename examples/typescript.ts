import * as josie from 'josie-builder';

declare module 'josie-builder' {
  export function customFunction(): josie.Builder;
  export interface SchemaObject {
    // $id: number;
    customKeyword: string;
  }
}

const schemaObject: josie.SchemaObject = {
  $id: '#foo',
  customKeyword: 'string'
};

console.log(JSON.stringify(josie(schemaObject), null, 2));
console.log(JSON.stringify(new josie.Builder(schemaObject), null, 2));
console.log(JSON.stringify(josie.required().readOnly(true).properties({ count: josie.type('number') }), null, 2));

console.log(JSON.stringify(josie.object({
  name: josie.string().required(),
  email: josie.string('email').required(),
  age: josie.number(),
  roles: josie.array(josie.object({
    type: josie.enum(['exclusive', 'shared']),
    rolId: josie.string('uuid').required()
  }))

}), null, 2));
