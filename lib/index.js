"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Builder = (function () {
    function Builder(schema) {
        if (schema === void 0) { schema = {}; }
        this._required = false;
        this._schema = schema instanceof Builder
            ? schema._schema
            : schema;
    }
    Builder.prototype.concat = function () {
        var schemas = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            schemas[_i] = arguments[_i];
        }
        var _a;
        return new Builder((_a = Object).assign.apply(_a, [{}, this._schema].concat(schemas.map(function (schema) { return schema instanceof Builder
            ? schema._schema
            : schema; }))));
    };
    Builder.prototype.$id = function (value) {
        return this.$$chain('$id', value);
    };
    Builder.prototype.$ref = function (value) {
        return this.$$chain('$ref', value);
    };
    Builder.prototype.$comment = function (value) {
        return this.$$chain('$comment', value);
    };
    Builder.prototype.title = function (value) {
        return this.$$chain('title', value);
    };
    Builder.prototype.description = function (value) {
        return this.$$chain('description', value);
    };
    Builder.prototype["default"] = function (value) {
        return this.$$chain('default', value);
    };
    Builder.prototype.readOnly = function (value) {
        return this.$$chain('readOnly', value);
    };
    Builder.prototype.examples = function (value) {
        return this.$$chain('examples', value);
    };
    Builder.prototype.definitions = function (value) {
        return this.$$chain('definitions', value);
    };
    Builder.prototype.type = function (value) {
        return this.$$chain('type', value);
    };
    Builder.prototype["enum"] = function (value) {
        return this.$$chain('enum', value);
    };
    Builder.prototype["const"] = function (value) {
        return this.$$chain('const', value);
    };
    Builder.prototype.multipleOf = function (value) {
        return this.$$chain('multipleOf', value);
    };
    Builder.prototype.maximum = function (value) {
        return this.$$chain('maximum', value);
    };
    Builder.prototype.exclusiveMaximum = function (value) {
        return this.$$chain('exclusiveMaximum', value);
    };
    Builder.prototype.minimum = function (value) {
        return this.$$chain('minimum', value);
    };
    Builder.prototype.exclusiveMinimum = function (value) {
        return this.$$chain('exclusiveMinimum', value);
    };
    Builder.prototype.maxLength = function (value) {
        return this.$$chain('maxLength', value);
    };
    Builder.prototype.minLength = function (value) {
        return this.$$chain('minLength', value);
    };
    Builder.prototype.pattern = function (value) {
        return this.$$chain('pattern', value instanceof RegExp
            ? value.source
            : value);
    };
    Builder.prototype.additionalItems = function (value) {
        return this.$$chain('additionalItems', value);
    };
    Builder.prototype.items = function (value) {
        return this.$$chain('items', value);
    };
    Builder.prototype.maxItems = function (value) {
        return this.$$chain('maxItems', value);
    };
    Builder.prototype.minItems = function (value) {
        return this.$$chain('minItems', value);
    };
    Builder.prototype.uniqueItems = function (value) {
        return this.$$chain('uniqueItems', value);
    };
    Builder.prototype.contains = function (value) {
        return this.$$chain('contains', value);
    };
    Builder.prototype.maxProperties = function (value) {
        return this.$$chain('maxProperties', value);
    };
    Builder.prototype.minProperties = function (value) {
        return this.$$chain('minProperties', value);
    };
    Builder.prototype.required = function (value) {
        if (value === void 0) { value = true; }
        var instance = this.concat({});
        instance._required = value;
        return instance;
    };
    Builder.prototype.additionalProperties = function (value) {
        return this.$$chain('additionalProperties', value);
    };
    Builder.prototype.properties = function (value) {
        return this.$$chain('properties', value);
    };
    Builder.prototype.patternProperties = function (value) {
        return this.$$chain('patternProperties', value);
    };
    Builder.prototype.dependencies = function (value) {
        return this.$$chain('dependencies', value);
    };
    Builder.prototype.propertyNames = function (value) {
        return this.$$chain('propertyNames', value);
    };
    Builder.prototype.format = function (value) {
        return this.$$chain('format', value);
    };
    Builder.prototype.contentMediaType = function (value) {
        return this.$$chain('contentMediaType', value);
    };
    Builder.prototype.contentEncoding = function (value) {
        return this.$$chain('contentEncoding', value);
    };
    Builder.prototype["if"] = function (condition, thenClause, elseClause) {
        var chain = this.$$chain('if', condition);
        if (thenClause !== undefined &&
            thenClause !== null) {
            chain = chain.$$chain('then', thenClause);
        }
        if (elseClause !== undefined &&
            elseClause !== null) {
            chain = chain.$$chain('else', elseClause);
        }
        return chain;
    };
    Builder.prototype.allOf = function (value) {
        return this.$$chain('allOf', value);
    };
    Builder.prototype.anyOf = function (value) {
        return this.$$chain('anyOf', value);
    };
    Builder.prototype.oneOf = function (value) {
        return this.$$chain('oneOf', value);
    };
    Builder.prototype.not = function (value) {
        return this.$$chain('not', value);
    };
    Builder.prototype.$$chain = function (keyword, value) {
        var _a;
        return this.concat((_a = {},
            _a[keyword] = value,
            _a));
    };
    Builder.prototype.$$compile = function () {
        var required = this._schema.required || [];
        if (this._schema.properties) {
            var propertyMap_1 = this._schema.properties;
            var propertyNames = Object.keys(this._schema.properties);
            required = required.concat(propertyNames.filter(function (name) {
                return propertyMap_1[name] instanceof Builder &&
                    propertyMap_1[name]._required;
            }));
        }
        this._cache = __assign({}, Builder.toJSON(this._schema), required.length && { required: required });
    };
    Builder.prototype.$$clean = function () {
        this._cache = undefined;
    };
    Builder.prototype.toJSON = function () {
        if (!this._cache)
            this.$$compile();
        return this._cache;
    };
    Builder.toJSON = function (value) {
        if (value instanceof Builder) {
            return value.toJSON();
        }
        else if (typeof value === 'object') {
            if (value === null) {
                return null;
            }
            else if (Array.isArray(value)) {
                return value.map(function (item) { return Builder.toJSON(item); });
            }
            else {
                return Object.keys(value).reduce(function (json, key) { return (json[key] = Builder.toJSON(value[key]), json); }, {});
            }
        }
        else {
            return value;
        }
    };
    return Builder;
}());
;
var builderShared = new Builder();
var builderStatic = function (schema) {
    if (schema === void 0) { schema = {}; }
    if (typeof schema === 'boolean') {
        return schema;
    }
    else if (typeof schema === 'object') {
        return new Builder(schema);
    }
    else {
        throw new TypeError("Schema must be of type boolean or object");
    }
};
function quickNull() {
    return builderShared.type('null');
}
builderStatic["null"] = quickNull;
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
function quickString(format) {
    return format
        ? builderShared.type('string').format(format)
        : builderShared.type('string');
}
builderStatic.string = quickString;
function quickNullOrString(format) {
    return format
        ? builderShared.type(['null', 'string']).format(format)
        : builderShared.type(['null', 'string']);
}
builderStatic.nullOrString = quickNullOrString;
function quickArray(items, additionalItems) {
    var chain = builderShared.type('array');
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
function quickNullOrArray(items, additionalItems) {
    var chain = builderShared.type(['null', 'array']);
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
function quickObject(properties, additionalProperties) {
    var chain = builderShared.type('object');
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
function quickNullOrObject(properties, additionalProperties) {
    var chain = builderShared.type(['null', 'object']);
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
var _loop_1 = function (i, keys) {
    var key = keys[i];
    var value = Builder.prototype[key];
    if (typeof value === 'function') {
        builderStatic[key] = function () {
            return value.apply(builderShared, arguments);
        };
    }
};
for (var i = 0, keys = Object.keys(Builder.prototype); i < keys.length; i++) {
    _loop_1(i, keys);
}
builderStatic.Builder = Builder;
module.exports = builderStatic;
//# sourceMappingURL=index.js.map