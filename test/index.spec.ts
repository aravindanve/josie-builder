import 'mocha';
import { expect } from 'chai';
import josie from '../src';

const a: JosieBuilder.SchemaType = 'string';

describe('josie()', () => {
  it('must be a function', () => {
    expect(josie).to.be.a('function');
  });

  it('josie() must return an instance of the Builder', () => {
    expect(josie()).to.be.an.instanceOf(josie.Builder);
    expect(josie({})).to.be.an.instanceOf(josie.Builder);
    expect(josie(josie())).to.be.an.instanceOf(josie.Builder);
  });

  it('josie(boolean) argument must return a boolean value', () => {
    expect(josie(true)).to.eq(true);
    expect(josie(false)).to.eq(false);
  });

  it('josie(invalid) must throw TypeError', () => {
    expect(() => josie.call(josie, 1)).to.throw('Schema must be of type boolean or object');
  });

  it('josie() must return an empty schema', () => {
    expect(josie().toJSON()).to.deep.eq({});
  });
});

describe('josie.concat()', () => {
  it('must concat one or more schemas', () => {
    expect(josie.concat({ type: 'string' }).toJSON()).to.deep.eq({ type: 'string' });
    expect(josie.concat({ type: 'string' }, { format: 'email' }).toJSON()).to.deep.eq({ type: 'string', format: 'email' });
    expect(josie.concat({ type: 'string' }, { type: 'number' }).toJSON()).to.deep.eq({ type: 'number' });
    expect(josie.concat({ type: 'string' }, { format: 'uri' }, josie.string().maxLength(10)).toJSON()).to.deep.eq({ type: 'string', format: 'uri', maxLength: 10 });
  });
});

describe('josie.Builder.toJSON()', () => {
  it('must convert values to json properly', () => {
    expect(josie.Builder.toJSON(undefined)).to.eq(undefined);
    expect(josie.Builder.toJSON(null)).to.eq(null);
    expect(josie.Builder.toJSON(true)).to.eq(true);
    expect(josie.Builder.toJSON(false)).to.eq(false);
    expect(josie.Builder.toJSON(245)).to.eq(245);
    expect(josie.Builder.toJSON('abc')).to.eq('abc');
    expect(josie.Builder.toJSON([1, 'abc', false])).to.deep.eq([1, 'abc', false]);
    expect(josie.Builder.toJSON({ name: 'a', age: 235 })).to.deep.eq({ name: 'a', age: 235 });
    expect(josie.Builder.toJSON(josie.array(josie.string()))).to.deep.eq({
      type: 'array',
      items: {
        type: 'string'
      }
    });
  });
});

describe('josie special methods', () => {
  it('$$compile() must compile cache', () => {
    const schema = josie.array(josie.string());

    expect(schema['_cache']).to.eq(undefined);
    schema.$$compile();
    expect(schema['_cache']).to.not.eq(undefined);
  });

  it('$$clean() must clean cache', () => {
    const schema = josie.array(josie.string());

    schema.$$compile();
    expect(schema['_cache']).to.not.eq(undefined);
    schema.$$clean();
    expect(schema['_cache']).to.eq(undefined);
  });

  it('toJSON() must return from cache once compiled', () => {
    const schema = josie.array(josie.string());

    expect(schema.toJSON() === schema.toJSON()).to.eq(true);
  });
});

describe('josie annotations', () => {
  it('$id() must set $id', () => {
    expect(josie.$id('#foo').toJSON()).to.deep.eq({ $id: '#foo' });
  });

  it('$ref() must set $ref', () => {
    expect(josie.$ref('#foo').toJSON()).to.deep.eq({ $ref: '#foo' });
  });

  it('$comment() must set $comment', () => {
    expect(josie.$comment('this is a comment').toJSON()).to.deep.eq({ $comment: 'this is a comment' });
  });

  it('title() must set title', () => {
    expect(josie.title('this is a title').toJSON()).to.deep.eq({ title: 'this is a title' });
  });

  it('description() must set description', () => {
    expect(josie.description('this is a description').toJSON()).to.deep.eq({ description: 'this is a description' });
  });

  it('default() must set default', () => {
    expect(josie.default(2356).toJSON()).to.deep.eq({ default: 2356 });
  });

  it('readOnly() must set readOnly', () => {
    expect(josie.readOnly(true).toJSON()).to.deep.eq({ readOnly: true });
  });

  it('examples() must set examples', () => {
    expect(josie.examples([{}]).toJSON()).to.deep.eq({ examples: [{}] });
  });

  it('definitions() must set definitions', () => {
    expect(josie.definitions({
      schema1: josie.string(),
      schema2: josie.integer().exclusiveMaximum(20)

    }).toJSON()).to.deep.eq({
      definitions: {
        schema1: {
          type: 'string'
        },
        schema2: {
          type: 'integer',
          exclusiveMaximum: 20
        }
      }
    });
  });
});

