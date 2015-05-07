import React from 'react';

const IGNORE = {
  getInitialState: true,
  getDefaultProps: true,
  propTypes: true
};

/**
 * Returns a higher-order component based on some mixin's methods.
 *
 * @param {String} displayName looks nice in inspector with `react-devtools`
 * @param {Object} mixin
 * @param {Object} transfer Optional object to merge into component's `props`
 * @return {Function}
 * @api public
 */
export default function MixinDecorator (displayName, mixin, transfer) {
  const keys = Object
    .keys(mixin)
    .filter(function (key) {
      return !IGNORE[key];
    });

  const HOC = Component => class extends React.Component {
    static displayName = displayName

    render() {
      const props = getProps.call(this, transfer);
      return <Component {...props} />;
    }
  }

  HOC.mixin = mixin;
  keys.forEach(function (key) {
    HOC.prototype[key] = mixin[key];
  });

  return HOC;
}

/**
 * Gets the `props` to be passed to the component.
 *
 * @param {Object} transfer Optional
 * @return {Object}
 * @api private
 */
function getProps (transfer) {
  const props = {};

  [this.props, this.state, transfer].forEach(function (obj) {
    if (obj) {
      for (let key in obj) {
        let value = obj[key];

        props[key] = typeof value === 'function'
          ? value.bind(this)
          : value;
      }
    }
  }.bind(this));

  return props;
}