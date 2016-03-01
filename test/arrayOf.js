var tape = require("tape"),
    propTypes = require("..");


tape("propTypes#arrayOf(checkType: Function) should force prop array to implement passed interface", function(assert) {
    var arrayOfChecker = propTypes.arrayOf(propTypes.string),
        results = arrayOfChecker({
                value: ["a", "b", "c"]
            },
            "value",
            "TestFunction"
        );

    assert.equal(results, null);

    results = arrayOfChecker({
            value: ["a", "b", null]
        },
        "value",
        "TestFunction"
    );

    console.log(results);

    try {
        propTypes.arrayOf({});
    } catch (e) {
        assert.equal(
            e.message,
            "Invalid Function Interface for arrayOf, checkType must be a function" +
            "Function(props: Object, propName: String, callerName: String, locale) return Error or null."
        );
    }

    assert.end();
});
