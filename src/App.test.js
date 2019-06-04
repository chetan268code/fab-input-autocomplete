import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { findByTestAttr } from './Utils';

const setUp = (props={}) => {
  const component = shallow(<App {...props} />);
  return component;
}

describe('App Component', () => {
  let component;
  beforeEach(() => {
    component = setUp()
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAttr(component, 'input-wrapper');
    expect(wrapper.length).toBe(1);
  })

  it('Should render with 1 heading', () => {
    const heading = findByTestAttr(component, 'heading')
    expect(heading.length).toBe(1);
  })
})
