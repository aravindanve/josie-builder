function helpers(factory) {
  factory.null = function () {
    return factory.type('null');
  };

  factory.boolean = function () {
    return factory.type('boolean');
  };

  factory.nullOrBoolean = function () {
    return factory.type(['null', 'boolean']);
  };

  factory.number = function () {
    return factory.type('number');
  };

  factory.nullOrNumber = function () {
    return factory.type(['null', 'number']);
  };

  factory.integer = function () {
    return factory.type('integer');
  };

  factory.nullOrInteger = function () {
    return factory.type(['null', 'integer']);
  };

  factory.string = function (format) {
    return format
      ? factory.type('string').format(format)
      : factory.type('string');
  };

  factory.nullOrString = function (format) {
    return format
      ? factory.type(['null', 'string']).format(format)
      : factory.type(['null', 'string']);
  };

  factory.array = function (items, additionalItems) {
    let chain = factory.type('array');

    if (items !== undefined &&
      items !== null) {
      chain = chain.items(items);
    }

    if (additionalItems !== undefined &&
      additionalItems !== null) {
      chain = chain.additionalItems(additionalItems);
    }

    return chain;
  };

  factory.nullOrArray = function (items, additionalItems) {
    let chain = factory.type(['null', 'array']);

    if (items !== undefined &&
      items !== null) {
      chain = chain.items(items);
    }

    if (additionalItems !== undefined &&
      additionalItems !== null) {
      chain = chain.additionalItems(additionalItems);
    }

    return chain;
  };

  factory.object = function (properties, additionalProperties) {
    let chain = factory.type('object');

    if (properties !== undefined &&
      properties !== null) {
      chain = chain.properties(properties);
    }

    if (additionalProperties !== undefined &&
      additionalProperties !== null) {
      chain = chain.additionalProperties(additionalProperties);
    }

    return chain;
  };

  factory.nullOrObject = function (properties, additionalProperties) {
    let chain = factory.type(['null', 'object']);

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
}

module.exports = helpers;
