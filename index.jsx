import React from 'react';

const IGNORE = {
  getInitialState: true,
  getDefaultProps: true,
  propTypes: true
};

/**
 * Returns a higher-order component based on some mixin's methods.
 *
 * @param {String} displayName looks nice in inspector with `react-devtools`, wrapped around the component
 * @param {Object} mixin
 * @param {Object} defaultProps Optional
 * @return {Function}
 * @api public
 */
export default function MixinDecorator (displayName, mixin, defaultProps) {
  const getInitialState = mixin.getInitialState;
  const keys = Object.keys(mixin)
    .filter(function (key) {
      return !IGNORE[key];
    });

  const HOC = Component => class extends React.Component {
    static displayName = displayName
    static defaultProps = defaultProps

    constructor(props) {
      super(props);

      if (getInitialState) {
        this.state = getInitialState.call(this);
      }
      keys.forEach(function (key) {
        this[key] = mixin[key];
      }.bind(this));
    }
    render() {
      const props = getProps.call(this);
      return <Component {...props} />;
    }
  }

  HOC.mixin = mixin;
  return HOC;
}

/**
 * Gets the `props` and `state` to be passed to the component (as `props`).
 * Functions are bound to the higher-order component.
 *
 * @return {Object}
 * @api private
 */
function getProps () {
  const props = {};

  [this.props, this.state].forEach(function (obj) {
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
