'use strict';

var React = require('react');

/**
 * Returns a created higher-order component based on some mixin's methods.
 *
 * @param {ReactComponent} component
 * @param {Object} mixin
 * @param {Object} transfer Optional object to merge into component's `props`
 * @return {ReactComponent}
 * @api public
 */
module.exports = function MixinDecorator (component, mixin, transfer) {
  mixin.render = function () {
    return React.createElement(component, getProps.call(this, transfer));
  };
  return React.createElement(React.createClass(mixin));
}

/**
 * Gets the `props` to be passed to the component.
 *
 * @param {Object} transfer Optional
 * @return {Object}
 * @api private
 */
function getProps (transfer) {
  var props = {};

  [this.props, this.state, transfer].forEach(function (obj) {
    if (obj) {
      for (var key in obj) {
        var value = obj[key];

        props[key] = typeof value === 'function'
          ? value.bind(this)
          : value;
      }
    }
  }.bind(this));

  return props;
}