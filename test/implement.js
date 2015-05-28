var assert = require("assert"),
    propTypes = require("../src/index");


describe("propTypes", function() {
    describe("#implement(expectedInterface : Object)", function() {
        it("should force props to implement passed interface", function() {
            var implementChecker, results;

            implementChecker = propTypes.implement({
                object: propTypes.object,
                array: propTypes.array
            });

            results = implementChecker({
                    value: {
                        object: {},
                        array: []
                    }
                },
                "value",
                "TestFunction"
            );
            assert(results === null);

            results = implementChecker({
                    value: {
                        object: [],
                        array: {}
                    }
                },
                "value",
                "TestFunction"
            );
            assert.equal(
                results[0].message,
                "Invalid object of type array supplied to TestFunction.object expected object."
            );
            assert.equal(
                results[1].message,
                "Invalid array of type object supplied to TestFunction.array expected array."
            );
        });

        it("should throw an Error if interface values or not functions", function() {
            try {
                propTypes.implement({
                    object: null
                });
            } catch (e) {
                assert.equal(
                    e.message,
                    "Invalid Interface value object, must be functions " +
                    "(props : Object, propName : String[, callerName : String]) return Error or null."
                );
            }
        });
    });
});
