var tape = require("tape"),
    propTypes = require("..");


tape(
    "propTypes#createTypeChecker(validate : Function) " +
    "should return a function with a isRequired method that returns a function " +
    "that returns TypeError if propName is null or undefined",
    function(assert) {
        var customChecker, result;

        customChecker = propTypes.createTypeChecker(function(props, propName, callerName /*, locale */ ) {
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
        assert.equal(
            result.message, "Invalid value of value 'not_right' supplied to TestFunction expected string 'property'."
        );

        assert.equal(customChecker({
            value: "property"
        }, "value", "TestFunction", "en"), null);

        assert.equal(customChecker({
            value: null
        }, "value", "TestFunction", "en"), null);

        result = customChecker.isRequired({
            value: null
        }, "value", "TestFunction", "en");
        assert.equal(
            result.message, "Required value was not specified in TestFunction."
        );

        assert.end();
    }
);
