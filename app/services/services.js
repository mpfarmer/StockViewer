app.factory('stockData', function() {
    return {
        priceList: [{
            date: "2018-03-12",
            open: 180.29,
            high: 182.39,
            low: 180.21,
            close: 181.72,
            volume: 32207081,
            unadjustedVolume: 32207081,
            change: 1.74,
            changePercent: 0.967,
            vwap: 181.657,
            label: "Mar 12",
            changeOverTime: 0
        }]
    }
});

app.factory('stockPriceByDate', function($http) {
    return {
        searchStock: function(symbol) {
            console.log('search stock: ' + symbol);
            return $http.get("https://ws-api.iextrading.com/1.0/stock/" + symbol + "/chart")
                .then(function(response) {
                        return response;
                    },
                    //error handler
                    function(response) {
                        console.log('error response: ' + response);
                        return response;
                    });

        }
    }
});