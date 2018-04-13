app.factory('stockData', function() {
    return {
        logo : "https://theriponadvance.com/wp-content/uploads/2016/12/stocks-1.jpg",
        companyInfo: {
            symbol: "AAPL",
            companyName: "Apple Inc.",
            exchange: "Nasdaq Global Select",
            industry: "Computer Hardware",
            website: "http://www.apple.com",
            description: "Apple Inc is an American multinational technology company. It designs, manufactures, and markets mobile communication and media devices, personal computers, and portable digital music players.",
            CEO: "Timothy D. Cook",
            issueType: "cs",
            sector: "Technology"
        },
        priceListByYear: [{
            date: "2018-03-12",
            open: 180.29,
            close: 181.72,
        }],
        priceListByMonth: [{
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
        }],
        priceListByDay: [{
            date: "20180412",
            minute: "09:40",
            label: "09:40 AM",
            high: 173.61,
            low: 173.5,
            average: 173.541,
            volume: 1285,
            notional: 223000.21,
            numberOfTrades: 14,
            marketHigh: 173.61,
            marketLow: 173.48,
            marketAverage: 173.536,
            marketVolume: 71384,
            marketNotional: 12387683.0488,
            marketNumberOfTrades: 540,
            changeOverTime: 0.0013906520484707758,
            marketChangeOverTime: 0.0008535769488084304
        }]
    }
});

app.factory('stockPriceByYear', function($http) {
    return {
        searchStock: function(symbol) {
            console.log('search stock: ' + symbol);
            return $http.get("https://ws-api.iextrading.com/1.0/stock/" + symbol + "/chart/1y")
                .then(function(response) {
                        return response;
                    },
                    //error handler
                    function(response) {
                        return response;
                    });
        }
    }
});
app.factory('stockPriceByMonth', function($http) {
    return {
        searchStock: function(symbol) {
            console.log('search stock: ' + symbol);
            return $http.get("https://ws-api.iextrading.com/1.0/stock/" + symbol + "/chart")
                .then(function(response) {
                        return response;
                    },
                    //error handler
                    function(response) {
                        return response;
                    });
        }
    }
});

app.factory('stockPriceByDay', function($http) {
    return {
        searchStock: function(symbol) {
            console.log('search stock: ' + symbol);
            return $http.get("https://ws-api.iextrading.com/1.0/stock/" + symbol + "/chart/1d")
                .then(function(response) {
                        return response;
                    },
                    //error handler
                    function(response) {
                        return response;
                    });

        }
    }
});

app.factory('stockLogo', function($http) {
    return {
        getLogo: function(symbol) {
            console.log('get logo: ' + symbol);
            return $http.get("https://ws-api.iextrading.com/1.0/stock/" + symbol + "/logo")
                .then(function(response) {
                        return response;
                    },
                    //error handler
                    function(response) {
                        return response;
                    });
        }
    }
});

app.factory('companyInfo', function($http) {
    return {
        getInfo: function(symbol) {
            console.log('get Info: ' + symbol);
            return $http.get("https://ws-api.iextrading.com/1.0/stock/" + symbol + "/company")
                .then(function(response) {
                        return response;
                    },
                    //error handler
                    function(response) {
                        return response;
                    });
        }
    }
});