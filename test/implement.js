var assert = require("assert"),
    propTypes = require("../src/index");


describe("propTypes", function() {
    describe("#implement(expectedInterface : Object)", function() {
        it("should", function() {
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
    });
});
