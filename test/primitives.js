var tape = require("tape"),
    propTypes = require("..");


tape("propTypes#array: should return a TypeError if the property with propName in props is not an array ", function(assert) {
    var result = propTypes.array({
        value: {}
    }, "value", "TestFunction", "en");
    assert.equal(result.message, "Invalid value of type object supplied to TestFunction expected array.");

    assert.equal(propTypes.array({
        value: []
    }, "value", "TestFunction", "en"), null);

    assert.end();
});

tape("propTypes#bool: should return a TypeError if the property with propName in props is not a boolean", function(assert) {
    var result = propTypes.bool({
        value: {}
    }, "value", "TestFunction", "en");
    assert.equal(result.message, "Invalid value of type object supplied to TestFunction expected boolean.");

    assert.equal(propTypes.bool({
        value: true
    }, "value", "TestFunction", "en"), null);

    assert.end();
});

tape("propTypes#func: should return a TypeError if the property with propName in props is not a function", function(assert) {
    var result = propTypes.func({
        value: {}
    }, "value", "TestFunction", "en");
    assert.equal(result.message, "Invalid value of type object supplied to TestFunction expected function.");

    assert.equal(propTypes.func({
        value: function() {}
    }, "value", "TestFunction", "en"), null);

    assert.end();
});

tape("propTypes#number: should return a TypeError if the property with propName in props is not a number", function(assert) {
    var result = propTypes.number({
        value: "string"
    }, "value", "TestFunction", "en");
    assert.equal(result.message, "Invalid value of type string supplied to TestFunction expected number.");

    assert.equal(propTypes.number({
        value: 0
    }, "value", "TestFunction", "en"), null);

    assert.end();
});

tape("propTypes#object: should return a TypeError if the property with propName in props is not a object", function(assert) {
    var result = propTypes.object({
        value: []
    }, "value", "TestFunction", "en");
    assert.equal(result.message, "Invalid value of type array supplied to TestFunction expected object.");

    assert.equal(propTypes.object({
        value: {}
    }, "value", "TestFunction", "en"), null);

    assert.end();
});

tape("propTypes#string: should return a TypeError if the property with propName in props is not a string", function(assert) {
    var result = propTypes.string({
        value: 0
    }, "value", "TestFunction", "en");
    assert.equal(result.message, "Invalid value of type number supplied to TestFunction expected string.");

    assert.equal(propTypes.string({
        value: "string"
    }, "value", "TestFunction", "en"), null);

    assert.end();
});

tape("propTypes#regexp: should return a TypeError if the property with propName in props is not a regexp", function(assert) {
    var result = propTypes.regexp({
        value: "string"
    }, "value", "TestFunction", "en");
    assert.equal(result.message, "Invalid value of value string supplied to TestFunction, expected RexExp.");

    assert.equal(propTypes.regexp({
        value: /./
    }, "value", "TestFunction", "en"), null);

    assert.end();
});

tape("propTypes#instanceOf(expectedClass) should return a TypeError if the property with propName in props is not an instance of expectedClass", function(assert) {
    var checker, result;

    function Class() {}

    checker = propTypes.instanceOf(Class);

    result = checker({
        value: {}
    }, "value", "TestFunction", "en");
    assert.equal(result.message, "Invalid value of type object supplied to TestFunction, expected instance of Class.");

    assert.equal(checker({
        value: new Class()
    }, "value", "TestFunction", "en"), null);

    assert.end();
});

tape("propTypes#oneOf(array) should return a TypeError if the property with propName in props is not in array", function(assert) {
    var checker, result;

    checker = propTypes.oneOf([1, 2, 3, 4, 5]);

    result = checker({
        value: 6
    }, "value", "TestFunction", "en");
    assert.equal(result.message, "Invalid value of value 6 supplied to TestFunction, expected one of [1,2,3,4,5].");

    assert.equal(checker({
        value: 1
    }, "value", "TestFunction", "en"), null);

    assert.end();
});
