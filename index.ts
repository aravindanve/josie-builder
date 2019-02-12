type MethodsOf<T> = { [K in keyof T]: T[K] extends Function ? T[K] : never };

// function Josie(): Josie.Builder;
// function Josie(schema: boolean): boolean;
// function Josie(schema: Josie.SchemaObjectLike): Josie.Builder;
function Josie(schema: Josie.SchemaLike = {}) {
  if (typeof schema === 'boolean') {
    return schema;

  } else if (typeof schema === 'object') {
    return new Josie.Builder(schema);

  } else {
    throw new TypeError(
      `Schema must be of type boolean or object`);
  }
}

interface Josie extends Josie.Builder {
  // (): Josie.Builder;
}

namespace Josie {
  export type SchemaType = 'null' | 'boolean' | 'number' | 'integer' | 'string' | 'array' | 'object';
  export type Schema<T = SchemaObject<T>> = boolean | T | SchemaObject<T>;
  export type List<T> = [T, ...T[]];
  export type SchemaLike = Builder | Schema<Builder>;
  export type SchemaObjectLike = Builder | SchemaObject<Builder>;

  export interface PropertyDependencies<T> {
    [propertyName: string]: T | string[];
  }

  export interface PropertyMap<T> {
    [propertyName: string]: T;
  }

  export interface SchemaObject<T = Schema<T>> {
    $schema?: string;
    $id?: string;
    $ref?: string;
    $comment?: string;

    title?: string;
    description?: string;
    default?: any;
    readOnly?: boolean;
    examples?: any[];
    definitions?: PropertyMap<Schema<T>>;

    type?: SchemaType | List<SchemaType>;
    enum?: List<any>;
    const?: any;

    multipeOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;

    maxLength?: number;
    minLength?: number;
    pattern?: string;
    format?: string;

    items?: Schema<T> | List<Schema<T>>;
    additionalItems?: Schema<T>;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    contains?: Schema<T>;

    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    properties?: PropertyMap<Schema<T>>;
    patternProperties?: PropertyMap<Schema<T>>;
    additionalProperties?: Schema<T>;
    propertyNames?: Schema<T>;
    dependencies?: PropertyDependencies<Schema<T>>;

    contentMediaType?: string;
    contentEncoding?: string;

    if?: Schema<T>;
    then?: Schema<T>;
    else?: Schema<T>;

    allOf?: List<Schema<T>>;
    anyOf?: List<Schema<T>>;
    oneOf?: List<Schema<T>>;
    not?: Schema<T>;
  }

  export class Builder {
    private _schema: Josie.SchemaObject<Builder>;
    private _required = false;
    private _cache: Josie.SchemaObject | undefined;

    constructor(schema: Josie.SchemaObjectLike = {}) {
      this._schema = schema instanceof Builder
        ? schema._schema
        : schema;
    }

    concat(...schemas: Josie.List<Josie.SchemaObjectLike>) {
      return new Builder(
        (Object as any).assign({}, this._schema,
          ...schemas.map(schema => schema instanceof Builder
            ? schema._schema
            : schema)));
    }

    $id(value: string) {
      return this.$$chain('$id', value);
    }

    $ref(value: string) {
      return this.$$chain('$ref', value);
    }

    $comment(value: string) {
      return this.$$chain('$comment', value);
    }

    title(value: string) {
      return this.$$chain('title', value);
    }

    description(value: string) {
      return this.$$chain('description', value);
    }

    default(value: any) {
      return this.$$chain('default', value);
    }

    readOnly(value: boolean) {
      return this.$$chain('readOnly', value);
    }

    examples(value: any[]) {
      return this.$$chain('examples', value);
    }

    definitions(value: Josie.PropertyMap<Josie.SchemaLike>) {
      return this.$$chain('definitions', value);
    }

    type(value: Josie.SchemaType | Josie.List<Josie.SchemaType>) {
      return this.$$chain('type', value);
    }

    enum(value: Josie.List<any>) {
      return this.$$chain('enum', value);
    }

    const(value: any) {
      return this.$$chain('const', value);
    }

    multipleOf(value: number) {
      return this.$$chain('multipleOf', value);
    }

    maximum(value: number) {
      return this.$$chain('maximum', value);
    }

    exclusiveMaximum(value: number) {
      return this.$$chain('exclusiveMaximum', value);
    }

    minimum(value: number) {
      return this.$$chain('minimum', value);
    }

    exclusiveMinimum(value: number) {
      return this.$$chain('exclusiveMinimum', value);
    }

    maxLength(value: number) {
      return this.$$chain('maxLength', value);
    }

    minLength(value: number) {
      return this.$$chain('minLength', value);
    }

    pattern(value: string | RegExp) {
      return this.$$chain(
        'pattern',
        value instanceof RegExp
          ? value.source
          : value);
    }

