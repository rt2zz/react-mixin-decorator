# react-mixin-decorator
Quickly convert mixins to ES7 decorators as higher-order components and/or create decorators that can easily double as mixins.

## Why?
Because as a good developer, you like to maximize code reuse.  If you're creating React components using ES6 classes and you'd like to use existing mixins to add some nice functionality to your component, you probably don't want to take the time to convert the mixins to something that your ES6 React component class could use.

Or maybe you're creating a decorator and you want an extremely easy way to offer the same functionality to folks using `React.createClass`.

## Installation
`npm install react-mixin-decorator`

You should also of course be using ES6/ES7.  If by some chance you're reading this and aren't aware of [`Babel`](https://babeljs.io), check it out.

## Usage
```js
import React          from 'react';
import MixinDecorator from 'react-mixin-decorator';
import SomeMixin      from 'some-mixin';

const defaultProps  = {...};
const autoBind      = [...];
const SomeDecorator = MixinDecorator(
  'SomeDecorator',  // displayName
  SomeMixin,
  defaultProps,     // optional
  autoBind          // optional
);

@SomeDecorator
export default class Example extends React.Component {
  // etc.
}
```

The generated decorator's `props` and `state` are passed to the decorated component's `props`.

If you want to pass any of the mixin's methods to the decorated component, pass them within the `defaultProps` argument with the same key, and each method will be auto-bound to the higher-order component.  The decorated component can then access the method via `this.props.someMixinMethod`.

You may also provide an array of methods that you know need to be auto-bound.

## Example: Mixin -> Decorator
See [`example.jsx`](https://github.com/timbur/react-mixin-decorator/blob/master/example/example.jsx) and [`some-mixin.js`](https://github.com/timbur/react-mixin-decorator/blob/master/example/some-mixin.js).

## Example: Both Decorator & Mixin
See [`example-two.jsx`](https://github.com/timbur/react-mixin-decorator/blob/master/example/example-two.jsx) and [`both-decorator-and-mixin.js`](https://github.com/timbur/react-mixin-decorator/blob/master/example/both-decorator-and-mixin.js).

## Real World Example
See [`use-tooltip`](https://github.com/loggur/use-tooltip) for a decorator that adds a tooltip to React components.

## Disclaimer
Not every mixin can be converted to a higher-order component with this.

## MIT License
