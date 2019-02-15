import common = require('./common');
import Builder = require('./Builder');

declare type _Builder = Builder;
declare const _Builder: typeof Builder;

declare function BuilderFactory(value: boolean): boolean;
declare function BuilderFactory(schema?: Builder | common.SchemaObjectLike<Builder>): Builder;
declare namespace BuilderFactory {
  export import SchemaType = common.SchemaType;
  export import SchemaLike = common.SchemaLike;
  export import Schema = common.Schema;
  export import SchemaDependencies = common.SchemaDependencies;
  export import SchemaMap = common.SchemaMap;
  export import SchemaCustomKeywords = common.SchemaCustomKeywords;
  export import SchemaObjectLike = common.SchemaObjectLike;
  export import SchemaObject = common.SchemaObject;

  export type Builder = _Builder;
  export const Builder: typeof _Builder;

  export const toJSON: (value: any) => any;
  export const compile: (builder: Builder) => SchemaObject;
  export const clean: (builder: Builder) => void;

  export const boolean: () => Builder;
  export const nullOrBoolean: () => Builder;
  export const number: () => Builder;
  export const nullOrNumber: () => Builder;
  export const integer: () => Builder;
  export const nullOrInteger: () => Builder;
  export const string: (format?: string) => Builder;
  export const nullOrString: (format?: string) => Builder;
  export const array: (items?: Builder | SchemaLike<Builder> | (Builder | SchemaLike<Builder>)[], additionalItems?: Builder | SchemaLike<Builder>) => Builder;
  export const nullOrArray: (items?: Builder | SchemaLike<Builder> | (Builder | SchemaLike<Builder>)[], additionalItems?: Builder | SchemaLike<Builder>) => Builder;
  export const object: (properties?: SchemaMap<Builder | SchemaLike<Builder>>, additionalProperties?: Builder | SchemaLike<Builder>) => Builder;
  export const nullOrObject: (properties?: SchemaMap<Builder | SchemaLike<Builder>>, additionalProperties?: Builder | SchemaLike<Builder>) => Builder;

  export const addMethod: (name: string, fn: Function) => typeof BuilderFactory;
  export const removeMethod: (name: string) => typeof BuilderFactory;

  export const concat: typeof Builder.prototype.concat;
  export const $id: typeof Builder.prototype.$id;
  export const $ref: typeof Builder.prototype.$ref;
  export const $comment: typeof Builder.prototype.$comment;
  export const title: typeof Builder.prototype.title;
  export const description: typeof Builder.prototype.description;
  export const readOnly: typeof Builder.prototype.readOnly;
  export const examples: typeof Builder.prototype.examples;
  export const definitions: typeof Builder.prototype.definitions;
  export const type: typeof Builder.prototype.type;
  export const multipleOf: typeof Builder.prototype.multipleOf;
  export const maximum: typeof Builder.prototype.maximum;
  export const exclusiveMaximum: typeof Builder.prototype.exclusiveMaximum;
  export const minimum: typeof Builder.prototype.minimum;
  export const exclusiveMinimum: typeof Builder.prototype.exclusiveMinimum;
  export const maxLength: typeof Builder.prototype.maxLength;
  export const minLength: typeof Builder.prototype.minLength;
  export const pattern: typeof Builder.prototype.pattern;
  export const additionalItems: typeof Builder.prototype.additionalItems;
  export const items: typeof Builder.prototype.items;
  export const maxItems: typeof Builder.prototype.maxItems;
  export const minItems: typeof Builder.prototype.minItems;
  export const uniqueItems: typeof Builder.prototype.uniqueItems;
  export const contains: typeof Builder.prototype.contains;
  export const maxProperties: typeof Builder.prototype.maxProperties;
  export const minProperties: typeof Builder.prototype.minProperties;
  export const required: typeof Builder.prototype.required;
  export const additionalProperties: typeof Builder.prototype.additionalProperties;
  export const properties: typeof Builder.prototype.properties;
  export const patternProperties: typeof Builder.prototype.patternProperties;
  export const dependencies: typeof Builder.prototype.dependencies;
  export const propertyNames: typeof Builder.prototype.propertyNames;
  export const format: typeof Builder.prototype.format;
  export const contentMediaType: typeof Builder.prototype.contentMediaType;
  export const contentEncoding: typeof Builder.prototype.contentEncoding;
  export const allOf: typeof Builder.prototype.allOf;
  export const anyOf: typeof Builder.prototype.anyOf;
  export const oneOf: typeof Builder.prototype.oneOf;
  export const not: typeof Builder.prototype.not;

  // export reserved words
  const _null: () => Builder;
  const _default: typeof Builder.prototype.default;
  const _enum: typeof Builder.prototype.enum;
  const _const: typeof Builder.prototype.const;
  const _if: typeof Builder.prototype.if;

  export {
    _null as null,
    _default as default,
    _enum as enum,
    _const as const,
    _if as if
  };
}

export = BuilderFactory;