    additionalItems(value: Josie.SchemaLike) {
      return this.$$chain('additionalItems', value);
    }

    items(value: Josie.SchemaLike | Josie.List<Josie.SchemaLike>) {
      return this.$$chain('items', value);
    }

    maxItems(value: number) {
      return this.$$chain('maxItems', value);
    }

    minItems(value: number) {
      return this.$$chain('minItems', value);
    }

    uniqueItems(value: boolean) {
      return this.$$chain('uniqueItems', value);
    }

    contains(value: Josie.SchemaLike) {
      return this.$$chain('contains', value);
    }

    maxProperties(value: number) {
      return this.$$chain('maxProperties', value);
    }

    minProperties(value: number) {
      return this.$$chain('minProperties', value);
    }

    required(value = true) {
      const instance = this.concat({});

      instance._required = value;

      return instance;
    }

    additionalProperties(value: Josie.SchemaLike) {
      return this.$$chain('additionalProperties', value);
    }

    properties(value: Josie.PropertyMap<Josie.SchemaLike>) {
      return this.$$chain('properties', value);
    }

    patternProperties(value: Josie.PropertyMap<Josie.SchemaLike>) {
      return this.$$chain('patternProperties', value);
    }

    dependencies(value: Josie.PropertyDependencies<Josie.SchemaLike>) {
      return this.$$chain('dependencies', value);
    }

    propertyNames(value: Josie.SchemaLike) {
      return this.$$chain('propertyNames', value);
    }

    format(value: string) {
      return this.$$chain('format', value);
    }

    contentMediaType(value: string) {
      return this.$$chain('contentMediaType', value);
    }

    contentEncoding(value: string) {
      return this.$$chain('contentEncoding', value);
    }

    if(
      condition: Josie.SchemaLike,
      thenClause?: Josie.SchemaLike,
      elseClause?: Josie.SchemaLike
    ) {
      let chain = this.$$chain('if', condition) as Builder;

      if (thenClause) {
        chain = chain.$$chain('then', thenClause) as Builder;
      }

      if (elseClause) {
        chain = chain.$$chain('else', elseClause) as Builder;
      }

      return chain;
    }

    allOf(value: Josie.List<Josie.SchemaLike>) {
      return this.$$chain('allOf', value);
    }

    anyOf(value: Josie.List<Josie.SchemaLike>) {
      return this.$$chain('anyOf', value);
    }

    oneOf(value: Josie.List<Josie.SchemaLike>) {
      return this.$$chain('oneOf', value);
    }

    not(value: Josie.SchemaLike) {
      return this.$$chain('not', value);
    }

    $$chain<T>(keyword: string, value: T) {
      return this.concat({
        [keyword]: value
      });
    }

    $$compile() {
      let required = this._schema.required || [];

      // process required properties
      if (this._schema.properties) {
        const propertyMap = this._schema.properties;
        const propertyNames = Object.keys(this._schema.properties);

        required = required.concat(required, propertyNames.filter(name =>
          propertyMap[name] instanceof Builder &&
          (propertyMap[name] as Builder)._required));
      }

      this._cache = {
        ...Builder.toJSON(this._schema),
        ...required.length && { required }
      };
    }

    $$clean() {
      this._cache = undefined;
    }

    toJSON() {
      if (!this._cache) this.$$compile();

      return this._cache;
    }

    static toJSON(value: any) {
      if (value instanceof Builder) {
        return value.toJSON();

      } else if (typeof value === 'object') {
        if (value === null) {
          return null;

        } else if (Array.isArray(value)) {
          return value.map(item => Builder.toJSON(item));

        } else {
          return Object.keys(value).reduce((json, key) => (
            json[key] = Builder.toJSON(value[key]), json), {});
        }

      } else {
        return value;
      }
    }
  }

  declare function concat();
}

const builder = new Josie.Builder();
for (let i = 0, keys = Object.keys(Josie.Builder.prototype); i < keys.length; i++) {
  const key = keys[i];
  const value = Josie.Builder.prototype[key];

  if (typeof value === 'function') {
    Josie[key] = function () {
      return value.apply(builder, arguments);
    };
  }
}

export = Josie;

// declare interface BuilderStatic extends MethodsOf<Builder> {
//   (): Builder;
//   (schema: boolean): boolean;
//   (schema: SchemaObjectLike): Builder;
//   Builder: typeof Builder;
// };

// const builderShared = new Builder();
// const builderStatic: BuilderStatic = builder as any;

// for (let i = 0, keys = Object.keys(Builder.prototype); i < keys.length; i++) {
//   const key = keys[i];
//   const value = Builder.prototype[key];

//   if (typeof value === 'function') {
//     builderStatic[key] = function () {
//       return value.apply(builderShared, arguments);
//     };
//   }
// }

// builderStatic.Builder = Builder;

// export = builderStatic;
