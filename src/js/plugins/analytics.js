(function () {
    'use strict';

    var analytics = {
        trackingTimeStamps: {}
    };

    analytics.detectEnvironment = function () {
        if (window.location.host === 'prodwebsiteaddress.com') {
            analytics.environment = 'prod';
        } else if (window.location.host === 'testwebsiteaddress.com') {
            analytics.environment = 'test';
        } else {
            analytics.environment = 'dev';
        }
    };

    analytics.setTimestamp = function (id) {
        analytics.trackingTimeStamps[id] = new Date().getTime();
    };

    analytics.getTimestamp = function (id) {
        return analytics.trackingTimeStamps[id];
    };

    analytics.initGoogleAnalytics = function () {
        // Project specific Analytics Keys DO NOT USE IN OTHER PROJECTS!
        var gaKeys = {
                prod: 'UA-xxxxxxxxx-x',
                test: 'UA-xxxxxxxxx-x',
                dev: 'UA-xxxxxxxxx-x'
            },
            gaKey = gaKeys[analytics.environment];

        // Disable linting for 3rd party tracking codes
        /* eslint-disable */
        /* jshint ignore:start */
        // jscs:disable

        // Google Analytics
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                                })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', gaKey, 'auto');
        ga('send', 'pageview');

        // jscs:enable
        /* jshint ignore:end */
        /* eslint-enable */
    };

    analytics.initAnalytics = function () {
        analytics.detectEnvironment();
        analytics.initGoogleAnalytics();
    };

    analytics.trackPageView = function () {
        ga('send', {
            hitType: 'pageview',
            page: window.location.pathname
        });
    };

    analytics.trackEvent = function (options) {
        if (options.category && options.action && options.label) {
            // Google Analytics
            ga('send', {
                hitType: 'event',
                eventCategory: options.category,
                eventAction: options.action,
                eventLabel: options.label
            });
        }
    };

    analytics.trackTiming = function (options) {
        if (options.category && options.variable && options.timeStamp) {
            // Google Analytics
            ga('send', {
                hitType: 'timing',
                timingCategory: options.category,
                timingVar: options.variable,
                timingLabel: options.label, // optional
                timingValue: new Date().getTime() - analytics.getTimestamp(options.timeStamp)
            });
        }
    };

    analytics.trackPage = function (options) {
        if (options.page) {
            ga('set', 'page', options.page);
            ga('send', 'pageview');
        }
    };

    analytics.trackError = function (options) {
        if (options.description && options.fatal) {
            ga('send', 'exception', {
                'exDescription': options.description,
                'exFatal': options.fatal
            });
        }
    };

    window.analytics = analytics;

    analytics.initAnalytics();
}());
