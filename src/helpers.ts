import { NonEmptyArray, SchemaMap } from './Schema';
import { Builder, BuilderOrRaw } from './Builder';

export const builder = new Builder();
export const helpers = {
  null() {
    return builder.type('null');
  },

  boolean() {
    return builder.type('boolean');
  },

  nullOrBoolean() {
    return builder.type(['null', 'boolean']);
  },

  number() {
    return builder.type('number');
  },

  nullOrNumber() {
    return builder.type(['null', 'number']);
  },

  integer() {
    return builder.type('integer');
  },

  nullOrInteger() {
    return builder.type(['null', 'integer']);
  },

  string(format?: string) {
    return format
      ? builder.type('string').format(format)
      : builder.type('string');
  },

  nullOrString(format?: string) {
    return format
      ? builder.type(['null', 'string']).format(format)
      : builder.type(['null', 'string']);
  },

  array(
    items?: BuilderOrRaw | NonEmptyArray<BuilderOrRaw> | null,
    additionalItems?: BuilderOrRaw | null
  ) {
    let chain = builder.type('array');

    if (items !== undefined &&
        items !== null) {
      chain = chain.items(items);
    }

    if (additionalItems !== undefined &&
        additionalItems !== null) {
      chain = chain.additionalItems(additionalItems);
    }

    return chain;
  },

  nullOrArray(
    items?: BuilderOrRaw | NonEmptyArray<BuilderOrRaw> | null,
    additionalItems?: BuilderOrRaw | null
  ) {
    let chain = builder.type(['null', 'array']);

    if (items !== undefined &&
        items !== null) {
      chain = chain.items(items);
    }

    if (additionalItems !== undefined &&
        additionalItems !== null) {
      chain = chain.additionalItems(additionalItems);
    }

    return chain;
  },

  object(
    properties?: SchemaMap<BuilderOrRaw> | null,
    additionalProperties?: BuilderOrRaw | null
  ) {
    let chain = builder.type('object');

    if (properties !== undefined &&
        properties !== null) {
      chain = chain.properties(properties);
    }

    if (additionalProperties !== undefined &&
        additionalProperties !== null) {
      chain = chain.additionalProperties(additionalProperties);
    }

    return chain;
  },

  nullOrObject(
    properties?: SchemaMap<BuilderOrRaw> | null,
    additionalProperties?: BuilderOrRaw | null
  ) {
    let chain = builder.type(['null', 'object']);

    if (properties !== undefined &&
        properties !== null) {
      chain = chain.properties(properties);
    }

    if (additionalProperties !== undefined &&
        additionalProperties !== null) {
      chain = chain.additionalProperties(additionalProperties);
    }

    return chain;
  }
};
