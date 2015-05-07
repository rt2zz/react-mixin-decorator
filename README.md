# react-mixin-decorator
Just a few lines of code to make converting mixins to ES7 decorators as higher-order components quick and easy.

## Usage
`npm install react-mixin-decorator --save`

```js
// woo-come-on.js

import React from 'react';
import MixinDecorator from 'react-mixin-decorator';

export default function SomeDecorator (component) {
  return MixinDecorator(mixin, {...});
  // Creates and returns a higher-order component based on the mixin's methods.
  // Second argument is optional and will be passed to the component as props.
  // Any functions will be bound to the higher-order component.
}

export const mixin = {
  componentDidMount() {
    var el = React.findDOMNode(this);

    el.addEventListener('mouseenter', this.mouseenter.bind(this), false);
    el.addEventListener('mouseleave', this.mouseleave.bind(this), false);
  },
  componentWillUnmount() {
    var el = React.findDOMNode(this);

    el.removeEventListener('mouseenter', this.mouseenter.bind(this));
    el.removeEventListener('mouseleave', this.mouseleave.bind(this));
  },
  mouseenter() {
    console.log('WOO COME ON!');
  },
  mouseleave() {
    console.log('YEAH. WOO.');
  }
};
```
```js
// some-component.js

import React from 'react';
import WooComeOn from 'woo-come-on';

@WooComeOn
export default class SomeComponent extends React.Component {
  render() {
    return (
      <div>HIGH FIVE ME BRO</div>
    );
  }
}
```
