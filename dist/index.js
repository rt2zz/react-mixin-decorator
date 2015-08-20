'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = MixinDecorator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var IGNORE = {
  getInitialState: true,
  getDefaultProps: true,
  propTypes: true
};

/**
 * Returns a higher-order component based on some mixin's methods.
 *
 * @param {String} displayName for the higher-order component
 * @param {Object} mixin
 * @param {Object} defaultProps Optional
 * @param {Array} autoBind Optional the mixin may need some methods auto-bound
 * @return {Function}
 * @api public
 */

function MixinDecorator(displayName, mixin, defaultProps, autoBind) {
  var getDefaultProps = mixin.getDefaultProps;
  var getInitialState = mixin.getInitialState;
  var propTypes = mixin.propTypes;

  var keys = Object.keys(mixin).filter(function (key) {
    return !IGNORE[key];
  });

  if (Array.isArray(defaultProps)) {
    autoBind = defaultProps;
    defaultProps = {};
  }

  var HOC = function HOC(Component) {
    return (function (_React$Component) {
      var _class = function (props) {
        var _this = this;

        _classCallCheck(this, _class);

        _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, props);

        keys.forEach(function (key) {
          _this[key] = mixin[key];
        });

        if (Array.isArray(autoBind)) {
          autoBind.forEach(function (method) {
            _this[method] = _this[method].bind(_this);
          });
        }

        if (getDefaultProps) {
          addDefaultProps(props, getDefaultProps.call(this));
        }

        if (getInitialState) {
          this.state = getInitialState.call(this);
        } else {
          this.state = {}; // just in case
        }
      };

      _inherits(_class, _React$Component);

      _createClass(_class, [{
        key: 'render',
        value: function render() {
          var props = getProps.call(this, mixin);

          return _react2['default'].createElement(Component, props);
        }
      }], [{
        key: 'displayName',
        value: displayName,
        enumerable: true
      }, {
        key: 'defaultProps',
        value: defaultProps,
        enumerable: true
      }, {
        key: 'propTypes',
        value: propTypes,
        enumerable: true
      }]);

      return _class;
    })(_react2['default'].Component);
  };

  HOC.mixin = mixin;
  return HOC;
}

/**
 * Adds `mixin.getDefaultProps()` values to the actual `props` if undefined.
 *
 * @param {Object} props
 * @param {Object} mixinDefaultProps
 * @api private
 */
function addDefaultProps(props, mixinDefaultProps) {
  if (mixinDefaultProps) {
    for (var key in mixinDefaultProps) {
      if (props[key] === undefined) {
        props[key] = mixinDefaultProps[key];
      }
    }
  }
}

/**
 * Gets the `props` and `state` to be passed to the component (as `props`).
 * Mixin methods are bound to the higher-order component.
 *
 * @param {Object} mixin
 * @return {Object}
 * @api private
 */
function getProps(mixin) {
  var _this2 = this;

  var props = {};

  [this.props, this.state].forEach(function (obj) {
    if (obj) {
      for (var key in obj) {
        var value = obj[key];

        props[key] = typeof value === 'function' && value === mixin[key] ? value.bind(_this2) : value;
      }
    }
  });

  return props;
}
module.exports = exports['default'];

