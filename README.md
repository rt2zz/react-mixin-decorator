# react-mixin-decorator
Just a few lines of code to make converting mixins to ES7 decorators as higher-order components quick and easy.

## Usage
`npm install react-mixin-decorator --save`

```
/**
 * Returns a higher-order component based on some mixin's methods.
 *
 * @param {String} displayName looks nice in inspector with `react-devtools`, wrapped around the component
 * @param {Object} mixin
 * @param {Object} defaultProps Optional
 * @return {Function}
 * @api public
 */
export default function MixinDecorator (displayName, mixin, defaultProps)
 ```
This creates and returns a higher-order component based on the mixin's methods.  The third argument is optional and will become the higher-order component's `defaultProps`, eventually transferred to the decorated component, along with its state. Any functions passed within `defaultProps` will be bound to the higher-order component.  The decorated component can access the HOC's exposed properties/methods via `this.props`.

Disclaimer: Not every mixin can be converted to a HOC with this.

```js
// woo-come-on.js

import React from 'react';
import MixinDecorator from 'react-mixin-decorator';

export default function SomeDecorator (defaultProps) {
  return MixinDecorator('UsesSomeDecorator', mixin, defaultProps);
}

export const mixin = {
  componentDidMount() {
    const el = React.findDOMNode(this);
    
    this.mouseenter = this.mouseenter.bind(this);
    this.mouseleave = this.mouseleave.bind(this);
    el.addEventListener('mouseenter', this.mouseenter, false);
    el.addEventListener('mouseleave', this.mouseleave, false);
  },
  componentWillUnmount() {
    const el = React.findDOMNode(this);

    el.removeEventListener('mouseenter', this.mouseenter);
    el.removeEventListener('mouseleave', this.mouseleave);
  },
  mouseenter() {
    console.log('WOO COME ON!');
  },
  mouseleave() {
    console.log('YEAH. '+this.props.YEAH);
  }
};
```
```js
// some-component.js

import React from 'react';
import WooComeOn from 'woo-come-on';

@WooComeOn({YEAH: 'WOO!'})
export default class SomeComponent extends React.Component {
  render() {
    return (
      <div title={this.props.YEAH}>HIGH FIVE ME BRO</div>
    );
  }
}
```
