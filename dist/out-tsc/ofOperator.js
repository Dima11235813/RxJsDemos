"use strict";
exports.__esModule = true;
exports.OfOperatorDemo = void 0;
var rxjs_1 = require("rxjs");
var collectionsForDemos_1 = require("./shared/collectionsForDemos");
var OfOperatorDemo = (function () {
    function OfOperatorDemo(source) {
        var _this = this;
        if (source === void 0) { source = collectionsForDemos_1.arrayOfNumbers; }
        this.source = source;
        this.handleSubClosed = function () {
            console.log("Clearing interval");
            clearInterval(_this.checkClosedSubscriptionInterval);
        };
        this.handleSubStillOpen = function () {
            console.log("Subscription is not yet closed.");
        };
        this.getSubscription = function (source) {
            return source.subscribe(_this.handleEmittedValue);
        };
        this.incrementingTime = 1000;
        this.intervalOfTimeToAdd = 1000;
        this.handleEmittedValue = function (number) {
            setTimeout(function () {
                console.log("Status of subscription is " + _this._subscription.closed);
                var indexOfNumber = _this.source.indexOf(number);
                console.log("Number: " + number + " at index: " + indexOfNumber + ", emited from subscription");
            }, _this.incrementingTime += _this.intervalOfTimeToAdd);
        };
        this._sourceForSubscription = rxjs_1.of.apply(void 0, source);
        this.checkClosedSubscriptionInterval = setInterval(function () {
            console.log("Subscription closed status: " + _this._subscription.closed);
            _this._subscription.closed ?
                _this.handleSubClosed() :
                _this.handleSubStillOpen();
        }, (this.intervalOfTimeToAdd * this.source.length) / 2);
        this._subscription = this.getSubscription(this._sourceForSubscription);
    }
    return OfOperatorDemo;
}());
exports.OfOperatorDemo = OfOperatorDemo;
//# sourceMappingURL=ofOperator.js.map