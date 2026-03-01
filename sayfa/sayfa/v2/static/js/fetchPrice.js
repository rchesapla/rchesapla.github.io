fetchData = function(){

    fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network%2Cwormhole%2Clitecoin%2Ctron%2Cbitcoin%2Cethereum%2Cdogecoin%2Cbinancecoin%2Ctether%2Cflow%2Csolana&vs_currencies=usd', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
          }
    
          // Examine the text in the response
          response.json().then(function(data) {
            prices = getResults(data)
            postResults(prices)
            calculate(prices)
    
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
      
  }

getResults = function(fetch_data){
    btcPrice = fetch_data.bitcoin.usd
    dogePrice = fetch_data.dogecoin.usd
    ethPrice = fetch_data.ethereum.usd
	bnbPrice = fetch_data.binancecoin.usd
	maticPrice = fetch_data.wormhole.usd
	ltcPrice = fetch_data.litecoin.usd
	solPrice = fetch_data.solana.usd
	trxPrice = fetch_data.tron.usd
    return [btcPrice, dogePrice, ethPrice, bnbPrice, maticPrice, ltcPrice, solPrice, trxPrice]
}

postResults = function(prices){
    document.getElementById("btc-price-api").innerHTML = "$" + prices[0];
    document.getElementById("doge-price-api").innerHTML = "$" + prices[1];
    document.getElementById("eth-price-api").innerHTML = "$" + prices[2];
	document.getElementById("bnb-price-api").innerHTML = "$" + prices[3];
	document.getElementById("matic-price-api").innerHTML = "$" + prices[4];
	document.getElementById("ltc-price-api").innerHTML = "$" + prices[5];
	document.getElementById("sol-price-api").innerHTML = "$" + prices[6];
	document.getElementById("trx-price-api").innerHTML = "$" + prices[7];
}

//////////////////////////////
calculate = function(prices){
    var btcPrice = prices[0]
        dogePrice = prices[1]
        ethPrice = prices[2]
		bnbPrice = prices[3]
		maticPrice = prices[4]
		ltcPrice = prices[5]
		solPrice = prices[6]
		trxPrice = prices[7]
		
    /////////////////////////////////////////////////
    // BTC CALC 10 MIN
    minBtc = document.getElementById("minBtc").innerHTML;
    minBtcD = Number(minBtc) * btcPrice
    if (isNaN(minBtcD)) {
        document.getElementById("minBtcD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("minBtcD").innerText = "$" + minBtcD.toFixed(5);
        }
    // BTC CALC HOUR
    hourBtc = document.getElementById("hourBtc").innerHTML;
    hourBtcD = Number(hourBtc) * btcPrice
    if (isNaN(hourBtcD)) {
        document.getElementById("hourBtcD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("hourBtcD").innerText = "$" + hourBtcD.toFixed(5);
        }
    // BTC CALC DAY
    dayBtc = document.getElementById("dayBtc").innerHTML;
    dayBtcD = Number(dayBtc) * btcPrice
    if (isNaN(dayBtcD)) {
        document.getElementById("dayBtcD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("dayBtcD").innerText = "$" + dayBtcD.toFixed(5);
        }
    // BTC CALC WEEK
    weekBtc = document.getElementById("weekBtc").innerHTML;
    weekBtcD = Number(weekBtc) * btcPrice
    if (isNaN(weekBtcD)) {
        document.getElementById("weekBtcD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("weekBtcD").innerText = "$" + weekBtcD.toFixed(5);
        }    
    // BTC CALC MONTH
    monthBtc = document.getElementById("monthBtc").innerHTML;
    monthBtcD = Number(monthBtc) * btcPrice
    if (isNaN(minBtcD)) {
        document.getElementById("monthBtcD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("monthBtcD").innerText = "$" + monthBtcD.toFixed(5);
        }    
    // BTC CALC YEAR
    yearBtc = document.getElementById("yearBtc").innerHTML;
    yearBtcD = Number(yearBtc) * btcPrice
    if (isNaN(yearBtcD)) {
        document.getElementById("yearBtcD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("yearBtcD").innerText = "$" + yearBtcD.toFixed(5);
        }
    /////////////////////////////////////////////////
    // DOGE CALC 10 MIN
    minDoge = document.getElementById("minDoge").innerHTML;
    minDogeD = Number(minDoge) * dogePrice
    if (isNaN(minDogeD)) {
        document.getElementById("minDogeD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("minDogeD").innerText = "$" + minDogeD.toFixed(5);
        }
    // DOGE CALC HOUR
    hourDoge = document.getElementById("hourDoge").innerHTML;
    hourDogeD = Number(hourDoge) * dogePrice
    if (isNaN(hourDogeD)) {
        document.getElementById("hourDogeD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("hourDogeD").innerText = "$" + hourDogeD.toFixed(5);
        }
    // DOGE CALC DAY
    dayDoge = document.getElementById("dayDoge").innerHTML;
    dayDogeD = Number(dayDoge) * dogePrice
    if (isNaN(dayDogeD)) {
        document.getElementById("dayDogeD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("dayDogeD").innerText = "$" + dayDogeD.toFixed(5);
        }
    // DOGE CALC WEEK
    weekDoge = document.getElementById("weekDoge").innerHTML;
    weekDogeD = Number(weekDoge) * dogePrice
    if (isNaN(weekDogeD)) {
        document.getElementById("weekDogeD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("weekDogeD").innerText = "$" + weekDogeD.toFixed(5);
        }    
    // DOGE CALC MONTH
    monthDoge = document.getElementById("monthDoge").innerHTML;
    monthDogeD = Number(monthDoge) * dogePrice
    if (isNaN(minDogeD)) {
        document.getElementById("monthDogeD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("monthDogeD").innerText = "$" + monthDogeD.toFixed(5);
        }    
    // DOGE CALC YEAR
    yearDoge = document.getElementById("yearDoge").innerHTML;
    yearDogeD = Number(yearDoge) * dogePrice
    if (isNaN(yearDogeD)) {
        document.getElementById("yearDogeD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("yearDogeD").innerText = "$" + yearDogeD.toFixed(5);
        }
	/////////////////////////////////////////////////
    // ETH CALC 10 MIN
    minEth = document.getElementById("minEth").innerHTML;
    minEthD = Number(minEth) * ethPrice
    if (isNaN(minEthD)) {
        document.getElementById("minEthD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("minEthD").innerText = "$" + minEthD.toFixed(5);
        }
    // ETH CALC HOUR
    hourEth = document.getElementById("hourEth").innerHTML;
    hourEthD = Number(hourEth) * ethPrice
    if (isNaN(hourEthD)) {
        document.getElementById("hourEthD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("hourEthD").innerText = "$" + hourEthD.toFixed(5);
        }
    // ETH CALC DAY
    dayEth = document.getElementById("dayEth").innerHTML;
    dayEthD = Number(dayEth) * ethPrice
    if (isNaN(dayEthD)) {
        document.getElementById("dayEthD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("dayEthD").innerText = "$" + dayEthD.toFixed(5);
        }
    // ETH CALC WEEK
    weekEth = document.getElementById("weekEth").innerHTML;
    weekEthD = Number(weekEth) * ethPrice
    if (isNaN(weekEthD)) {
        document.getElementById("weekEthD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("weekEthD").innerText = "$" + weekEthD.toFixed(5);
        }    
    // ETH CALC MONTH
    monthEth = document.getElementById("monthEth").innerHTML;
    monthEthD = Number(monthEth) * ethPrice
    if (isNaN(minEthD)) {
        document.getElementById("monthEthD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("monthEthD").innerText = "$" + monthEthD.toFixed(5);
        }    
    // ETH CALC YEAR
    yearEth = document.getElementById("yearEth").innerHTML;
    yearEthD = Number(yearEth) * ethPrice
    if (isNaN(yearEthD)) {
        document.getElementById("yearEthD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("yearEthD").innerText = "$" + yearEthD.toFixed(5);
        }
		
    /////////////////////////////////////////////////
    // bnb CALC 10 MIN
    minbnb = document.getElementById("minbnb").innerHTML;
    minbnbD = Number(minbnb) * bnbPrice
    if (isNaN(minbnbD)) {
        document.getElementById("minbnbD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("minbnbD").innerText = "$" + minbnbD.toFixed(5);
        }
    // bnb CALC HOUR
    hourbnb = document.getElementById("hourbnb").innerHTML;
    hourbnbD = Number(hourbnb) * bnbPrice
    if (isNaN(hourbnbD)) {
        document.getElementById("hourbnbD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("hourbnbD").innerText = "$" + hourbnbD.toFixed(5);
        }
    // bnb CALC DAY
    daybnb = document.getElementById("daybnb").innerHTML;
    daybnbD = Number(daybnb) * bnbPrice
    if (isNaN(daybnbD)) {
        document.getElementById("daybnbD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("daybnbD").innerText = "$" + daybnbD.toFixed(5);
        }
    // bnb CALC WEEK
    weekbnb = document.getElementById("weekbnb").innerHTML;
    weekbnbD = Number(weekbnb) * bnbPrice
    if (isNaN(weekbnbD)) {
        document.getElementById("weekbnbD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("weekbnbD").innerText = "$" + weekbnbD.toFixed(5);
        }    
    // bnb CALC MONTH
    monthbnb = document.getElementById("monthbnb").innerHTML;
    monthbnbD = Number(monthbnb) * bnbPrice
    if (isNaN(minbnbD)) {
        document.getElementById("monthbnbD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("monthbnbD").innerText = "$" + monthbnbD.toFixed(5);
        }    
    // bnb CALC YEAR
    yearbnb = document.getElementById("yearbnb").innerHTML;
    yearbnbD = Number(yearbnb) * bnbPrice
    if (isNaN(yearbnbD)) {
        document.getElementById("yearbnbD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("yearbnbD").innerText = "$" + yearbnbD.toFixed(5);
        }
	/////////////////////////////////////////////////
    // matic CALC 10 MIN
    minmatic = document.getElementById("minmatic").innerHTML;
    minmaticD = Number(minmatic) * maticPrice
    if (isNaN(minmaticD)) {
        document.getElementById("minmaticD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("minmaticD").innerText = "$" + minmaticD.toFixed(5);
        }
    // matic CALC HOUR
    hourmatic = document.getElementById("hourmatic").innerHTML;
    hourmaticD = Number(hourmatic) * maticPrice
    if (isNaN(hourmaticD)) {
        document.getElementById("hourmaticD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("hourmaticD").innerText = "$" + hourmaticD.toFixed(5);
        }
    // matic CALC DAY
    daymatic = document.getElementById("daymatic").innerHTML;
    daymaticD = Number(daymatic) * maticPrice
    if (isNaN(daymaticD)) {
        document.getElementById("daymaticD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("daymaticD").innerText = "$" + daymaticD.toFixed(5);
        }
    // matic CALC WEEK
    weekmatic = document.getElementById("weekmatic").innerHTML;
    weekmaticD = Number(weekmatic) * maticPrice
    if (isNaN(weekmaticD)) {
        document.getElementById("weekmaticD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("weekmaticD").innerText = "$" + weekmaticD.toFixed(5);
        }    
    // matic CALC MONTH
    monthmatic = document.getElementById("monthmatic").innerHTML;
    monthmaticD = Number(monthmatic) * maticPrice
    if (isNaN(minmaticD)) {
        document.getElementById("monthmaticD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("monthmaticD").innerText = "$" + monthmaticD.toFixed(5);
        }    
    // matic CALC YEAR
    yearmatic = document.getElementById("yearmatic").innerHTML;
    yearmaticD = Number(yearmatic) * maticPrice
    if (isNaN(yearmaticD)) {
        document.getElementById("yearmaticD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("yearmaticD").innerText = "$" + yearmaticD.toFixed(5);
        }
    /////////////////////////////////////////////////
    // ltc CALC 10 MIN
    minltc = document.getElementById("minltc").innerHTML;
    minltcD = Number(minltc) * ltcPrice
    if (isNaN(minltcD)) {
        document.getElementById("minltcD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("minltcD").innerText = "$" + minltcD.toFixed(5);
        }
    // ltc CALC HOUR
    hourltc = document.getElementById("hourltc").innerHTML;
    hourltcD = Number(hourltc) * ltcPrice
    if (isNaN(hourltcD)) {
        document.getElementById("hourltcD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("hourltcD").innerText = "$" + hourltcD.toFixed(5);
        }
    // ltc CALC DAY
    dayltc = document.getElementById("dayltc").innerHTML;
    dayltcD = Number(dayltc) * ltcPrice
    if (isNaN(dayltcD)) {
        document.getElementById("dayltcD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("dayltcD").innerText = "$" + dayltcD.toFixed(5);
        }
    // ltc CALC WEEK
    weekltc = document.getElementById("weekltc").innerHTML;
    weekltcD = Number(weekltc) * ltcPrice
    if (isNaN(weekltcD)) {
        document.getElementById("weekltcD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("weekltcD").innerText = "$" + weekltcD.toFixed(5);
        }    
    // ltc CALC MONTH
    monthltc = document.getElementById("monthltc").innerHTML;
    monthltcD = Number(monthltc) * ltcPrice
    if (isNaN(minltcD)) {
        document.getElementById("monthltcD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("monthltcD").innerText = "$" + monthltcD.toFixed(5);
        }    
    // ltc CALC YEAR
    yearltc = document.getElementById("yearltc").innerHTML;
    yearltcD = Number(yearltc) * ltcPrice
    if (isNaN(yearltcD)) {
        document.getElementById("yearltcD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("yearltcD").innerText = "$" + yearltcD.toFixed(5);
        }
	/////////////////////////////////////////////////
    // sol CALC 10 MIN
    minsol = document.getElementById("minsol").innerHTML;
    minsolD = Number(minsol) * solPrice
    if (isNaN(minsolD)) {
        document.getElementById("minsolD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("minsolD").innerText = "$" + minsolD.toFixed(5);
        }
    // sol CALC HOUR
    hoursol = document.getElementById("hoursol").innerHTML;
    hoursolD = Number(hoursol) * solPrice
    if (isNaN(hoursolD)) {
        document.getElementById("hoursolD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("hoursolD").innerText = "$" + hoursolD.toFixed(5);
        }
    // sol CALC DAY
    daysol = document.getElementById("daysol").innerHTML;
    daysolD = Number(daysol) * solPrice
    if (isNaN(daysolD)) {
        document.getElementById("daysolD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("daysolD").innerText = "$" + daysolD.toFixed(5);
        }
    // sol CALC WEEK
    weeksol = document.getElementById("weeksol").innerHTML;
    weeksolD = Number(weeksol) * solPrice
    if (isNaN(weeksolD)) {
        document.getElementById("weeksolD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("weeksolD").innerText = "$" + weeksolD.toFixed(5);
        }    
    // sol CALC MONTH
    monthsol = document.getElementById("monthsol").innerHTML;
    monthsolD = Number(monthsol) * solPrice
    if (isNaN(minsolD)) {
        document.getElementById("monthsolD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("monthsolD").innerText = "$" + monthsolD.toFixed(5);
        }    
    // sol CALC YEAR
    yearsol = document.getElementById("yearsol").innerHTML;
    yearsolD = Number(yearsol) * solPrice
    if (isNaN(yearsolD)) {
        document.getElementById("yearsolD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("yearsolD").innerText = "$" + yearsolD.toFixed(5);
        }
	/////////////////////////////////////////////////
    // trx CALC 10 MIN
    mintrx = document.getElementById("mintrx").innerHTML;
    mintrxD = Number(mintrx) * trxPrice
    if (isNaN(mintrxD)) {
        document.getElementById("mintrxD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("mintrxD").innerText = "$" + mintrxD.toFixed(5);
        }
    // trx CALC HOUR
    hourtrx = document.getElementById("hourtrx").innerHTML;
    hourtrxD = Number(hourtrx) * trxPrice
    if (isNaN(hourtrxD)) {
        document.getElementById("hourtrxD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("hourtrxD").innerText = "$" + hourtrxD.toFixed(5);
        }
    // trx CALC DAY
    daytrx = document.getElementById("daytrx").innerHTML;
    daytrxD = Number(daytrx) * trxPrice
    if (isNaN(daytrxD)) {
        document.getElementById("daytrxD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("daytrxD").innerText = "$" + daytrxD.toFixed(5);
        }
    // trx CALC WEEK
    weektrx = document.getElementById("weektrx").innerHTML;
    weektrxD = Number(weektrx) * trxPrice
    if (isNaN(weektrxD)) {
        document.getElementById("weektrxD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("weektrxD").innerText = "$" + weektrxD.toFixed(5);
        }    
    // trx CALC MONTH
    monthtrx = document.getElementById("monthtrx").innerHTML;
    monthtrxD = Number(monthtrx) * trxPrice
    if (isNaN(mintrxD)) {
        document.getElementById("monthtrxD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("monthtrxD").innerText = "$" + monthtrxD.toFixed(5);
        }    
    // trx CALC YEAR
    yeartrx = document.getElementById("yeartrx").innerHTML;
    yeartrxD = Number(yeartrx) * trxPrice
    if (isNaN(yeartrxD)) {
        document.getElementById("yeartrxD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("yeartrxD").innerText = "$" + yeartrxD.toFixed(5);
        }
    }

fetchData()
setInterval(fetchData, 5000)
    // console.log('updated')
    // console.log(dogePrice)