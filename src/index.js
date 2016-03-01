var i18n = require("i18n"),
    isArray = require("is_array"),
    isRegExp = require("is_regexp"),
    isNullOrUndefined = require("is_null_or_undefined"),
    emptyFunction = require("empty_function"),
    isFunction = require("is_function"),
    has = require("has"),
    indexOf = require("index_of");


var propTypes = exports,
    defaultLocale = "en";


i18n = i18n.create(true, true);


if (!i18n.has("en", "prop_types.anonymous")) {
    i18n.add("en", require("./en"));
}


propTypes.createTypeChecker = createTypeChecker;

function createTypeChecker(validate) {

    function checkType(props, propName, callerName, locale) {
        if (isNullOrUndefined(props[propName])) {
            return null;
        } else {
            return validate(props, propName, callerName || ("<<" + i18n(locale || defaultLocale, "prop_types.anonymous") + ">>"), locale || defaultLocale);
        }
    }

    checkType.isRequired = function checkIsRequired(props, propName, callerName, locale) {
        callerName = callerName || ("<<" + i18n(locale || defaultLocale, "prop_types.anonymous") + ">>");

        if (isNullOrUndefined(props[propName])) {
            return new TypeError(i18n(locale || defaultLocale, "prop_types.is_required", propName, callerName));
        } else {
            return validate(props, propName, callerName, locale || defaultLocale);
        }
    };

    return checkType;
}

propTypes.array = createPrimitiveTypeChecker("array");
propTypes.bool = createPrimitiveTypeChecker("boolean");
propTypes["boolean"] = propTypes.bool;
propTypes.func = createPrimitiveTypeChecker("function");
propTypes["function"] = propTypes.func;
propTypes.number = createPrimitiveTypeChecker("number");
propTypes.object = createPrimitiveTypeChecker("object");
propTypes.string = createPrimitiveTypeChecker("string");

propTypes.regexp = createTypeChecker(function validateRegExp(props, propName, callerName, locale) {
    var propValue = props[propName];

    if (isRegExp(propValue)) {
        return null;
    } else {
        return new TypeError(i18n(locale || defaultLocale, "prop_types.regexp", propName, propValue, callerName));
    }
});

propTypes.instanceOf = function createInstanceOfCheck(expectedClass) {
    return createTypeChecker(function validateInstanceOf(props, propName, callerName, locale) {
        var propValue = props[propName],
            expectedClassName;

        if (propValue instanceof expectedClass) {
            return null;
        } else {
            expectedClassName = expectedClass.name || ("<<" + i18n(locale || defaultLocale, "prop_types.anonymous") + ">>");

            return new TypeError(
                i18n(locale || defaultLocale, "prop_types.instance_of", propName, getPreciseType(propValue), callerName, expectedClassName)
            );
        }
    });
};

propTypes.any = createTypeChecker(emptyFunction.thatReturnsNull);

propTypes.oneOf = function createOneOfCheck(expectedValues) {
    return createTypeChecker(function validateOneOf(props, propName, callerName, locale) {
        var propValue = props[propName];

        if (indexOf(expectedValues, propValue) !== -1) {
            return null;
        } else {
            return new TypeError(
                i18n(locale || defaultLocale, "prop_types.one_of", propName, propValue, callerName, JSON.stringify(expectedValues))
            );
        }
    });
};

propTypes.arrayOf = function createArrayOfCheck(checkType) {

    if (!isFunction(checkType)) {
        throw new TypeError(
            "Invalid Function Interface for arrayOf, checkType must be a function" +
            "Function(props: Object, propName: String, callerName: String, locale) return Error or null."
        );
    }

    return createTypeChecker(function validateArrayOf(props, propName, callerName, locale) {
        var error = propTypes.array(props, propName, callerName, locale),
            propValue, i, il;

        if (error) {
            return error;
        } else {
            propValue = props[propName];
            i = -1;
            il = propValue.length - 1;

            while (i++ < il) {
                error = checkType(propValue, i, callerName + "[" + i + "]", locale);
                if (error) {
                    return error;
                }
            }

            return null;
        }
    });
};

propTypes.implement = function createImplementCheck(expectedInterface) {
    var key;

    for (key in expectedInterface) {
        if (has(expectedInterface, key) && !isFunction(expectedInterface[key])) {
            throw new TypeError(
                "Invalid Function Interface for " + key + ", must be functions " +
                "Function(props: Object, propName: String, callerName: String, locale) return Error or null."
            );
        }
    }

    return createTypeChecker(function validateImplement(props, propName, callerName, locale) {
        var results = null,
            localHas = has,
            propInterface = props[propName],
            propKey, propValidate, result;

        for (propKey in expectedInterface) {
            if (localHas(expectedInterface, propKey)) {
                propValidate = expectedInterface[propKey];
                result = propValidate(propInterface, propKey, callerName + "." + propKey, locale || defaultLocale);

                if (result) {
                    results = results || [];
                    results[results.length] = result;
                }
            }
        }

        return results;
    });
};

function createPrimitiveTypeChecker(expectedType) {
    return createTypeChecker(function validatePrimitive(props, propName, callerName, locale) {
        var propValue = props[propName],
            type = getPropType(propValue);

        if (type !== expectedType) {
            callerName = callerName || ("<<" + i18n(locale || defaultLocale, "prop_types.anonymous") + ">>");

            return new TypeError(
                i18n(locale || defaultLocale, "prop_types.primitive", propName, getPreciseType(propValue), callerName, expectedType)
            );
        } else {
            return null;
        }
    });
}

function getPropType(value) {
    var propType = typeof(value);

    if (isArray(value)) {
        return "array";
    } else if (value instanceof RegExp) {
        return "object";
    } else {
        return propType;
    }
}

function getPreciseType(propValue) {
    var propType = getPropType(propValue);

    if (propType === "object") {
        if (propValue instanceof Date) {
            return "date";
        } else if (propValue instanceof RegExp) {
            return "regexp";
        } else {
            return propType;
        }
    } else {
        return propType;
    }
}
