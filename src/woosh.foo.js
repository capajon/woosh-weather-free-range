'use strict';

var Q = require('q'),
	request = require('superagent'),
	auth = require('superagent-d2l-session-auth')('woosh-weather');

function getRoles() {
	return getRole(""); // empty string will return all roles.
}

function getRole( id ) {
	var	deferred = Q.defer();

	request
		.get('/d2l/api/lp/1.3/roles/' + (id || ""))
		.use(auth)
		.end(function(error, res) {
			if (error || !res.ok) {
				deferred.reject(error || res.error);
				return;
			}
			deferred.resolve(res.body);
		});

	return deferred.promise;
}

var roles = null;
function getRolesWithCaching() {

	if( roles === null || roles.isRejected() ) {
		roles = getRoles();
	}

	return roles;

}

function copyRole( sourceRoleId, roleName ) {

	var deferred = Q.defer();

	request
		.post('/d2l/api/lp/unstable/roles/')
		.query( { deepCopyRoleId: sourceRoleId } )
		.use(auth)
		.send( { RoleName: roleName } )
		.end(function(err, res) {
			if( err || !res.ok ) {
				deferred.reject(err || res.body);
				return;
			}
			deferred.resolve(res.body);
		});

	return deferred.promise;

}

module.exports.copyRole = copyRole;
module.exports.getRole = getRole;
module.exports.getRoles = getRolesWithCaching;
module.exports._getRoles = getRoles;
module.exports._reset = function() { roles = null; };
