import React          from 'react';
import MixinDecorator from 'react-mixin-decorator';
import SomeMixin      from 'some-mixin';

const name = 'SomeDecorator';
const props = {contents: 'yo', controlledByMixin: SomeMixin.controlledByMixin};
const autoBind = ['mouseeenter', 'mouseleave'];
const SomeDecorator = MixinDecorator(name, SomeMixin, props, autoBind);

@SomeDecorator
export default class Example extends React.Component {
  render() {
    const contents = this.props.contents;
    const controlled = this.props.controlledByMixin();

    return (
      <div>
        <div>{contents}</div>
        <div>{controlled}</div>
      </div>
    );
  }
}
