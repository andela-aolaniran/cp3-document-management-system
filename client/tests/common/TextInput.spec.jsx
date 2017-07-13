import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import TextInput from '../../components/common/TextInput';

describe('<TextInput /> component: ', () => {
  const setupComponent = (props = {}) =>
    shallow(<TextInput {...props} />);

  it('Should have a "div" as it\'s root/parent node', () => {
    const textInput = setupComponent();
    expect(textInput.type()).toEqual('div');
  });

  // TODO: Write more tests
});
