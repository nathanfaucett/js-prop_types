var assert = require("assert"),
    propTypes = require("../src/index");


describe("propTypes", function() {
    describe("#createTypeChecker(validate : Function)", function() {
        it(
            "should return a function with a isRequired method that returns a function\n" +
            "\tthat returns TypeError if propName is null or undefined",
            function() {
                var customChecker, result;

                customChecker = propTypes.createTypeChecker(function(props, propName, callerName) {
                    var propValue = props[propName];

                    if (propValue !== "property") {
                        return new TypeError(
                            "Invalid " + propName + " of value '" + propValue + "' supplied to " +
                            callerName + " expected string 'property'."
                        );
                    } else {
                        return null;
                    }
                });

                result = customChecker({
                    value: "not_right"
                }, "value", "TestFunction");
                assert(
                    result.message === "Invalid value of value 'not_right' supplied to TestFunction expected string 'property'."
                );

                assert(customChecker({
                    value: "property"
                }, "value", "TestFunction") === null);

                assert(customChecker({
                    value: null
                }, "value", "TestFunction") === null);

                result = customChecker.isRequired({
                    value: null
                }, "value", "TestFunction");
                assert(
                    result.message === "Required value was not specified in TestFunction."
                );
            }
        );
    });
});
