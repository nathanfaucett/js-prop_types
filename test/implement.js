var tape = require("tape"),
    propTypes = require("..");


tape("propTypes#implement(expectedInterface : Object) should force props to implement passed interface", function(assert) {
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
    assert.equal(results, null);

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

    try {
        propTypes.implement({
            object: null
        });
    } catch (e) {
        assert.equal(
            e.message,
            "Invalid Interface value object, must be functions " +
            "(props : Object, propName : String[, callerName : String]) return Error or null.",
            "should throw an Error if interface values or not functions"
        );
    }

    assert.end();
});
