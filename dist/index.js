'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

/**
 * Returns a higher-order component based on some mixin's methods.
 *
 * @param {String} displayName looks nice in inspector with `react-devtools`
 * @param {Object} mixin
 * @param {Object} transfer Optional object to merge into component's `props`
 * @return {Function}
 * @api public
 */
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
function MixinDecorator(displayName, mixin, transfer) {
  var keys = Object.keys(mixin).filter(function (key) {
    return !IGNORE[key];
  });

  var HOC = function HOC(Component) {
    return (function (_React$Component) {
      var _class = function () {
        _classCallCheck(this, _class);

        if (_React$Component != null) {
          _React$Component.apply(this, arguments);
        }
      };

      _inherits(_class, _React$Component);

      _createClass(_class, [{
        key: 'render',
        value: function render() {
          var props = getProps.call(this, transfer);
          return _react2['default'].createElement(Component, props);
        }
      }], [{
        key: 'displayName',
        value: displayName,
        enumerable: true
      }]);

      return _class;
    })(_react2['default'].Component);
  };

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
function getProps(transfer) {
  var props = {};

  [this.props, this.state, transfer].forEach((function (obj) {
    if (obj) {
      for (var key in obj) {
        var value = obj[key];

        props[key] = typeof value === 'function' ? value.bind(this) : value;
      }
    }
  }).bind(this));

  return props;
}
module.exports = exports['default'];

