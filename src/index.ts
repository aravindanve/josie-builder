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

  addMethod: typeof addMethod;
  removeMethod: typeof removeMethod;

  Builder: typeof Builder;
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

// allow custom factory methods
const customMethods: string[] = [];
function addMethod(name: string, fn: Function) {
  if (name in factory) {
    throw new Error(
      `Method by name '${name}' already exists`);
  }
  if (customMethods.indexOf(name) === -1) {
    customMethods.push(name);
  }
  factory[name] = fn;
}
factory.addMethod = addMethod;

function removeMethod(name) {
  const index = customMethods.indexOf(name);

  if (index !== -1) {
    customMethods.splice(index, 1);
    delete factory[name];
  }
}
factory.removeMethod = removeMethod;

// expose Builder
factory.Builder = Builder;

// export factory
export = factory;
