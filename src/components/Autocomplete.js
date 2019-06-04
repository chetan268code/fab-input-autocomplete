import React, { Component } from "react";
import PropTypes from "prop-types";
import Suggestion from './Suggestion';
import CustomError from './CustomError';
import "../css/Autocomplete.css";

class Autocomplete extends Component {
  static propTypes = {
		throttle: PropTypes.number.isRequired
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

	// Throttle request after every ms seconds
	debounce = (f, ms) => {
		let isCooldown = false;
	
		return function() {
			if (isCooldown) return;
	
			f.apply(this, arguments);
			isCooldown = true;
			setTimeout(() => isCooldown = false, ms);
		};
	}
	
	// Get suggestions by using Google APIs
	getSuggestions = this.debounce(() => {
		let userInput = encodeURI(this.state.userInput + ' india');

		let suggestions = [];
				
		let urls = [
			'/maps/api/place/autocomplete/json?input='+userInput+'&types=address&key='+process.env.REACT_APP_API_KEY,
			'/maps/api/place/autocomplete/json?input='+userInput+'&types=establishment&key='+process.env.REACT_APP_API_KEY
		];
		
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
				let locations = filteredSuggestions.filter((suggestion) => {
					return suggestion.type === 'location';
				});

				let establishments = filteredSuggestions.filter((suggestion) => {
					return suggestion.type === 'establishment';
				});

        suggestionsListComponent = (
          <ul className="suggestions" data-test="suggestions">
						<li className="dropdown-title">Locations</li>
						{locations.map((suggestion, index) => {
							return (
								<Suggestion data-test="suggestion" key={index} onClick={onClick}suggestion={suggestion} />
							);
						})}
						<li className="dropdown-title">Hotels</li>
						{establishments.map((suggestion, index) => {
							return (
								<Suggestion data-test="suggestion" key={index} onClick={onClick} suggestion={suggestion} />
							);
						})}
          </ul>
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