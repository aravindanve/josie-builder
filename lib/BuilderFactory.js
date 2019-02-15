const Builder = require('./Builder');
const helpers = require('./helpers');
const extend = require('./extend');
const builder = new Builder();

const isObject = value =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value);

function BuilderFactory(schema) {
  if (schema instanceof Builder || typeof schema === 'boolean') {
    return schema;

  } else if (isObject(schema) || schema === undefined) {
    return new Builder(schema);

  } else {
    throw new TypeError(
      `Schema must be of type boolean or object`);
  }
}

function reflect(instance, method) {
  return function () {
    return instance[method].apply(instance, arguments);
  };
}

helpers(BuilderFactory);
extend(BuilderFactory);

BuilderFactory.toJSON = function (value) {
  return Builder.toJSON.call(Builder, value);
};

BuilderFactory.compile = function (value) {
  if (!(value instanceof Builder)) {
    throw new TypeError(
      `Argument must be an instance of Builder`);
  }

  return value.compile();
};

BuilderFactory.clean = function (value) {
  if (!(value instanceof Builder)) {
    throw new TypeError(
      `Argument must be an instance of Builder`);
  }

  return value.clean();
};

BuilderFactory.concat = reflect(builder, 'concat');
BuilderFactory.$id = reflect(builder, '$id');
BuilderFactory.$ref = reflect(builder, '$ref');
BuilderFactory.$comment = reflect(builder, '$comment');
BuilderFactory.title = reflect(builder, 'title');
BuilderFactory.description = reflect(builder, 'description');
BuilderFactory.default = reflect(builder, 'default');
BuilderFactory.readOnly = reflect(builder, 'readOnly');
BuilderFactory.examples = reflect(builder, 'examples');
BuilderFactory.definitions = reflect(builder, 'definitions');
BuilderFactory.type = reflect(builder, 'type');
BuilderFactory.enum = reflect(builder, 'enum');
BuilderFactory.const = reflect(builder, 'const');
BuilderFactory.multipleOf = reflect(builder, 'multipleOf');
BuilderFactory.maximum = reflect(builder, 'maximum');
BuilderFactory.exclusiveMaximum = reflect(builder, 'exclusiveMaximum');
BuilderFactory.minimum = reflect(builder, 'minimum');
BuilderFactory.exclusiveMinimum = reflect(builder, 'exclusiveMinimum');
BuilderFactory.maxLength = reflect(builder, 'maxLength');
BuilderFactory.minLength = reflect(builder, 'minLength');
BuilderFactory.pattern = reflect(builder, 'pattern');
BuilderFactory.additionalItems = reflect(builder, 'additionalItems');
BuilderFactory.items = reflect(builder, 'items');
BuilderFactory.maxItems = reflect(builder, 'maxItems');
BuilderFactory.minItems = reflect(builder, 'minItems');
BuilderFactory.uniqueItems = reflect(builder, 'uniqueItems');
BuilderFactory.contains = reflect(builder, 'contains');
BuilderFactory.maxProperties = reflect(builder, 'maxProperties');
BuilderFactory.minProperties = reflect(builder, 'minProperties');
BuilderFactory.required = reflect(builder, 'required');
BuilderFactory.additionalProperties = reflect(builder, 'additionalProperties');
BuilderFactory.properties = reflect(builder, 'properties');
BuilderFactory.patternProperties = reflect(builder, 'patternProperties');
BuilderFactory.dependencies = reflect(builder, 'dependencies');
BuilderFactory.propertyNames = reflect(builder, 'propertyNames');
BuilderFactory.format = reflect(builder, 'format');
BuilderFactory.contentMediaType = reflect(builder, 'contentMediaType');
BuilderFactory.contentEncoding = reflect(builder, 'contentEncoding');
BuilderFactory.if = reflect(builder, 'if');
BuilderFactory.allOf = reflect(builder, 'allOf');
BuilderFactory.anyOf = reflect(builder, 'anyOf');
BuilderFactory.oneOf = reflect(builder, 'oneOf');
BuilderFactory.not = reflect(builder, 'not');

module.exports = BuilderFactory;
