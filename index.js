/**
 * Monkey-patches some component to use some mixin's methods.
 *
 * @param {Function} component (technically any function)
 * @param {Object} mixin
 * @return {Function}
 * @api public
 */
module.exports = function MixinDecorator (component, mixin) {
  var prototype = component.prototype;
  var keys = Object.keys(mixin);

  keys.forEach(function (key) {
    var original = prototype[key];

    if (typeof mixin[key] === 'function') {
      prototype[key] = function () {
        if (typeof original === 'function') {
          original.apply(this, arguments);
        }
        return mixin[key].apply(this, arguments);
      };
    }
  });

  return component;
}