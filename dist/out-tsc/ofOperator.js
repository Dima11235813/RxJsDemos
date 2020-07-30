"use strict";
exports.__esModule = true;
exports.OfOperatorDemo = void 0;
var rxjs_1 = require("rxjs");
var collectionsForDemos_1 = require("./shared/collectionsForDemos");
var OfOperatorDemo = (function () {
    function OfOperatorDemo(source) {
        if (source === void 0) { source = rxjs_1.of.apply(void 0, collectionsForDemos_1.arrayOfNumbers); }
        this.source = source;
        this.getSubscription = function (source) { return source
            .subscribe(function (number) { return console.log("Number: " + number + " emited from subscription"); }); };
        this.subscription = this.getSubscription(source);
    }
    return OfOperatorDemo;
}());
exports.OfOperatorDemo = OfOperatorDemo;
//# sourceMappingURL=ofOperator.js.map