describe('josie validation keywords', () => {
  it('type() must set type', () => {
    expect(josie.type('string').toJSON()).to.deep.eq({ type: 'string' });
    expect(josie.type('null').toJSON()).to.deep.eq({ type: 'null' });
    expect(josie.type(['number', 'array']).toJSON()).to.deep.eq({ type: ['number', 'array'] });
  });

  it('const() must set const', () => {
    expect(josie.const(33).toJSON()).to.deep.eq({ const: 33 });
  });

  it('enum() must set enum', () => {
    expect(josie.enum([1, 'a', {}]).toJSON()).to.deep.eq({ enum: [1, 'a', {}] });
  });

  it('multipleOf() must set multipleOf', () => {
    expect(josie.multipleOf(40).toJSON()).to.deep.eq({ multipleOf: 40 });
  });

  it('maximum() must set maximum', () => {
    expect(josie.maximum(40).toJSON()).to.deep.eq({ maximum: 40 });
  });

  it('exclusiveMaximum() must set exclusiveMaximum', () => {
    expect(josie.exclusiveMaximum(40).toJSON()).to.deep.eq({ exclusiveMaximum: 40 });
  });

  it('minimum() must set minimum', () => {
    expect(josie.minimum(40).toJSON()).to.deep.eq({ minimum: 40 });
  });

  it('exclusiveMinimum() must set exclusiveMinimum', () => {
    expect(josie.exclusiveMinimum(40).toJSON()).to.deep.eq({ exclusiveMinimum: 40 });
  });

  it('maxLength() must set maxLength', () => {
    expect(josie.maxLength(40).toJSON()).to.deep.eq({ maxLength: 40 });
  });

  it('minLength() must set minLength', () => {
    expect(josie.minLength(40).toJSON()).to.deep.eq({ minLength: 40 });
  });

  it('pattern() must set pattern', () => {
    expect(josie.pattern('^abc$').toJSON()).to.deep.eq({ pattern: '^abc$' });
    expect(josie.pattern(/^abc$/).toJSON()).to.deep.eq({ pattern: '^abc$' });
  });

  it('items() must set items', () => {
    expect(josie.items(true).toJSON()).to.deep.eq({ items: true });
    expect(josie.items(josie.number()).toJSON()).to.deep.eq({ items: { type: 'number' } });
    expect(josie.items([josie.number(), josie.null()]).toJSON()).to.deep.eq({ items: [{ type: 'number' }, { type: 'null' }] });
  });

  it('additionalItems() must set additionalItems', () => {
    expect(josie.additionalItems(true).toJSON()).to.deep.eq({ additionalItems: true });
    expect(josie.additionalItems(josie.number()).toJSON()).to.deep.eq({ additionalItems: { type: 'number' } });
  });

  it('maxItems() must set maxItems', () => {
    expect(josie.maxItems(40).toJSON()).to.deep.eq({ maxItems: 40 });
  });

  it('minItems() must set minItems', () => {
    expect(josie.minItems(40).toJSON()).to.deep.eq({ minItems: 40 });
  });

  it('uniqueItems() must set uniqueItems', () => {
    expect(josie.uniqueItems(true).toJSON()).to.deep.eq({ uniqueItems: true });
    expect(josie.uniqueItems(false).toJSON()).to.deep.eq({ uniqueItems: false });
  });

  it('contains() must set contains', () => {
    expect(josie.contains(true).toJSON()).to.deep.eq({ contains: true });
    expect(josie.contains(false).toJSON()).to.deep.eq({ contains: false });
    expect(josie.contains(josie()).toJSON()).to.deep.eq({ contains: {} });
    expect(josie.contains(josie.string()).toJSON()).to.deep.eq({ contains: { type: 'string' } });
  });

  it('maxProperties() must set maxProperties', () => {
    expect(josie.maxProperties(40).toJSON()).to.deep.eq({ maxProperties: 40 });
  });

  it('minProperties() must set minProperties', () => {
    expect(josie.minProperties(40).toJSON()).to.deep.eq({ minProperties: 40 });
  });

  it('required() must set required', () => {
    expect((josie.object({
      name: josie.required(),
      age: josie.required(),
      location: true,
      qualification: josie.required(),
      interests: josie.required(false)

    }).toJSON() as JosieBuilder.SchemaObject).required).to.deep.eq([
      'name',
      'age',
      'qualification'
    ]);
  });

  it('properties() must set properties', () => {
    expect(josie.properties({
      one: josie.number(),
      two: josie.string()

    }).toJSON()).to.deep.eq({
      properties: {
        one: { type: 'number' },
        two: { type: 'string' }
      }
    });
  });

  it('patternProperties() must set patternProperties', () => {
    expect(josie.patternProperties({
      '^count_': josie.number()

    }).toJSON()).to.deep.eq({
      patternProperties: {
        '^count_': { type: 'number' }
      }
    });
  });

  it('additionalProperties() must set additionalProperties', () => {
    expect(josie.additionalProperties(true).toJSON()).to.deep.eq({ additionalProperties: true });
    expect(josie.additionalProperties(josie.number()).toJSON()).to.deep.eq({
      additionalProperties: { type: 'number' }
    });
  });

  it('dependencies() must set dependencies', () => {
    expect(josie.dependencies({
      one: ['two', 'three'],
      two: josie.object({ three: josie.string('email') })

    }).toJSON()).to.deep.eq({
      dependencies: {
        one: ['two', 'three'],
        two: {
          type: 'object',
          properties: {
            three: {
              type: 'string',
              format: 'email'
            }
          }
        }
      }
    });
  });

  it('propertyNames() must set propertyNames', () => {
    expect(josie.propertyNames(josie.string('email')).toJSON()).to.deep.eq({
      propertyNames: {
        type: 'string',
        format: 'email'
      }
    });
  });

  it('format() must set format', () => {
    expect(josie.format('email').toJSON()).to.deep.eq({
      format: 'email'
    });
  });

  it('contentMediaType() must set contentMediaType', () => {
    expect(josie.contentMediaType('image/png').toJSON()).to.deep.eq({
      contentMediaType: 'image/png'
    });
  });

  it('contentEncoding() must set contentEncoding', () => {
    expect(josie.contentEncoding('base64').toJSON()).to.deep.eq({
      contentEncoding: 'base64'
    });
  });

  it('if() must set if, then, else', () => {
    expect(josie.if(josie.string()).toJSON()).to.deep.eq({
      if: {
        type: 'string'
      }
    });

    expect(josie.if(josie.string(), josie.format('email')).toJSON()).to.deep.eq({
      if: {
        type: 'string'
      },
      then: {
        format: 'email'
      }
    });

    expect(josie.if(josie.string(), null, josie.array().maxItems(2)).toJSON()).to.deep.eq({
      if: {
        type: 'string'
      },
      else: {
        type: 'array',
        maxItems: 2
      }
    });

    expect(josie.if(josie.string(), josie.format('email'), josie.array().maxItems(2)).toJSON()).to.deep.eq({
      if: {
        type: 'string'
      },
      then: {
        format: 'email'
      },
      else: {
        type: 'array',
        maxItems: 2
      }
    });
  });

  it('allOf() must set allOf', () => {
    expect(josie.allOf([josie.maxLength(10), josie.minLength(5)]).toJSON()).to.deep.eq({
      allOf: [
        { maxLength: 10 },
        { minLength: 5 }
      ]
    });
  });

  it('anyOf() must set anyOf', () => {
    expect(josie.anyOf([josie.maxLength(10), josie.minLength(5)]).toJSON()).to.deep.eq({
      anyOf: [
        { maxLength: 10 },
        { minLength: 5 }
      ]
    });
  });

  it('oneOf() must set oneOf', () => {
    expect(josie.oneOf([josie.maxLength(10), josie.minLength(5)]).toJSON()).to.deep.eq({
      oneOf: [
        { maxLength: 10 },
        { minLength: 5 }
      ]
    });
  });

  it('not() must set not', () => {
    expect(josie.not(josie.string()).toJSON()).to.deep.eq({
      not: {
        type: 'string'
      }
    });
  });
});

