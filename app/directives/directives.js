app.directive('myInput', function() {
    return {
        restrict: "E",
        template: "<label>Symbol:<input type='text' ng-model='sym'></label>   " +
        "<md-button class='btn1' ng-click='getStockPriceByDay(sym)'>By Day</md-button class='btn1'>   " +
        "<md-button class='btn1' ng-click='getStockPriceByMonth(sym)'>By Month</md-button class='btn1'>   " +
        "<md-button class='btn1' ng-click='getStockPriceByYear(sym)'>By Year</md-button class='btn1'>   "
    };
});