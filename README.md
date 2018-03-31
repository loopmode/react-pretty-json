# react-pretty-json

A react component that pretty-prints JSON data, based on http://jsfiddle.net/unlsj.

## Usage


```
import React, { Component } from 'react';
import PrettyJson from '@loopmode/react-pretty-json';

export class App extends Component {
    state = {
        foo: "foo", 
        bar: "bar",
        nested: {
            stuff: "we needed a nested value",
            some: Immutable.fromJS({
                data: 'immutable as well!' 
            })
        }
    }
    render() {
        return (
            <PrettyJson json={this.state} onError={console.error} />
        );
    }
}

```

### Props

**json**

`json: PropTypes.oneOfType([PropTypes.object, PropTypes.string])`

Either an object that will be converted to a JSON string, or a JSON string.
If it's an object, it will be stringified to JSON first.
It is allowed to pass `immutable.js` objects, or mixed objects containing immutables.


**onPrettyPrint**

`onPrettyPrint: PropTypes.func`

A function that will be invoked with the prettified `html` string in case of success.


**onError**

`onError: PropTypes.func`

A function that will be invoked with the `error` object in case of error.



