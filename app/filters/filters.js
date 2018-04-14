app.filter('removeAllSpaces', function() {
	return function(str) {
		return str.replace(/\s/g, '');
	};
});
app.filter('toExchange', function () {
	return function (str) {
		switch (str) {
			case "New York Stock Exchange":
				return "NYSE";
			case "Nasdaq Global Select":
				return "NASDAQ";
			default:
				return "";
		}
    }
});

app.filter("to2Decimal", function () {
	return function (str) {
		return  str == null ? "" : str.toFixed(2);

    }

});