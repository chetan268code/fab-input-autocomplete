import React, { Component } from "react";
import PropTypes from "prop-types";
import Suggestions from './Suggestions'
import CustomError from './CustomError';
import throttle from '../Utils/throttle';
import { mapToUrls } from '../Utils';
import "../css/Autocomplete.css";

class Autocomplete extends Component {
	static propTypes = {
		throttle: PropTypes.number.isRequired,
		locations: PropTypes.bool.isRequired,
		establishments: PropTypes.bool.isRequired
	};

	constructor(props) {
		super(props);

	    this.state = {
	    	// The suggestions that match the user's input
	    	filteredSuggestions: [],
	      	// Whether or not the suggestion list is shown
	      	showSuggestions: false,
	      	// What the user has entered
		  	userInput: "",
		  	// Catch errors/warnings
		  	warning: ""
	    };
	}
	
	// Get suggestions by using Google APIs
	getSuggestions = throttle(() => {
		let userInput = encodeURI(this.state.userInput + ' india');
		let {locations, establishments} = this.props;

		let suggestions = [];
				
		let urls = mapToUrls(locations, establishments, userInput);
		
		let requests = urls.map(url => fetch(url));

		Promise.all(requests)
		.then(responses => {
			// API Hit success
			let jsonRequests = responses.map(response => response.json())
			Promise.all(jsonRequests)
			.then(jsonResponses => {
				// JSON resolve success
				jsonResponses.forEach(data => {
					if(data.status !== 'OK')
						throw new Error(data.error_message);

					if(data.predictions.length) {
						data.predictions.forEach(prediction => {
							let type = prediction.types.includes("geocode") ? 'location' : 'establishment';
							let name = prediction.description;
							suggestions.push({
								name,
								type
							});
						})
					}
				})
				return suggestions;
			})
			.then(suggestions => {
				// Suggestions stored in state successfully
				this.setState({
					filteredSuggestions: suggestions,
					showSuggestions: true,
					warning: ""
				});
			})
			.catch(err => {
				console.log(err.message);
				// Error parsing or storing suggestions
				this.setState({
					filteredSuggestions: [],
					showSuggestions: false,
					warning: "Something went wrong, please try again!!"
				})
			})
		})
		.catch(err => {
			console.log(err);
			// API Hit Fail
			this.setState({
				filteredSuggestions: [],
				showSuggestions: false,
				warning: "Error connecting the server, please try again!!"
			})
		})
	}, this.props.throttle);

	// Event fired when the input value is changed
	onChange = e => {
		const userInput = e.currentTarget.value;

    	this.setState({
			userInput: userInput
		}, () => {
			if(this.state.userInput) {
				this.getSuggestions()
			}
		});
  	};

  	// Event fired when the user clicks on a suggestion
  	onClick = e => {
    	// Update the user input and reset the rest of the state
    	this.setState({
    		filteredSuggestions: [],
	      	showSuggestions: false,
			userInput: e.currentTarget.innerText,
			warning: ""
    	});
  	};

  	render() {
    	const {
      		onChange,
      		onClick,
      		onKeyDown,
      		state: {
        		filteredSuggestions,
        		showSuggestions,
				userInput,
				warning
      		}
    	} = this;

    	let suggestionsListComponent;

    	if (showSuggestions && userInput) {
      		if (filteredSuggestions.length) {

        		suggestionsListComponent = (
      				<Suggestions data-test="suggestions" filteredSuggestions={filteredSuggestions} onClick={onClick} />
        		);
      		} else {
        		suggestionsListComponent = (
					<CustomError data-test="no-suggestions-custom-error" msg="No results found, explore something else!!" />
        		);
			}
		}
		else if(userInput && warning) {
			suggestionsListComponent = (
				<CustomError data-test="server-custom-error" msg={warning} />
			);
		}
		else {
			suggestionsListComponent = (
				<CustomError msg="" />
			);
		}

    	return (
      		<div data-test="suggestions-wrapper">
        		<input type="text" onChange={onChange} onKeyDown={onKeyDown} value={userInput} />
        		{suggestionsListComponent}
      		</div>
    	);
  	}
}

export default Autocomplete;