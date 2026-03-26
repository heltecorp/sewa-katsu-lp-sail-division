/* =========================================
   URL PARAMETER PERSISTENCE (sessionStorage)
   - Stores landing page parameters across navigation
   - Automatically restores params when navigating back
   ========================================= */
(function () {
    var STORAGE_KEY = 'sewa_landing_params';
    var TRACKING_KEYS = ['sns', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid', 'ref'];

    // Extract tracking params from current URL
    var currentParams = new URLSearchParams(window.location.search);
    var trackingParams = new URLSearchParams();
    TRACKING_KEYS.forEach(function (key) {
        if (currentParams.has(key)) {
            trackingParams.set(key, currentParams.get(key));
        }
    });

    // If current URL has tracking params, merge with stored ones (URL takes priority)
    if (trackingParams.toString()) {
        var stored = new URLSearchParams(sessionStorage.getItem(STORAGE_KEY) || '');
        trackingParams.forEach(function (value, key) {
            stored.set(key, value);
        });
        sessionStorage.setItem(STORAGE_KEY, stored.toString());
    }

    // Global helper: returns saved params string (e.g. "&sns=Linkedin&utm_source=x")
    window.getStoredParamString = function () {
        var stored = sessionStorage.getItem(STORAGE_KEY);
        return stored ? '&' + stored : '';
    };
})();
