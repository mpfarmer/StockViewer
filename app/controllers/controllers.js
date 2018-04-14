var MySecondController = function ($scope, $http, stockData, companyInfo, stockPriceByYear, stockPriceByMonth, stockPriceByDay,stockLogo) {
    $scope.stock = stockData;
    var symb;
    var applyData = function(timeRiskInd, dataRiskInd, timeInd, riskInd) {
            timeRiskInd.push(timeInd);
            dataRiskInd.push(riskInd);
    };
    $scope.myChart;
    $scope.draw = function(results, interval) {
        $scope.myChart != null ? $scope.myChart.destroy() : console.log("No Chart yet");
        var timeRiskInd = new Array();
        var dataRiskInd = new Array();
        let length=0, i=0;
        switch (interval) {
            case '1d':
                length =  results.priceListByDay.length;
                for (;i < length;i++) {
                    if (results.priceListByDay[i].average > 0) {
                        applyData(timeRiskInd, dataRiskInd, results.priceListByDay[i].label, results.priceListByDay[i].average);
                    }
                }
                break;
            case '':
                length = results.priceListByMonth.length;
                for (;i < length;i++)  {
                    applyData(timeRiskInd, dataRiskInd, results.priceListByMonth[i].date, results.priceListByMonth[i].close);
                }
                break;
            case '1y':
                length = results.priceListByYear.length;
                for (;i < length;i++)  {
                    applyData(timeRiskInd, dataRiskInd, results.priceListByYear[i].date, results.priceListByYear[i].close);
                }
                break;
        }
        // 用于存放图表上的数据
        var data = {

            // 表的X轴参数
            labels : timeRiskInd,
            datasets : [
                {
                    // 背景色，常用transparent透明
                    fillColor :       "rgba(151,187,205,0.5)",
                    // 线条颜色，也可用"#ffffff"
                    strokeColor : "rgba(151,187,205,1)",
                    // 点的填充颜色
                    pointColor : "rgba(151,187,205,1)",
                    // 点的外边框颜色
                    pointStrokeColor : "#fff",
                    // 表的Y轴值
                    data : dataRiskInd
                }
            ]
        };

        // 定义图表的参数
        var defaultsParam = {
            // Y轴的起始值
            scaleStartValue :null,
            // Y/X轴的颜色
            scaleLineColor : "rgba(0,0,0,.1)",
            // X,Y轴的宽度
            scaleLineWidth : 1,
            // 刻度是否显示标签, 即Y轴上是否显示文字
            scaleShowLabels : true,
            // Y轴上的刻度,即文字
            scaleLabel : "<%=value%>",
            // 字体
            scaleFontFamily : "'Arial'",
            // 文字大小
            scaleFontSize : 20,
            // 文字样式
            scaleFontStyle : "normal",
            // 文字颜色
            scaleFontColor : "#666",
            // 是否显示网格
            scaleShowGridLines : true,
            // 网格颜色
            scaleGridLineColor : "rgba(0,0,0,.05)",
            // 网格宽度
            scaleGridLineWidth : 2,
            // 是否使用贝塞尔曲线? 即:线条是否弯曲
            bezierCurve : false,
            // 是否显示点数
            pointDot : true,
            // 圆点的大小
            pointDotRadius : 8,
            // 圆点的笔触宽度, 即:圆点外层边框大小
            pointDotStrokeWidth : 1,
            // 数据集行程
            datasetStroke : true,
            // 线条的宽度, 即:数据集
            datasetStrokeWidth : 2,
            // 是否填充数据集
            datasetFill : false,
            // 是否执行动画
            animation : true,
            // 动画的时间
            animationSteps : 60,
            // 动画的特效
            animationEasing : "easeOutQuart",
            // 动画完成时的执行函数
            onAnimationComplete : null
        }
        var ctx =
            document.getElementById("myChart").getContext("2d");
        $scope.myChart = new Chart(ctx).Line(data, {showXLabels: 10
        });
    };

    var onPreSearchPrice = function(symbol) {
        console.log("symbol: " + symbol);
        symb = symbol;
        stockPriceByMonth.searchStock(symbol).then(onSearchMonthComplete, onError);
        stockPriceByDay.searchStock(symbol).then(onSearchDayComplete, onError);
        stockLogo.getLogo(symbol).then(onLogoComplete, onError);
        companyInfo.getInfo(symbol).then(onLookupComplete, onError);
    };
    $scope.getStockPriceByYear = function(symbol) {
        onPreSearchPrice(symbol);
        stockPriceByYear.searchStock(symbol).then(onSearchYearComplete, onError);
    };
    $scope.getStockPriceByMonth = function(symbol) {
        onPreSearchPrice(symbol);
        stockPriceByMonth.searchStock(symbol).then(onPostMonthComplete, onError);
    };
    $scope.getStockPriceByDay = function(symbol) {
        onPreSearchPrice(symbol);
        stockPriceByDay.searchStock(symbol).then(onPostDayComplete, onError);

    };

    var onLookupComplete = function (response) {
        $scope.stock.companyInfo = response.data;
        $scope.statusCompany = response.status;
        $scope.symbol = symb;
    };
    var onSearchYearComplete = function(response) {
        // $scope.stock.priceListByYear = response.data;
        //Shrink data
        var length = response.data.length;
        console.log("original year size: " + length);
        var yearList = [];
        for (var i = 0; i < length; i++ ) {
            if (i == 0 || i == length -1 || (i + 1) % 5 == 0) {
                yearList.push(response.data[i]);
            }
        }
        $scope.stock.priceListByYear = yearList;
        console.log("year size: " + yearList.length);
        $scope.statusPrices = response.status;
        $scope.draw($scope.stock, '1y');
    };
    var onSearchMonthComplete = function(response) {
        $scope.stock.priceListByMonth = response.data;
        $scope.statusPrices = response.status;
    };
    var onPostMonthComplete = function(response) {
        $scope.stock.priceListByMonth = response.data;
        $scope.statusPrices = response.status;
        $scope.draw($scope.stock, '');
    };
    var onPostDayComplete = function(response) {
        $scope.stock.priceListByDay = response.data;
        $scope.statusPrices = response.status;
        $scope.draw($scope.stock, '1d');
    };
    var onSearchDayComplete = function(response) {
        $scope.stock.priceListByDay = response.data;
        $scope.statusPrices = response.status;
        onInitPriceChangeComplete();
    };

    var onLogoComplete = function(response) {
        $scope.stock.logo = response.data.url;
        console.log("Logo" + response.data.url);
        $scope.statusLogo = response.status;
    }
    var onError = function(reason) {
        console.log('onError response: ' + reason);
        $scope.error = "Oops, something is wrong..";
    };
    var onInitPriceChangeComplete = function () {
        var dayLength = $scope.stock.priceListByDay.length;
        var monthLength = $scope.stock.priceListByMonth.length;
        var start = $scope.stock.priceListByMonth[monthLength - 1].close, end = $scope.stock.priceListByDay[dayLength - 1].average;
        console.log("Previous Close: " + start, "Current Average: " + end);
        if (dayLength > 0) {
            var iStart = dayLength - 1;
            while (iStart>=0 && $scope.stock.priceListByDay[iStart].average <=0) {
                iStart--;
            }
            if (iStart < 0) {
                end = $scope.stock.priceListByMonth[monthLength - 1].close
            } else {
                end = $scope.stock.priceListByDay[iStart].average;
            }
            console.log("start: " + start + " end: " + end);
        }
        var currentDate = new Date();
        var currentDateString = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' +  currentDate.getFullYear();
        if (currentDateString >=  $scope.stock.priceListByMonth[monthLength - 1].date) {
            //when month data updated today's summary;
            start =  $scope.stock.priceListByMonth[monthLength - 2].close;
            end =  $scope.stock.priceListByMonth[monthLength - 1].close;
        }
        var change = Math.round((end - start) * 100) / 100;
        var changePercent = (Math.round((change/start) * 10000) /100);
        $scope.stock.currentPrice = end;
        $scope.stock.indicatorUrl = ((end - start) > 0) ? "http://i.cdn.turner.com/money/.element/img/3.0/data/arrowUp.gif"
            : "http://i.cdn.turner.com/money/.element/img/3.0/data/arrowDown.gif";
        $scope.stock.priceChange = (end - start) > 0 ? "+ " + change : change;
        $scope.stock.priceChangePercentLabel =" | " + ((end - start) > 0 ?  "+ " + changePercent + "%" : changePercent + "%");
    };

};
app.controller("MySecondController", MySecondController);