"use strict";
exports.__esModule = true;
var Builder_1 = require("./Builder");
exports.builder = new Builder_1.Builder();
exports.helpers = {
    "null": function () {
        return exports.builder.type('null');
    },
    boolean: function () {
        return exports.builder.type('boolean');
    },
    nullOrBoolean: function () {
        return exports.builder.type(['null', 'boolean']);
    },
    number: function () {
        return exports.builder.type('number');
    },
    nullOrNumber: function () {
        return exports.builder.type(['null', 'number']);
    },
    integer: function () {
        return exports.builder.type('integer');
    },
    nullOrInteger: function () {
        return exports.builder.type(['null', 'integer']);
    },
    string: function (format) {
        return format
            ? exports.builder.type('string').format(format)
            : exports.builder.type('string');
    },
    nullOrString: function (format) {
        return format
            ? exports.builder.type(['null', 'string']).format(format)
            : exports.builder.type(['null', 'string']);
    },
    array: function (items, additionalItems) {
        var chain = exports.builder.type('array');
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
    nullOrArray: function (items, additionalItems) {
        var chain = exports.builder.type(['null', 'array']);
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
    object: function (properties, additionalProperties) {
        var chain = exports.builder.type('object');
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
    nullOrObject: function (properties, additionalProperties) {
        var chain = exports.builder.type(['null', 'object']);
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
//# sourceMappingURL=helpers.js.map