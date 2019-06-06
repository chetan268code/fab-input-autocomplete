import { GOOGLE_API_KEY, GOOGLE_MAPS_API } from '../config';

export const findByTestAttr = (component, attr) => {
	const wrapper = component.find(`[data-test='${attr}']`);
	return wrapper;
}

export const mapToUrls = (locations, establishments, userInput) => {
	const urls = []
	if(locations)
		urls.push(GOOGLE_MAPS_API+'?input='+userInput+'&types=address&key='+GOOGLE_API_KEY)
	if(establishments)
		urls.push(GOOGLE_MAPS_API+'?input='+userInput+'&types=establishment&key='+GOOGLE_API_KEY)
	return urls;
}