/*	Made by Jon Capa for D2L - October 20, 2014
 *  See http://www.joncapa.com/misc/d2l-take-home/ for more details */

var _langTerms = require('./woosh.lang-terms.js');

var getCity = function(owCurrent) {
	return {
		id: owCurrent.id,
		name: owCurrent.name,
		country: owCurrent.sys.country
	};
};

var getWeather = function(owCurrent, owForecast) {
	var data = [];
	data.current = _getCurrent(owCurrent);
	data.forecast = _getForecast(owForecast);
	return data;
};

var _getCurrent = function(owCurrent) {
	var tempHigh = owCurrent.main.temp_max,
		tempLow = owCurrent.main.temp_min,
		tempCur = owCurrent.main.temp,
		date = new Date(owCurrent.dt*1000);

	return {
		date: date,
		dayOfWeek: _dayOfWeekAsString(date.getDay()),
		temp: {
			current: {
				kelvin: tempCur,
				celsius: _kelvinToCelsius(tempCur),
				fahrenheit: _kelvinToFahrenheit(tempCur)
			},
			high: {
				kelvin: tempHigh,
				celsius: _kelvinToCelsius(tempHigh),
				fahrenheit: _kelvinToFahrenheit(tempHigh)
			},
			low: {
				kelvin: tempLow,
				celsius: _kelvinToCelsius(tempLow),
				fahrenheit: _kelvinToFahrenheit(tempLow)
			}
		},
		description: _langTerms.Woosh.OwDescriptions[""+owCurrent.weather[0].id],
		iconId: owCurrent.weather[0].icon
	};
};

var _getForecast = function(owForecast) {
	var data = [],
		date = {},
		tempHigh = 0,
		tempLow = 0,
		list = owForecast.list;

	for (var x = 0, y = list.length; x < y; x++) {
		date = new Date(list[x].dt*1000);
		tempHigh = list[x].temp.max;
		tempLow = list[x].temp.min;
		data.push({
			date: date,
			dayOfWeek: _dayOfWeekAsString(date.getDay()),
			temp: {
				high: {
					kelvin: tempHigh,
					celsius: _kelvinToCelsius(tempHigh),
					fahrenheit: _kelvinToFahrenheit(tempHigh)
				},
				low: {
					kelvin: tempLow,
					celsius: _kelvinToCelsius(tempLow),
					fahrenheit: _kelvinToFahrenheit(tempLow)
				}
			},
			description: _langTerms.Woosh.OwDescriptions[list[x].weather[0].id],
			iconId: list[x].weather[0].icon
		});
	}
	return data;
};

var _dayOfWeekAsString = function(dayIndex) {
	return [
		_langTerms.Woosh.DaysOfWeek.Sunday,
		_langTerms.Woosh.DaysOfWeek.Monday,
		_langTerms.Woosh.DaysOfWeek.Tuesday,
		_langTerms.Woosh.DaysOfWeek.Wednesday,
		_langTerms.Woosh.DaysOfWeek.Thursday,
		_langTerms.Woosh.DaysOfWeek.Friday,
		_langTerms.Woosh.DaysOfWeek.Saturday
	][dayIndex];
};

var _kelvinToCelsius = function(value) {
	return Math.round(value - 273.15);
};

var _kelvinToFahrenheit = function(value) {
	return Math.round(((value - 273.15) * 1.8) + 32);
};

module.exports.getCity = getCity;
module.exports.getWeather = getWeather;