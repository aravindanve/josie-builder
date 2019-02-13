"use strict";
var Builder_1 = require("./Builder");
var helpers_1 = require("./helpers");
;
var factory = function (schema) {
    if (schema === void 0) { schema = {}; }
    if (typeof schema === 'boolean') {
        return schema;
    }
    else if (typeof schema === 'object') {
        return new Builder_1.Builder(schema);
    }
    else {
        throw new TypeError("Schema must be of type boolean or object");
    }
};
var _loop_1 = function (i, keys) {
    var key = keys[i];
    var value = Builder_1.Builder.prototype[key];
    if (typeof value === 'function') {
        factory[key] = function () {
            return value.apply(helpers_1.builder, arguments);
        };
    }
};
for (var i = 0, keys = Object.keys(Builder_1.Builder.prototype); i < keys.length; i++) {
    _loop_1(i, keys);
}
Object.assign(factory, helpers_1.helpers);
module.exports = factory;
//# sourceMappingURL=index.js.map