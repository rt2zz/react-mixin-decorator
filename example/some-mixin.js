// most mixins are probably ES5 so let's use that

var React = require('react');

module.exports = {
  getInitialState: function () {
    return {contents: 'hello', calls: 0};
  },

  componentDidMount: function () {
    var el = React.findDOMNode(this);

    el.addEventListener('mouseenter', this.mouseenter, false);
    el.addEventListener('mouseleave', this.mouseleave, false);
  },

  componentWillUnmount: function () {
    var el = React.findDOMNode(this);

    el.removeEventListener('mouseenter', this.mouseenter);
    el.removeEventListener('mouseleave', this.mouseleave);
  },

  mouseenter: function () {
    this.setState({contents: 'bro', calls: this.state.calls + 1});
  },

  mouseleave: function () {
    this.setState({contents: 'word', calls: this.state.calls + 1});
  },

  controlledByMixin: function () {
    return 'Called '+this.state.calls+' times.';
  }
};
