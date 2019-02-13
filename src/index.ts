import { Builder, BuilderOrRawObject, BuilderOrRaw } from './Builder';
import { NonEmptyArray, SchemaMap, SchemaType, SchemaRaw, SchemaLike, SchemaObjectRaw, SchemaDependencies, SchemaObjectLike } from './Schema';
import { helpers, builder } from './helpers';

// internal types
type Helpers = typeof helpers;
type MethodsOf<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : never
};

// exported types
type _NonEmptyArray<T> = NonEmptyArray<T>;
type _SchemaType = SchemaType;
type _SchemaLike<T> = SchemaLike<T>;
type _SchemaRaw = SchemaRaw;
type _SchemaDependencies<T> = SchemaDependencies<T>;
type _SchemaMap<T> = SchemaMap<T>;
type _SchemaObjectLike<T> = SchemaObjectLike<T>;
type _SchemaObjectRaw = SchemaObjectRaw;
type _Builder = Builder;
type _BuilderOrRawObject = BuilderOrRawObject;
type _BuilderOrRaw = BuilderOrRaw;

namespace factory {
  export type NonEmptyArray<T> = _NonEmptyArray<T>;
  export type SchemaType = _SchemaType;
  export type SchemaLike<T> = _SchemaLike<T>;
  export type SchemaRaw = _SchemaRaw;
  export type SchemaDependencies<T> = _SchemaDependencies<T>;
  export type SchemaMap<T> = _SchemaMap<T>;
  export type SchemaObjectLike<T> = _SchemaObjectLike<T>;
  export type SchemaObjectRaw = _SchemaObjectRaw;
  export type Builder = _Builder;
  export type BuilderOrRawObject = _BuilderOrRawObject;
  export type BuilderOrRaw = _BuilderOrRaw;
}

// factory interface
interface Factory extends MethodsOf<Builder>, JosieBuilderStatic, Helpers {
  (): Builder;
  (schema: boolean): boolean;
  (schema: BuilderOrRawObject): Builder;
};

// factory method
const factory: Factory = (function (schema: BuilderOrRaw = {}) {
  if (typeof schema === 'boolean') {
    return schema;

  } else if (typeof schema === 'object') {
    return new Builder(schema);

  } else {
    throw new TypeError(
      `Schema must be of type boolean or object`);
  }

} as any);

// expose Builder methods as static methods
for (let i = 0, keys = Object.keys(Builder.prototype); i < keys.length; i++) {
  const key = keys[i];
  const value = Builder.prototype[key];

  if (typeof value === 'function') {
    factory[key] = function () {
      return value.apply(builder, arguments);
    };
  }
}

// expose helpers
(Object as any).assign(factory, helpers);

// export factory
export = factory;
