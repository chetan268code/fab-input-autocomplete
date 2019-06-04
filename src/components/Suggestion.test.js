import React from 'react';
import { mount } from 'enzyme';
import Suggestion from './Suggestion';
import { findByTestAttr } from '../Utils';

const setUp = (props={}) => {
  const component = mount(<Suggestion {...props} />);
  return component;
}

describe('Suggestion Component', () => {
    let component;
    beforeEach(() => {
        const props = {
            suggestion: {
                type: 'location',
                name: 'Delhi'
            }
        }
        component = setUp(props);
    });
  
    it('Should render without errors', () => {
      const wrapper = findByTestAttr(component, 'dropdown-content');
      expect(wrapper.length).toBe(1);
    })
  
    it('Should render with suggestion name', () => {
      const wrapper = findByTestAttr(component, 'suggestion-name')
      expect(wrapper.length).toBe(1);
    })
  })