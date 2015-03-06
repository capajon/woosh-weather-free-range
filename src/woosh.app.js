'use strict';

var _apiCall = require('./ow.api.js'),
	_apiToWoosh = require('./ow.to-woosh.js'),
	_wooshRender = require('./woosh.render.js'),
	_settings = require('./woosh.settings.json'),
	_html = require('./woosh.html.js'),
	_langTerms = require('./woosh.lang-terms.js'),
	_el = {}, // for jquery page elements
	_eventNamespace = _settings.General.EventNamespace,
	_orgUnit = require('d2l-orgunit');
	//_foo = require('./woosh.foo.js');
	$ = require('jQuery'); // TO DO grab from D2L page

require('./scss/woosh.app.scss');

var wooshWeather = function(parent) {
	_setupPage(parent);
	_setupEvents();
	
	// testing:
	console.log(_orgUnit);
	//_foo.getRoles();
}

var _setupPage = function(parent) {
	_el.parent = $(parent),
	_el.parent.html(_html.StartingHtml);

	_el.header = _el.parent.find('div.header'),
	_el.message = _el.header.find('div.message'),
	_el.welcome = _el.parent.find('div.welcome'),
	_el.quickPicks = _el.welcome.find('ul.quick-picks'),
	_el.searchForm = _el.parent.find('#search-form'),
	_el.geolocate = _el.welcome.find('a.geolocate'),
	_el.forecast = _el.parent.find('div.forecast');
	_el.woosh = _el.parent.find('#'+ _settings.Markup.WooshWeatherDivId);
}

var _setupEvents = function () {
	_el.searchForm.on("submit." +_eventNamespace, _search);
	_el.geolocate.on('click.' + _eventNamespace, _geoRequest);
	_el.quickPicks.on('click.' + _eventNamespace,'a',_quickPickRequest);
}

var _geoRequest = function(event) {
	event.preventDefault();
	if (navigator.geolocation) {
		// timeout behavior seems unreliable in browser testing :(
		navigator.geolocation.getCurrentPosition(
			_geoSuccess,
			_displayErrFactory(_langTerms.Woosh.Errors.Geolocation, _el),
			{ timeout: 6000 }
		);
	} else {
		_displayErrFactory(_langTerms.Woosh.Errors.Geolocation)();
	}
}

var _geoSuccess = function(position) {
	_el.searchForm.find('input[name=lon]').val(position.coords.longitude);
	_el.searchForm.find('input[name=lat]').val(position.coords.latitude);
	_el.searchForm.trigger('submit');
}

function _quickPickRequest(event) {
	event.preventDefault();
	_el.searchForm.find('input[name=id]').val($(this).data('id'));
	_el.searchForm.trigger('submit');
}

var _search = function(event) {
	event.preventDefault();

	_disableFindCity();

	_apiCall(
		_searchSuccess,
		_searchFailure,
		{
			urlBase: _settings.Api.UrlBase,
			apiKey: _settings.Api.ApiKey,
			name: _el.searchForm.find('input[name="name"]').val(),
			id: _el.searchForm.find('input[name="id"]').val(),
			lon: _el.searchForm.find('input[name="lon"]').val(),
			lat: _el.searchForm.find('input[name="lat"]').val()
		}
	);
}

var _searchSuccess = function(apiCurrent, apiForecast) {
	var city,
		weather;

	city = _apiToWoosh.getCity(apiCurrent);
	weather = _apiToWoosh.getWeather(apiCurrent, apiForecast);

	_outputCityInfo(city);
	_outputForecast(weather);
	_afterSearch();
}

var _searchFailure = function(apiCurrent, apiForecast) {
	_displayErrFactory(_langTerms.Woosh.Errors.General)();
	_afterSearch();
}

var _afterSearch = function() {
	_enableFindCity();
	_clearFindCityHiddenFields();
}

var _displayErrFactory = function(langTerm) {
	return function() {
		_el.message.find('span.text').html(langTerm);
		_el.message.addClass('error');

		_el.forecast.hide();
		_el.welcome.fadeIn(_settings.General.FadeInTimeMs);
		_afterSearch();
	};
}

var _disableFindCity = function(){
	var subBtn = _el.searchForm.find('input[type="submit"]');

	subBtn.attr('disabled',true);
	subBtn.addClass('disabled');
	subBtn.attr('value',_langTerms.Woosh.General.Loading);

	_el.quickPicks.off('click');
	_el.quickPicks.addClass('disabled');
	_el.quickPicks.on('click','a',function(e){e.preventDefault()});
}

var _enableFindCity = function(){
	var subBtn = _el.searchForm.find('input[type="submit"]');

	subBtn.attr('value',_langTerms.Woosh.General.FindCityButton);
	subBtn.removeClass('disabled');
	subBtn.attr('disabled',false);

	_el.quickPicks.off('click');
	_el.quickPicks.removeClass('disabled');
	_el.quickPicks.on('click','a',_quickPickRequest);
}

var _clearFindCityHiddenFields = function() {
	_el.searchForm.find('input[name=id]').val("");
	_el.searchForm.find('input[name=lon]').val("");
	_el.searchForm.find('input[name=lat]').val("");
}

var _outputForecast = function(weather){
	_el.welcome.hide();
	_el.forecast.detach().html( _wooshRender.generateForecast(weather) ).appendTo(_el.woosh);
	_el.forecast.fadeIn(_settings.General.FadeInTimeMs);
}

var _outputCityInfo = function(city){
	_el.message.find('span.text').html(_langTerms.Woosh.General.ViewingMsg + city.name + _langTerms.Woosh.General.CityCountrySeparator + city.country);
	_el.message.removeClass('error');
}


module.exports = wooshWeather;