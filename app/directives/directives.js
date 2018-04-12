app.directive('myInput2', function() {
    return {
        restrict: "E",
        template: "<label>Symbol:<input type='text' ng-model='sym'></label><button ng-click='getStockPriceByDate(sym)'>GO</button>"
    };
});