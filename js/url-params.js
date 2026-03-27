/* =========================================
   URL PARAMETER PERSISTENCE (sessionStorage)
   - Stores landing page parameters across navigation
   - Automatically restores params when navigating back
   - Restores params to URL bar so analytics/CRM can read them
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

    // Restore stored params to URL bar if current URL is missing them
    // This ensures analytics tools and CRM iframe always see the params
    var storedRaw = sessionStorage.getItem(STORAGE_KEY);
    if (storedRaw && !trackingParams.toString()) {
        var restoredParams = new URLSearchParams(storedRaw);
        var newUrl = new URL(window.location.href);
        restoredParams.forEach(function (value, key) {
            if (!newUrl.searchParams.has(key)) {
                newUrl.searchParams.set(key, value);
            }
        });
        // Only update if the URL actually changed
        if (newUrl.toString() !== window.location.href) {
            window.history.replaceState(null, '', newUrl.toString());
        }
    }

    // Global helper: returns saved params string (e.g. "&sns=Linkedin&utm_source=x")
    window.getStoredParamString = function () {
        var stored = sessionStorage.getItem(STORAGE_KEY);
        return stored ? '&' + stored : '';
    };

    // Global helper: correctly append stored params to a URL, handling hash fragments
    window.appendStoredParams = function (href) {
        var stored = sessionStorage.getItem(STORAGE_KEY);
        if (!stored) return href;

        // Split href into path+query and hash parts
        var hashIndex = href.indexOf('#');
        var pathQuery = hashIndex >= 0 ? href.substring(0, hashIndex) : href;
        var hash = hashIndex >= 0 ? href.substring(hashIndex) : '';

        var separator = pathQuery.includes('?') ? '&' : '?';
        return pathQuery + separator + stored + hash;
    };
})();
