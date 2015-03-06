var $ = require('jquery');

var _getJSON = function(url) {
	return $.ajax(url,{
		type: "GET",
		contentType: 'application/json',
		dataType: 'jsonp',
		timeout: 6000
	});
};
var callApi = function(callbackSuccess, callbackErr, options) { // to do add urlBase and apiKey and default city to options)
	var urlCurrent = "",
		urlForecast = "",
		settings = $.extend({
			urlBase: "http://api.openweathermap.org/data/2.5/",
			apiKey: "",
			name: "Waterloo,ON",
			id: undefined,
			lon: undefined,
			lat: undefined,
			days: 6
		}, options);

	if (settings.id) {
		urlCurrent = settings.urlBase+"weather?id="+settings.id;
		urlForecast = settings.urlBase+"forecast/daily?cnt="+settings.days+"&id="+settings.id;
	} else if (settings.lon && settings.lat) {
		urlCurrent = settings.urlBase+"weather?lat="+settings.lat+"&lon="+settings.lon;
		urlForecast = settings.urlBase+"forecast/daily?cnt="+settings.days+"&lat="+settings.lat+"&lon="+settings.lon;
	} else { // use city name
		urlCurrent =  settings.urlBase+"weather?q="+encodeURIComponent(settings.name);
		urlForecast = settings.urlBase+"forecast/daily?cnt="+settings.days+"&q="+encodeURIComponent(settings.name);
	}
	if (settings.apiKey !== "") {
		settings.apiKey = "&APPID=" + settings.apiKey;
		urlCurrent += settings.apiKey;
		urlForecast += settings.apiKey;
	}

	$.when(_getJSON(urlCurrent),_getJSON(urlForecast))
		.then(	function(current, forecast){
					callbackSuccess(current[0], forecast[0]);
				},
				function(current, forecast){
					callbackErr(current[0], forecast[0]);
				});
};

module.exports = callApi;