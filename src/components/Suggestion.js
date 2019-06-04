import React from 'react';
import location_icon from "../images/placeholder.png";
import hotel_icon from "../images/hotel.png";

function Suggestion(props) {
    const { onClick, suggestion } = props;
    const icon = suggestion.type === 'location' ? location_icon : hotel_icon;

    return (
        <li onClick={onClick} className="dropdown-content">
        	<img className="suggestions_icon" src={icon} alt="Location" />{suggestion.name}
        </li>
    )
}

export default Suggestion