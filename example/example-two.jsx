import React from 'react';
import BothDecoratorAndMixin from './both-decorator-and-mixin';

// as a decorator
@BothDecoratorAndMixin
export default class ExampleTwo extends React.Component {
  render() {
    const contents = this.props.contents;
    const controlled = this.props.controlledByBoth();

    return (
      <div>
        <div>{contents}</div>
        <div>{controlled}</div>
      </div>
    );
  }
}

// as a mixin
const ExampleThree = React.createClass({
  mixins: [BothDecoratorAndMixin.mixin],
  render: function () {
    const contents = this.props.contents;
    const controlled = this.props.controlledByBoth();

    return (
      <div>
        <div>{contents}</div>
        <div>{controlled}</div>
      </div>
    );
  }
});
