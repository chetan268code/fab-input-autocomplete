import React from 'react';
import { mount } from 'enzyme';
import Suggestions from './Suggestions';
import { findByTestAttr } from '../Utils';

const setUp = (props={}) => {
	const component = mount(<Suggestions {...props} />);
	return component;
}

describe('Suggestions component', () => {
	describe('Has suggestions when filteredSuggestions has suggestions', () => {
		let component;
		beforeEach(() => {
			const props = { 
				filteredSuggestions: [
					{type: 'location', name: 'Delhi'},
					{type: 'establishment', name: 'Fab Hotels'},
				],
				onClick: () => {}
			};
			component = setUp(props);
		});
		
		it('Should render without errors', () => {
			const wrapper = findByTestAttr(component, 'suggestions-inner-wrapper');
			expect(wrapper.length).toBe(1);
		})
		
		it('Should render with n suggestions', () => {
			const wrapper = findByTestAttr(component, 'suggestion');
			expect(wrapper.length).toBe(2);
		})
	});
	
	describe('Has NO suggestions when filteredSuggestions is empty', () => {
		let component;
		beforeEach(() => {
			const props = { 
				filteredSuggestions: [],
				onClick: () => {}
			};
			component = setUp(props);
		});
		
		it('Should render without errors', () => {
			const wrapper = findByTestAttr(component, 'suggestions-inner-wrapper');
			expect(wrapper.length).toBe(1);
		})
		
		it('Should render with no suggestions custom error', () => {
			const wrapper = findByTestAttr(component, 'suggestion');
			expect(wrapper.length).toBe(0);
		})
	});
})