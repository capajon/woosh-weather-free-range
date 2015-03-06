'use strict'

// TO DO The HTML here should be located in a template or something less ugly than this! (this is not my proudest programming moment)

var _settings = require('./woosh.settings.json'),
	_langTerms = require('./woosh.lang-terms.js'),
	startingHtml = '';

var _wooshId = _settings.Markup.WooshWeatherDivId;

startingHtml += '	<div id="woosh-main">\n'; // TO DO grab id from settings.json
startingHtml += '		<div class="header clearfix">\n';
startingHtml += '			<div class="message"><p><span class="icon-cr2-info"></span><span class="text">' + _langTerms.Woosh.General.WelcomeMsg + '</span></p></div>\n';
startingHtml += '			<form class="search" id="search-form">\n';
startingHtml += '               <input name="id" type="hidden"></input>\n';
startingHtml += '				<input name="lon" type="hidden"></input>\n';
startingHtml += '				<input name="lat" type="hidden"></input>\n';
startingHtml += '				<input name="name" type="text" placeholder="' + _langTerms.Woosh.General.FindCityPlaceholder + '" required>\n';
startingHtml += '               <input type="submit" value="' + _langTerms.Woosh.General.FindCityButton + '" aria-label="' + _langTerms.Woosh.General.FindCityAriaHint + '">\n';
startingHtml += '			</form>\n';
startingHtml += '		</div>\n';
startingHtml += '		<div class="welcome clearfix">\n';
startingHtml += '			<a href="" class="geolocate clearfix" aria-label="' + _langTerms.Woosh.General.GeoLocateAriaHint + '" ><span class="icon-mapmarker-00"></span>' + _langTerms.Woosh.General.FindMe + '</a>\n';
startingHtml += '			<h2>' + _langTerms.Woosh.General.IntPicksTitle + '</h2>\n';
startingHtml += '			<ul class="quick-picks" aria-label="' + _langTerms.Woosh.General.IntCityAriaHint + '">\n';
startingHtml += '				<li><a href="" data-id="2988507"><span class="icon-lm-eiffel1"></span>' + _langTerms.Woosh.Cities.Paris + '</a></li>\n';
startingHtml += '				<li><a href="" data-id="2643743"><span class="icon-lm-bigben"></span>' + _langTerms.Woosh.Cities.London + '</a></li>\n';
startingHtml += '				<li><a href="" data-id="5128581"><span class="icon-lm-empirestate"></span>' + _langTerms.Woosh.Cities.NewYork + '</a></li>\n';
startingHtml += '				<li><a href="" data-id="292223"><span class="icon-lm-burjelarab"></span>' + _langTerms.Woosh.Cities.Dubai + '</a></li>\n';
startingHtml += '				<li><a href="" data-id="3451190"><span class="icon-lm-credentor"></span>' + _langTerms.Woosh.Cities.RioDeJaneiro + '</a></li>\n';
startingHtml += '				<li><a href="" data-id="1816670"><span class="icon-lm-china"></span>' + _langTerms.Woosh.Cities.Beijing + '</a></li>\n';
startingHtml += '				<li><a href="" data-id="360630"><span class="icon-lm-pyramids2"></span>' + _langTerms.Woosh.Cities.Cairo + '</a></li>\n';
startingHtml += '				<li><a href="" data-id="264371"><span class="icon-lm-athens"></span>' + _langTerms.Woosh.Cities.Athens + '</a></li>\n';
startingHtml += '				<li><a href="" data-id="524901"><span class="icon-lm-moscow"></span>' + _langTerms.Woosh.Cities.Moscow + '</a></li>\n';
startingHtml += '				<li><a href="" data-id="3169070"><span class="icon-lm-colosseum"></span>' + _langTerms.Woosh.Cities.Rome + '</a></li>\n';
startingHtml += '				<li><a href="" data-id="745044"><span class="icon-lm-hagiasophia"></span>' + _langTerms.Woosh.Cities.Istanbul + '</a></li>\n';
startingHtml += '				<li><a href="" data-id="2950159"><span class="icon-lm-brandenburg"></span>' + _langTerms.Woosh.Cities.Berlin + '</a></li>\n';
startingHtml += '			</ul>\n';
startingHtml += '		</div>\n';
startingHtml += '		<div class="forecast clearfix"></div>\n';
startingHtml += '		<div class="footer clearfix"></div>\n';
startingHtml += '	</div>';

module.exports.StartingHtml = startingHtml;