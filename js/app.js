(function() {
	var pause = false;

	function getUnixTime( dateObj ) {
		return Math.round(dateObj.getTime() / 1000);
	}

	function updateCurrentTimeValues() {
		var dateObj = new Date();
		if ( ! pause ) {
			document.getElementById('current-unix-time').value  = getUnixTime(dateObj);
			document.getElementById('current-utc-time').value   = dateObj.toUTCString();
			document.getElementById('current-local-time').value = dateObj.toLocaleString();
		}
		setTimeout( updateCurrentTimeValues, 500 );
	}

	// Start updating current time values.
	updateCurrentTimeValues();
	// Pause update when Unix Time element is in focus.
	var currentUnixTime = document.getElementById('current-unix-time');
	currentUnixTime.addEventListener(
		'focus', function(e) { pause = true;  }, true
	);
	currentUnixTime.addEventListener(
		'blur',  function(e) { pause = false; }, true
	);

	// User entered Unix Time stamp.
	document.getElementById('submit-user-unix-time').addEventListener(
		'click',
		function(e) {
			var userInputTimestamp = document.getElementById('user-unix-time').value;
			var dateObj = new Date( userInputTimestamp * 1000);
			document.getElementById('user-utc-time').value   = dateObj.toUTCString();
			document.getElementById('user-local-time').value = dateObj.toLocaleString();
			e.preventDefault();
			e.stopPropagation();
		},
		false
	);

	// User entered time string.
	document.getElementById('submit-string-time').addEventListener(
		'click',
		function(e) {
			var dateObj = new Date(document.getElementById('string-time').value);
			document.getElementById('string-unix-time').value = getUnixTime(dateObj);
			e.preventDefault();
			e.stopPropagation();
		},
		false
	);

	const timestamp = new URLSearchParams(
		document.location.search.substring(1)
	).get('time');
	if (timestamp) {
		document.getElementById('user-unix-time').value = timestamp;
		document.getElementById('submit-user-unix-time').click();
	}
})();
