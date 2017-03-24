import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from '../../components/signup/SignUpForm';

const setUpComponent = (props = {}) =>
  shallow(<SignUpForm {...props} />);

describe('<SignUpForm /> component: ', () => {
  it('should contain just 1 "form" element', () => {
    const component = setUpComponent({});
    expect(component.find('form').length).toEqual(1);
  });

  it('should have a "form" element as it\'s parent/root node', () => {
    const component = setUpComponent({});
    expect(component.type()).toEqual('form');
  });

  // TODO: Write more tests
});
