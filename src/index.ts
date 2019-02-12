// global types
declare global {
  interface JosieBuilderStatic {
    // for extending the library
  }

  interface JosieBuilder extends Builder { }

  namespace JosieBuilder {
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
  }
}

// internal types
type MethodsOf<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : never
};

type ParametersOf<T> = T extends (...args: infer T) => any ? T : never;

// builder class
class Builder {
  private _schema: JosieBuilder.SchemaObject<Builder>;
  private _required = false;
  private _cache: JosieBuilder.SchemaObject | undefined;

  constructor(schema: JosieBuilder.SchemaObjectLike = {}) {
    this._schema = schema instanceof Builder
      ? schema._schema
      : schema;
  }

  concat(...schemas: JosieBuilder.List<JosieBuilder.SchemaObjectLike>) {
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

  definitions(value: JosieBuilder.PropertyMap<JosieBuilder.SchemaLike>) {
    return this.$$chain('definitions', value);
  }

  type(value: JosieBuilder.SchemaType | JosieBuilder.List<JosieBuilder.SchemaType>) {
    return this.$$chain('type', value);
  }

  enum(value: JosieBuilder.List<any>) {
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

  additionalItems(value: JosieBuilder.SchemaLike) {
    return this.$$chain('additionalItems', value);
  }

  items(value: JosieBuilder.SchemaLike | JosieBuilder.List<JosieBuilder.SchemaLike>) {
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

  contains(value: JosieBuilder.SchemaLike) {
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

  additionalProperties(value: JosieBuilder.SchemaLike) {
    return this.$$chain('additionalProperties', value);
  }

  properties(value: JosieBuilder.PropertyMap<JosieBuilder.SchemaLike>) {
    return this.$$chain('properties', value);
  }

  patternProperties(value: JosieBuilder.PropertyMap<JosieBuilder.SchemaLike>) {
    return this.$$chain('patternProperties', value);
  }

  dependencies(value: JosieBuilder.PropertyDependencies<JosieBuilder.SchemaLike>) {
    return this.$$chain('dependencies', value);
  }

  propertyNames(value: JosieBuilder.SchemaLike) {
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
    condition: JosieBuilder.SchemaLike,
    thenClause?: JosieBuilder.SchemaLike | null,
    elseClause?: JosieBuilder.SchemaLike | null
  ) {
    let chain = this.$$chain('if', condition) as Builder;

    if (thenClause !== undefined &&
        thenClause !== null) {
      chain = chain.$$chain('then', thenClause) as Builder;
    }

    if (elseClause !== undefined &&
        elseClause !== null) {
      chain = chain.$$chain('else', elseClause) as Builder;
    }

    return chain;
  }

  allOf(value: JosieBuilder.List<JosieBuilder.SchemaLike>) {
    return this.$$chain('allOf', value);
  }

  anyOf(value: JosieBuilder.List<JosieBuilder.SchemaLike>) {
    return this.$$chain('anyOf', value);
  }

  oneOf(value: JosieBuilder.List<JosieBuilder.SchemaLike>) {
    return this.$$chain('oneOf', value);
  }

  not(value: JosieBuilder.SchemaLike) {
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

interface BuilderStatic extends MethodsOf<Builder>, JosieBuilderStatic {
  Builder: typeof Builder;

  (): Builder;
  (schema: boolean): boolean;
  (schema: JosieBuilder.SchemaObjectLike): Builder;

  null: typeof quickNull;
  boolean: typeof quickBoolean;
  nullOrBoolean: typeof quickNullOrBoolean;
  number: typeof quickNumber;
  nullOrNumber: typeof quickNullOrNumber;
  integer: typeof quickInteger;
  nullOrInteger: typeof quickNullOrInteger;
  string: typeof quickString;
  nullOrString: typeof quickNullOrString;
  array: typeof quickArray;
  nullOrArray: typeof quickNullOrArray;
  object: typeof quickObject;
  nullOrObject: typeof quickNullOrObject;
};

const builderShared = new Builder();
const builderStatic: BuilderStatic = (function (schema: JosieBuilder.SchemaLike = {}) {
  if (typeof schema === 'boolean') {
    return schema;

  } else if (typeof schema === 'object') {
    return new Builder(schema);

  } else {
    throw new TypeError(
      `Schema must be of type boolean or object`);
  }

} as any);

// quick functions
function quickNull() {
  return builderShared.type('null');
}
builderStatic.null = quickNull;

function quickBoolean() {
  return builderShared.type('boolean');
}
builderStatic.boolean = quickBoolean;

function quickNullOrBoolean() {
  return builderShared.type(['null', 'boolean']);
}
builderStatic.nullOrBoolean = quickNullOrBoolean;

function quickNumber() {
  return builderShared.type('number');
}
builderStatic.number = quickNumber;

function quickNullOrNumber() {
  return builderShared.type(['null', 'number']);
}
builderStatic.nullOrNumber = quickNullOrNumber;

function quickInteger() {
  return builderShared.type('integer');
}
builderStatic.integer = quickInteger;

function quickNullOrInteger() {
  return builderShared.type(['null', 'integer']);
}
builderStatic.nullOrInteger = quickNullOrInteger;

function quickString(format?: string) {
  return format
    ? builderShared.type('string').format(format)
    : builderShared.type('string');
}
builderStatic.string = quickString;

function quickNullOrString(format?: string) {
  return format
    ? builderShared.type(['null', 'string']).format(format)
    : builderShared.type(['null', 'string']);
}
builderStatic.nullOrString = quickNullOrString;

function quickArray(
  items?: JosieBuilder.SchemaLike | JosieBuilder.List<JosieBuilder.SchemaLike> | null,
  additionalItems?: JosieBuilder.SchemaLike | null
) {
  let chain = builderShared.type('array');

  if (items !== undefined &&
      items !== null) {
    chain = chain.items(items);
  }

  if (additionalItems !== undefined &&
      additionalItems !== null) {
    chain = chain.additionalItems(additionalItems);
  }

  return chain;
}
builderStatic.array = quickArray;

function quickNullOrArray(
  items?: JosieBuilder.SchemaLike | JosieBuilder.List<JosieBuilder.SchemaLike> | null,
  additionalItems?: JosieBuilder.SchemaLike | null
) {
  let chain = builderShared.type(['null', 'array']);

  if (items !== undefined &&
      items !== null) {
    chain = chain.items(items);
  }

  if (additionalItems !== undefined &&
      additionalItems !== null) {
    chain = chain.additionalItems(additionalItems);
  }

  return chain;
}
builderStatic.nullOrArray = quickNullOrArray;

function quickObject(
  properties?: JosieBuilder.PropertyMap<JosieBuilder.SchemaLike> | null,
  additionalProperties?: JosieBuilder.SchemaLike | null
) {
  let chain = builderShared.type('object');

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
builderStatic.object = quickObject;

function quickNullOrObject(
  properties?: JosieBuilder.PropertyMap<JosieBuilder.SchemaLike> | null,
  additionalProperties?: JosieBuilder.SchemaLike | null
) {
  let chain = builderShared.type(['null', 'object']);

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
builderStatic.nullOrObject = quickNullOrObject;

// expose Builder methods as static methods
for (let i = 0, keys = Object.keys(Builder.prototype); i < keys.length; i++) {
  const key = keys[i];
  const value = Builder.prototype[key];

  if (typeof value === 'function') {
    builderStatic[key] = function () {
      return value.apply(builderShared, arguments);
    };
  }
}

// expose Builder
builderStatic.Builder = Builder;

// export BuilderStatic
export = builderStatic;
