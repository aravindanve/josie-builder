class Builder {
  constructor(schema = {}) {
    this._required = false;
    this._schema = undefined;
    this._schema = schema instanceof Builder
      ? schema._schema
      : schema;
  }

  static toJSON(value) {
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

  toJSON() {
    return this._cache || this.compile();
  }

  chain(keyword, value) {
    return this.concat({ [keyword]: value });
  }

  compile() {
    let required = this._schema.required || [];

    // process required properties
    if (this._schema.properties) {
      const propertyMap = this._schema.properties;
      const propertyNames = Object.keys(this._schema.properties);

      required = required.concat(propertyNames.filter(name =>
        propertyMap[name] instanceof Builder &&
        propertyMap[name]._required));
    }

    return this._cache = {
      ...Builder.toJSON(this._schema),
      ...required.length && { required }
    };
  }

  clean() {
    this._cache = undefined;
  }

  concat(...schemas) {
    return new Builder(
      Object.assign({}, this._schema,
        ...schemas.map(schema => schema instanceof Builder
          ? schema._schema
          : schema)));
  }

  $id(value) {
    return this.chain('$id', value);
  }

  $ref(value) {
    return this.chain('$ref', value);
  }

  $comment(value) {
    return this.chain('$comment', value);
  }

  title(value) {
    return this.chain('title', value);
  }

  description(value) {
    return this.chain('description', value);
  }

  default(value) {
    return this.chain('default', value);
  }

  readOnly(value) {
    return this.chain('readOnly', value);
  }

  examples(value) {
    return this.chain('examples', value);
  }

  definitions(value) {
    return this.chain('definitions', value);
  }

  type(value) {
    return this.chain('type', value);
  }

  enum(value) {
    return this.chain('enum', value);
  }

  const(value) {
    return this.chain('const', value);
  }

  multipleOf(value) {
    return this.chain('multipleOf', value);
  }

  maximum(value) {
    return this.chain('maximum', value);
  }

  exclusiveMaximum(value) {
    return this.chain('exclusiveMaximum', value);
  }

  minimum(value) {
    return this.chain('minimum', value);
  }

  exclusiveMinimum(value) {
    return this.chain('exclusiveMinimum', value);
  }

  maxLength(value) {
    return this.chain('maxLength', value);
  }

  minLength(value) {
    return this.chain('minLength', value);
  }

  pattern(value) {
    return this.chain('pattern', value instanceof RegExp
      ? value.source
      : value);
  }

  additionalItems(value) {
    return this.chain('additionalItems', value);
  }

  items(value) {
    return this.chain('items', value);
  }

  maxItems(value) {
    return this.chain('maxItems', value);
  }

  minItems(value) {
    return this.chain('minItems', value);
  }

  uniqueItems(value) {
    return this.chain('uniqueItems', value);
  }

  contains(value) {
    return this.chain('contains', value);
  }

  maxProperties(value) {
    return this.chain('maxProperties', value);
  }

  minProperties(value) {
    return this.chain('minProperties', value);
  }

  required(value = true) {
    const instance = this.concat({});

    instance._required = value;

    return instance;
  }

  additionalProperties(value) {
    return this.chain('additionalProperties', value);
  }

  properties(value) {
    return this.chain('properties', value);
  }

  patternProperties(value) {
    return this.chain('patternProperties', value);
  }

  dependencies(value) {
    return this.chain('dependencies', value);
  }

  propertyNames(value) {
    return this.chain('propertyNames', value);
  }

  format(value) {
    return this.chain('format', value);
  }

  contentMediaType(value) {
    return this.chain('contentMediaType', value);
  }

  contentEncoding(value) {
    return this.chain('contentEncoding', value);
  }

  if(condition, thenClause, elseClause) {
    let chain = this.chain('if', condition);

    if (thenClause !== undefined &&
      thenClause !== null) {
      chain = chain.chain('then', thenClause);
    }

    if (elseClause !== undefined &&
      elseClause !== null) {
      chain = chain.chain('else', elseClause);
    }

    return chain;
  }

  allOf(value) {
    return this.chain('allOf', value);
  }

  anyOf(value) {
    return this.chain('anyOf', value);
  }

  oneOf(value) {
    return this.chain('oneOf', value);
  }

  not(value) {
    return this.chain('not', value);
  }
}

module.exports = Builder;
