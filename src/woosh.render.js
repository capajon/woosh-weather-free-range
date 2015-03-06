'use strict';

var _langTerms = require('./woosh.lang-terms.js');

var _iconCodePictonicMapping =  require('./woosh.settings.json').PictonicIconMappings;


var generateForecast = function(weather) {
	var combined = [],
		forecastHtml = "",
		markup = "";

	_removeRedundantDay(weather);
	_adjustCurrent(weather.current);

	combined.push(weather.current);
	combined = combined.concat(weather.forecast);

	return _forecastMarkup(combined);
	// to do add usability tweaks to current forecast
}

var _removeRedundantDay = function(weather) { // TO DO should this be this module's responsibility?
	// sometimes (often?) forecast also contains today/current
	if ( 	(weather.current.date.getMonth() === weather.forecast[0].date.getMonth() ) &&
			(weather.current.date.getDate() === weather.forecast[0].date.getDate()) ) {
		weather.forecast.splice(0,1);
	}
};

var _forecastMarkup = function(forecast) {
	var html = '<ol>\n'; // TO DO HTML should be handled by a template system or something less ugly than the following
	for(var x=0, y=forecast.length; x < y; x++) {
		html += '<li id="day-'+x+'">\n';
		html += '	<h2>'+forecast[x].dayOfWeek+'</h2>\n';
		html += '	<ul class="weather-info">\n';
		html += '		<li class="icon"><span class="' + _getIconClass(forecast[x].iconId) + '"></span></li>\n';
		html += '		<li class="condition">' + forecast[x].description + '</li>\n';
		html += '		<li class="temp-high">' + forecast[x].temp.high.celsius + '</li>\n';
		html += '		<li class="temp-low">' + forecast[x].temp.low.celsius + ' <span class="icon-wtr-celcius"></span></li>\n';
		html += '	</ul>\n';
		html += '</li>\n';
	}
	html += '</ol>';
	return html;
};

var _adjustCurrent = function(current) {
	//current day gets some extra usability tweaks
	current.temp.low.celsius = '<span class="icon-chevron-down"></span> '+current.temp.low.celsius;
	current.temp.low.fahrenheit = '<span class="icon-chevron-down"></span> '+current.temp.low.fahrenheit;

	if(current.temp.high.celsius > current.temp.current.celsius) { // if current temp is lower than today's high, show today's high too
		current.temp.low.celsius = '<span class="icon-chevron-up"></span> '+current.temp.high.celsius+" / "+current.temp.low.celsius;
		current.temp.low.fahrenheit = '<span class="icon-chevron-up"></span> '+current.temp.high.fahrenheit+" / "+current.temp.low.fahrenheit;
	}
	current.temp.high = current.temp.current;
	current.dayOfWeek = _langTerms.Woosh.General.Current;
};

var _getIconClass = function(iconCode) {
	return _iconCodePictonicMapping[iconCode.substring(0, 3)]; // sometimes openweather has an extra fourth char (bug?)
};

module.exports.generateForecast = generateForecast;