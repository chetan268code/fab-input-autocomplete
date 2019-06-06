import React from 'react';
import Suggestion from './Suggestion';

function Suggestions(props) {
	const { filteredSuggestions, onClick } = props;

	const locations = filteredSuggestions.filter((suggestion) => {
		return suggestion.type === 'location';
	});

	const establishments = filteredSuggestions.filter((suggestion) => {
		return suggestion.type === 'establishment';
	});

	let location_suggestions = locations.map((suggestion, index) => {
		return (
			<Suggestion 
				data-test="suggestion" 
				key={index} 
				onClick={onClick} 
				suggestion={suggestion} 
			/>
		);
	});

	let hotel_suggestions = establishments.map((suggestion, index) => {
		return (
			<Suggestion 
				data-test="suggestion" 
				key={locations.length+index} 
				onClick={onClick} 
				suggestion={suggestion} 
			/>
		);
	})

	return (
		<ul className="suggestions" data-test="suggestions-inner-wrapper">
			<li className="dropdown-title">Locations</li>
			{location_suggestions}
			<li className="dropdown-title">Hotels</li>
			{hotel_suggestions}
		</ul>
	)
}

export default Suggestions