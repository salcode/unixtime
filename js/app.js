(function() {
	var pause = false;

	function getUnixTime( dateObj ) {
		return Math.round(dateObj.getTime() / 1000);
	}

	/**
	 * If the timestamp is in milliseconds, convert to seconds.
	 * (It the timestamp is already in seconds, return it unmodified).
	 */
	function convertToSeconds( timestamp ) {
		var currentTimeInMs = new Date().getTime();
		if ( timestamp * 100 > currentTimeInMs ) {
			// Assuming the timestamp provided were in seconds, multiplying
			// it by 1000 should put it in the same neighborhood as the
			// currentTimeInMS. Instead we are multiplying by only 100,
			// so that result should still be less than the currentTimeInMS
			// by approximately a factor of time.
			//
			// If the timestamp * 100 is greater than currentTimeInMS,
			// we are assuming timestamp is in fact in ms (not seconds),
			// so we divide it by 1000 to get seconds.
			return timestamp / 1000;
		}
		// It looks like the given timestamp is already in seconds,
		// return it unchanged.
		return timestamp;
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
			var dateObj = new Date( convertToSeconds( userInputTimestamp ) * 1000);
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
