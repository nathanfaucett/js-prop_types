var assert = require("assert"),
    propTypes = require("../src/index");


describe("propTypes", function() {
    describe("#primitives", function() {
        describe("#array", function() {
            it("should return a TypeError if the property with propName in props is not an array", function() {
                var result = propTypes.array({
                    value: {}
                }, "value", "TestFunction");
                assert(result.message === "Invalid value of type object supplied to TestFunction expected array.");

                assert(propTypes.array({
                    value: []
                }, "value", "TestFunction") === null);
            });
        });

        describe("#bool", function() {
            it("should return a TypeError if the property with propName in props is not a boolean", function() {
                var result = propTypes.bool({
                    value: {}
                }, "value", "TestFunction");
                assert(result.message === "Invalid value of type object supplied to TestFunction expected boolean.");

                assert(propTypes.bool({
                    value: true
                }, "value", "TestFunction") === null);
            });
        });

        describe("#func", function() {
            it("should return a TypeError if the property with propName in props is not a function", function() {
                var result = propTypes.func({
                    value: {}
                }, "value", "TestFunction");
                assert(result.message === "Invalid value of type object supplied to TestFunction expected function.");

                assert(propTypes.func({
                    value: function() {}
                }, "value", "TestFunction") === null);
            });
        });

        describe("#func", function() {
            it("should return a TypeError if the property with propName in props is not a function", function() {
                var result = propTypes.func({
                    value: {}
                }, "value", "TestFunction");
                assert(result.message === "Invalid value of type object supplied to TestFunction expected function.");

                assert(propTypes.func({
                    value: function() {}
                }, "value", "TestFunction") === null);
            });
        });

        describe("#number", function() {
            it("should return a TypeError if the property with propName in props is not a number", function() {
                var result = propTypes.number({
                    value: "string"
                }, "value", "TestFunction");
                assert(result.message === "Invalid value of type string supplied to TestFunction expected number.");

                assert(propTypes.number({
                    value: 0
                }, "value", "TestFunction") === null);
            });
        });

        describe("#object", function() {
            it("should return a TypeError if the property with propName in props is not a object", function() {
                var result = propTypes.object({
                    value: []
                }, "value", "TestFunction");
                assert(result.message === "Invalid value of type array supplied to TestFunction expected object.");

                assert(propTypes.object({
                    value: {}
                }, "value", "TestFunction") === null);
            });
        });

        describe("#string", function() {
            it("should return a TypeError if the property with propName in props is not a string", function() {
                var result = propTypes.string({
                    value: 0
                }, "value", "TestFunction");
                assert(result.message === "Invalid value of type number supplied to TestFunction expected string.");

                assert(propTypes.string({
                    value: "string"
                }, "value", "TestFunction") === null);
            });
        });

        describe("#regexp", function() {
            it("should return a TypeError if the property with propName in props is not a regexp", function() {
                var result = propTypes.regexp({
                    value: "string"
                }, "value", "TestFunction");
                assert(result.message === "Invalid value of value string supplied to TestFunction, expected RexExp.");

                assert(propTypes.regexp({
                    value: /./
                }, "value", "TestFunction") === null);
            });
        });

        describe("#instanceOf(expectedClass)", function() {
            it("should return a TypeError if the property with propName in props is not an instance of expectedClass", function() {
                var checker, result;

                function Class() {}

                checker = propTypes.instanceOf(Class);

                result = checker({
                    value: {}
                }, "value", "TestFunction");
                assert(result.message === "Invalid value of type object supplied to TestFunction, expected instance of Class.");

                assert(checker({
                    value: new Class()
                }, "value", "TestFunction") === null);
            });
        });

        describe("#oneOf(array)", function() {
            it("should return a TypeError if the property with propName in props is not in array", function() {
                var checker, result;

                checker = propTypes.oneOf([1, 2, 3, 4, 5]);

                result = checker({
                    value: 6
                }, "value", "TestFunction");
                assert(result.message === "Invalid value of value 6 supplied to TestFunction, expected one of [1,2,3,4,5].");

                assert(checker({
                    value: 1
                }, "value", "TestFunction") === null);
            });
        });
    });
});
