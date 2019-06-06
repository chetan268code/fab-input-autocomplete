import React from 'react';
import { mount } from 'enzyme';
import Autocomplete from './Autocomplete';
import { findByTestAttr } from '../Utils';

const props = {
	throttle: 1000,
	locations: true,
	establishments: true
}

const setUp = (props={}) => {
	const component = mount(<Autocomplete {...props} />);
	return component;
}

describe('Autocomplete component', () => {
	describe('Has suggestions when user inputs text', () => {
		let component;
		beforeEach(() => {
			component = setUp(props);
			component.setState({ 
				filteredSuggestions: [
					{type: 'location', name: 'Delhi'},
					{type: 'establishment', name: 'Fab Hotels'},
				],
				showSuggestions: true,
				userInput: "Delhi",
				warning: ""
			});
		});
		
		it('Should render without errors', () => {
			const wrapper = findByTestAttr(component, 'suggestions-wrapper');
			expect(wrapper.length).toBe(1);
		})
		
		it('Should render with suggestions', () => {
			const wrapper = findByTestAttr(component, 'suggestions');
			expect(wrapper.length).toBe(1);
		})
		
		// it('Should render with n suggestions', () => {
		// 	const wrapper = findByTestAttr(component, 'suggestion');
		// 	expect(wrapper.length).toBe(2);
		// })
	});
	
	describe('Has NO suggestions when user inputs text', () => {
		let component;
		beforeEach(() => {
			component = setUp(props);
			component.setState({ 
				filteredSuggestions: [
				],
				showSuggestions: true,
				userInput: "Delhi",
				warning: ""
			});
		});
		
		it('Should render without errors', () => {
			const wrapper = findByTestAttr(component, 'suggestions-wrapper');
			expect(wrapper.length).toBe(1);
		})
		
		it('Should NOT render with suggestions', () => {
			const wrapper = findByTestAttr(component, 'suggestions');
			expect(wrapper.length).toBe(0);
		})
		
		// it('Should render with no suggestions custom error', () => {
		// 	const wrapper = findByTestAttr(component, 'no-suggestions-custom-error');
		// 	expect(wrapper.length).toBe(1);
		// })
	});
	
	describe('Has server error when user inputs text', () => {
		let component;
		beforeEach(() => {
			component = setUp(props);
			component.setState({ 
				filteredSuggestions: [
				],
				showSuggestions: false,
				userInput: "Delhi",
				warning: "Usage quota exceeded"
			});
		});
		
		it('Should render without errors', () => {
			const wrapper = findByTestAttr(component, 'suggestions-wrapper');
			expect(wrapper.length).toBe(1);
		})
		
		it('Should NOT render with suggestions', () => {
			const wrapper = findByTestAttr(component, 'suggestions');
			expect(wrapper.length).toBe(0);
		})
		
		// it('Should render with server custom error', () => {
		// 	const wrapper = findByTestAttr(component, 'server-custom-error');
		// 	expect(wrapper.length).toBe(1);
		// })
	});
})