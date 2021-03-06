'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pojo;
/**
 * Deeply converts an immutable or mixed input value to a plain javascript object.
 * If the given object itself was a primitive, `undefined` or `null`, it is returned as-is.
 *
 * @param {any} value - A plain or immutable input value
 * @return {any} - A plain object or a primitive value.
 */
function pojo(value) {
    if (value === undefined || value === null) {
        return value;
    }
    if (value !== Object(value)) {
        // primitive, e.g. string or number
        return value;
    }
    if (typeof value.toJS === 'function') {
        return value.toJS();
    }
    if (Array.isArray(value)) {
        return value.map(function (v) {
            return pojo(v);
        });
    }
    return Object.keys(value).reduce(function (result, key) {
        result[key] = pojo(value[key]);
        return result;
    }, {});
}