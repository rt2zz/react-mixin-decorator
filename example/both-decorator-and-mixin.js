import React          from 'react';
import MixinDecorator from 'react-mixin-decorator';

function controlledByBoth () {
  return 'Called '+this.state.calls+' times.';
}

export default MixinDecorator(
  'BothDecoratorAndMixin',

  {
    getInitialState: function () {
      return {contents: 'hello', calls: 0};
    },

    componentDidMount: function () {
      const el = React.findDOMNode(this);

      el.addEventListener('mouseenter', this.mouseenter, false);
      el.addEventListener('mouseleave', this.mouseleave, false);
    },

    componentWillUnmount: function () {
      const = React.findDOMNode(this);

      el.removeEventListener('mouseenter', this.mouseenter);
      el.removeEventListener('mouseleave', this.mouseleave);
    },

    mouseenter: function () {
      this.setState({contents: 'bro', calls: this.state.calls + 1});
    },

    mouseleave: function () {
      this.setState({contents: 'word', calls: this.state.calls + 1});
    },

    controlledByBoth: controlledByBoth
  },

  {
    contents: 'yo',
    controlledByBoth: controlledByBoth
  },

  [
    'mouseenter',
    'mouseleave'
  ]
};
