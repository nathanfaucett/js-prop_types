propTypes
=======

propTypes for the browser and node.js

```javascript
var propTypes = require("@nathanfaucett/prop_types");


var props = {
    key: "value"
};

// checks if the key is a string in the given props object
//                             display name     locale for i18n
propTypes.string(props, "key", "Prop",          "en"); // returns error or array of errors
```