describe('josie quick methods', () => {
  it('null() must return the correct schema', () => {
    expect(josie.null().toJSON()).to.deep.eq({ type: 'null' });
  });

  it('boolean() must return the correct schema', () => {
    expect(josie.boolean().toJSON()).to.deep.eq({ type: 'boolean' });
  });

  it('nullOrBoolean() must return the correct schema', () => {
    expect(josie.nullOrBoolean().toJSON()).to.deep.eq({ type: ['null', 'boolean'] });
  });

  it('number() must return the correct schema', () => {
    expect(josie.number().toJSON()).to.deep.eq({ type: 'number' });
  });

  it('nullOrNumber() must return the correct schema', () => {
    expect(josie.nullOrNumber().toJSON()).to.deep.eq({ type: ['null', 'number'] });
  });

  it('integer() must return the correct schema', () => {
    expect(josie.integer().toJSON()).to.deep.eq({ type: 'integer' });
  });

  it('nullOrInteger() must return the correct schema', () => {
    expect(josie.nullOrInteger().toJSON()).to.deep.eq({ type: ['null', 'integer'] });
  });

  it('string() must return the correct schema', () => {
    expect(josie.string().toJSON()).to.deep.eq({ type: 'string' });
    expect(josie.string('email').toJSON()).to.deep.eq({ type: 'string', format: 'email' });
  });

  it('nullOrString() must return the correct schema', () => {
    expect(josie.nullOrString().toJSON()).to.deep.eq({ type: ['null', 'string'] });
    expect(josie.nullOrString('email').toJSON()).to.deep.eq({ type: ['null', 'string'], format: 'email' });
  });

  it('array() must return the correct schema', () => {
    expect(josie.array().toJSON()).to.deep.eq({ type: 'array' });
    expect(josie.array(josie.string()).toJSON()).to.deep.eq({ type: 'array', items: { type: 'string' } });
    expect(josie.array([josie.number()], josie.string()).toJSON()).to.deep.eq({
      type: 'array',
      items: [{ type: 'number' }],
      additionalItems: { type: 'string' }
    });
  });

  it('nullOrArray() must return the correct schema', () => {
    expect(josie.nullOrArray().toJSON()).to.deep.eq({ type: ['null', 'array'] });
    expect(josie.nullOrArray(josie.string()).toJSON()).to.deep.eq({ type: ['null', 'array'], items: { type: 'string' } });
    expect(josie.nullOrArray([josie.number()], josie.string()).toJSON()).to.deep.eq({
      type: ['null', 'array'],
      items: [{ type: 'number' }],
      additionalItems: { type: 'string' }
    });
  });

  it('object() must return the correct schema', () => {
    expect(josie.object().toJSON()).to.deep.eq({ type: 'object' });
    expect(josie.object({ name: josie.string() }).toJSON()).to.deep.eq({ type: 'object', properties: { name: { type: 'string' }} });
    expect(josie.object({ name: josie.string() }, josie.number()).toJSON()).to.deep.eq({
      type: 'object',
      properties: { name: { type: 'string' }},
      additionalProperties: { type: 'number' }
    });
  });

  it('nullOrObject() must return the correct schema', () => {
    expect(josie.nullOrObject().toJSON()).to.deep.eq({ type: ['null', 'object'] });
    expect(josie.nullOrObject({ name: josie.string() }).toJSON()).to.deep.eq({ type: ['null', 'object'], properties: { name: { type: 'string' } } });
    expect(josie.nullOrObject({ name: josie.string() }, josie.number()).toJSON()).to.deep.eq({
      type: ['null', 'object'],
      properties: { name: { type: 'string' } },
      additionalProperties: { type: 'number' }
    });
  });
});

declare global {
  interface JosieBuilderStatic {
    email(): JosieBuilder;
  }
}

describe('josie custom methods', () => {
  it('must work properly', () => {
    josie.email = () => josie.string('email');

    expect(josie.email().toJSON()).to.deep.eq({ type: 'string', format: 'email' });
  });
});
