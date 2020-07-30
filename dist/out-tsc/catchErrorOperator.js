"use strict";
exports.__esModule = true;
exports.CatchErrorOperatorDemo = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var collectionsForDemos_1 = require("./shared/collectionsForDemos");
var CatchErrorOperatorDemo = (function () {
    function CatchErrorOperatorDemo(source) {
        var _this = this;
        if (source === void 0) { source = collectionsForDemos_1.arrayOfNumbers; }
        this.source = source;
        this.handleEmittedValue = function (number) {
            setTimeout(function () {
                var indexOfNumber = _this.source.indexOf(number);
                console.log("Number: " + number + " at index: " + indexOfNumber + ", emited from subscription");
            }, 1000);
        };
        this._sourceForSubscription = rxjs_1.of.apply(void 0, source);
        this._sourceForSubscription.pipe(operators_1.map(function (n) {
            if (n === 4) {
                throw 'four!';
            }
            return n;
        }), operators_1.catchError(function (err) { return rxjs_1.of('I', 'II', 'III', 'IV', 'V'); }))
            .subscribe(function (x) { return console.log(x); });
    }
    return CatchErrorOperatorDemo;
}());
exports.CatchErrorOperatorDemo = CatchErrorOperatorDemo;
//# sourceMappingURL=catchErrorOperator.js.map