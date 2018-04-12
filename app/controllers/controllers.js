var MySecondController = function ($scope, $http, stockData,stockPriceByDate) {
    $scope.stock = stockData.priceList;
    var symb;
    $scope.getStockPriceByDate = function(symbol) {
        console.log("symbol: " + symbol);
        symb = symbol;
        stockPriceByDate.searchStock(symbol).then(onLookupComplete, onError);
    };
    var onLookupComplete = function(response) {
        $scope.stock = response.data;
        $scope.status2 = response.status2;
        $scope.symbol = symb;
    };
    var onError = function(reason) {
        console.log('onError response: ' + reason);
        $scope.error2 = "Oops, something is wrong..";
    };
};
app.controller("MySecondController", MySecondController);