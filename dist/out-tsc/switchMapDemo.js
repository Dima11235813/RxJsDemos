"use strict";
exports.__esModule = true;
exports.SwitchMapRxJsDemo = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var SwitchMapRxJsDemo = (function () {
    function SwitchMapRxJsDemo(arrayOfNumbers) {
        var _this = this;
        if (arrayOfNumbers === void 0) { arrayOfNumbers = [1, 2, 3]; }
        this.arrayOfNumbers = arrayOfNumbers;
        this.ofOperatorResult = function (numberCollection) {
            return rxjs_1.of.apply(void 0, numberCollection);
        };
        this.switchMapHandler = function (x, index) {
            var one = x;
            var two = Math.pow(x, 2);
            var three = Math.pow(x, 3);
            console.log("Switch Map Handler Index: " + index + " number: " + x);
            return _this.getOfHandler([one, two, three]);
        };
        this.getOfHandler = function (collection) {
            return rxjs_1.of.apply(void 0, collection);
        };
        this.switchLogicHandler = operators_1.switchMap(this.switchMapHandler);
        this.handlePushFromSubscription = function (number) { return console.log("Of Operator Result number value of " + number); };
        var subject = this.ofOperatorResult(arrayOfNumbers);
        subject.pipe(this.switchLogicHandler);
        subject.subscribe(this.handlePushFromSubscription);
    }
    return SwitchMapRxJsDemo;
}());
exports.SwitchMapRxJsDemo = SwitchMapRxJsDemo;
//# sourceMappingURL=switchMapDemo.js.map