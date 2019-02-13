import { SchemaObjectLike, SchemaLike, SchemaMap, NonEmptyArray, SchemaType, SchemaDependencies, SchemaObjectRaw } from './Schema';

export type BuilderOrRaw = Builder | SchemaLike<Builder>;
export type BuilderOrRawObject = Builder | SchemaObjectLike<Builder>;

export class Builder {
  private _schema: SchemaObjectLike<Builder>;
  private _required = false;
  private _cache: SchemaObjectRaw | undefined;

  constructor(schema: BuilderOrRawObject = {}) {
    this._schema = schema instanceof Builder
      ? schema._schema
      : schema;
  }

  concat(...schemas: NonEmptyArray<BuilderOrRawObject>) {
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

  definitions(value: SchemaMap<BuilderOrRaw>) {
    return this.$$chain('definitions', value);
  }

  type(value: SchemaType | NonEmptyArray<SchemaType>) {
    return this.$$chain('type', value);
  }

  enum(value: NonEmptyArray<any>) {
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

  additionalItems(value: BuilderOrRaw) {
    return this.$$chain('additionalItems', value);
  }

  items(value: BuilderOrRaw | NonEmptyArray<BuilderOrRaw>) {
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

  contains(value: BuilderOrRaw) {
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

  additionalProperties(value: BuilderOrRaw) {
    return this.$$chain('additionalProperties', value);
  }

  properties(value: SchemaMap<BuilderOrRaw>) {
    return this.$$chain('properties', value);
  }

  patternProperties(value: SchemaMap<BuilderOrRaw>) {
    return this.$$chain('patternProperties', value);
  }

  dependencies(value: SchemaDependencies<BuilderOrRaw>) {
    return this.$$chain('dependencies', value);
  }

  propertyNames(value: BuilderOrRaw) {
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
    condition: BuilderOrRaw,
    thenClause?: BuilderOrRaw | null,
    elseClause?: BuilderOrRaw | null
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

  allOf(value: NonEmptyArray<BuilderOrRaw>) {
    return this.$$chain('allOf', value);
  }

  anyOf(value: NonEmptyArray<BuilderOrRaw>) {
    return this.$$chain('anyOf', value);
  }

  oneOf(value: NonEmptyArray<BuilderOrRaw>) {
    return this.$$chain('oneOf', value);
  }

  not(value: BuilderOrRaw) {
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

      required = required.concat(propertyNames.filter(name =>
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
