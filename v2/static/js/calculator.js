calc = function(){
    var minerRate = document.getElementById("minerRate").value,
        gamesRate = document.getElementById("gamesRate").value,
        // Calc Total Mining
        totalRate = Number(minerRate) + Number(gamesRate);
    document.getElementById("totalRate").innerText = totalRate.toFixed(3);
        
    var distBtc = document.getElementById("distBtc").value,
        distDoge = document.getElementById("distDoge").value,
        distEth = document.getElementById("distEth").value,
		distbnb = document.getElementById("distbnb").value,
		distmatic = document.getElementById("distmatic").value,
		distsol = document.getElementById("distsol").value,
        distRlt = document.getElementById("distRlt").value;

    var netBtc = document.getElementById("netBtc").value,
        netDoge = document.getElementById("netDoge").value,
        netEth = document.getElementById("netEth").value,
		netbnb = document.getElementById("netbnb").value,
		netmatic = document.getElementById("netmatic").value,
		netsol = document.getElementById("netsol").value,
        netRlt = document.getElementById("netRlt").value;
        // Calc Total Net Power
        totalNet = Number(netBtc) + Number(netDoge) + Number(netEth) + Number(netbnb) + Number(netmatic) + Number(netsol) + Number(netRlt);
    document.getElementById("totalNet").innerText = totalNet.toFixed(3);

    var blockBtc = document.getElementById("blockBtc").innerText/100000000,
        blockDoge = document.getElementById("blockDoge").innerText,
        blockEth = document.getElementById("blockEth").innerText,
		blockbnb = document.getElementById("blockbnb").innerText,
		blockmatic = document.getElementById("blockmatic").innerText,
		blocksol = document.getElementById("blocksol").innerText,
        blockRlt = document.getElementById("blockRlt").innerText;
    
//BITCOIN HESAPLAMA ARACI//
    var btcPower = ((Number(totalRate)/1000) * Number(distBtc))/100
        btcPrice1 = document.getElementById('btc-price-api').innerHTML
        btcPrice = Number(btcPrice1.substring(1))
        minBtc = (Number(btcPower)*blockBtc)/(Number(netBtc)*1000)
        minBtcD = Number(minBtc) * btcPrice
        hourBtc = Number(minBtc) * 6
        hourBtcD = Number(hourBtc) * btcPrice
        dayBtc = Number(hourBtc) * 24 
        dayBtcD = Number(dayBtc) * btcPrice
        weekBtc = Number(dayBtc) * 7
        weekBtcD = Number(weekBtc) * btcPrice
        monthBtc = Number(dayBtc) * 30
        monthBtcD = Number(monthBtc) * btcPrice
        yearBtc = Number(dayBtc) * 365
        yearBtcD = Number(yearBtc) * btcPrice

    if ((isNaN(minBtc))||!(isFinite(minBtc))) {
        document.getElementById("minBtc").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minBtc").innerText = minBtc.toFixed(10);
        }
    if ((isNaN(hourBtc))||!(isFinite(hourBtc))) {
        document.getElementById("hourBtc").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hourBtc").innerText = hourBtc.toFixed(10);
        }
    if ((isNaN(dayBtc))||!(isFinite(dayBtc))) {
        document.getElementById("dayBtc").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("dayBtc").innerText = dayBtc.toFixed(10);
        }
    if ((isNaN(weekBtc))||!(isFinite(weekBtc))) {
        document.getElementById("weekBtc").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weekBtc").innerText = weekBtc.toFixed(10);
        }
    if ((isNaN(monthBtc))||!(isFinite(monthBtc))) {
        document.getElementById("monthBtc").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthBtc").innerText = monthBtc.toFixed(10);
        }
    if ((isNaN(yearBtc))||!(isFinite(yearBtc))) {
        document.getElementById("yearBtc").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearBtc").innerText = yearBtc.toFixed(10);
        }
    if ((isNaN(minBtcD))||!(isFinite(minBtcD))) {
        document.getElementById("minBtcD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minBtcD").innerText = "$" + minBtcD.toFixed(5);
        }
    if ((isNaN(hourBtcD))||!(isFinite(hourBtcD))) {
        document.getElementById("hourBtcD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hourBtcD").innerText = "$" + hourBtcD.toFixed(5);
        }
    if ((isNaN(dayBtcD))||!(isFinite(dayBtcD))) {
        document.getElementById("dayBtcD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("dayBtcD").innerText = "$" + dayBtcD.toFixed(5);
        }
    if ((isNaN(weekBtcD))||!(isFinite(weekBtcD))) {
        document.getElementById("weekBtcD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weekBtcD").innerText = "$" + weekBtcD.toFixed(5);
        }
    if ((isNaN(monthBtcD))||!(isFinite(monthBtcD))) {
        document.getElementById("monthBtcD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthBtcD").innerText = "$" + monthBtcD.toFixed(5);
        }
    if ((isNaN(yearBtcD))||!(isFinite(yearBtcD))) {
        document.getElementById("yearBtcD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearBtcD").innerText = "$" + yearBtcD.toFixed(5);
        }
//DOGECOIN HESAPLAMA ARACI//
    var dogePower = ((Number(totalRate)/1000) * Number(distDoge))/100
        dogePrice1 = document.getElementById('doge-price-api').innerHTML
        dogePrice = Number(dogePrice1.substring(1))
        minDoge = (Number(dogePower)*blockDoge)/(Number(netDoge)*1000)
        minDogeD = Number(minDoge) * dogePrice
        hourDoge = Number(minDoge) * 6
        hourDogeD = Number(hourDoge) * dogePrice
        dayDoge = Number(hourDoge) * 24 
        dayDogeD = Number(dayDoge) * dogePrice
        weekDoge = Number(dayDoge) * 7
        weekDogeD = Number(weekDoge) * dogePrice
        monthDoge = Number(dayDoge) * 30
        monthDogeD = Number(monthDoge) * dogePrice
        yearDoge = Number(dayDoge) * 365
        yearDogeD = Number(yearDoge) * dogePrice

    if ((isNaN(minDoge))||!(isFinite(minDoge))) {
        document.getElementById("minDoge").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minDoge").innerText = minDoge.toFixed(10);
        }
    if ((isNaN(hourDoge))||!(isFinite(hourDoge))) {
        document.getElementById("hourDoge").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hourDoge").innerText = hourDoge.toFixed(10);
        }
    if ((isNaN(dayDoge))||!(isFinite(dayDoge))) {
        document.getElementById("dayDoge").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("dayDoge").innerText = dayDoge.toFixed(10);
        }
    if ((isNaN(weekDoge))||!(isFinite(weekDoge))) {
        document.getElementById("weekDoge").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weekDoge").innerText = weekDoge.toFixed(10);
        }
    if ((isNaN(monthDoge))||!(isFinite(monthDoge))) {
        document.getElementById("monthDoge").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthDoge").innerText = monthDoge.toFixed(10);
        }
    if ((isNaN(yearDoge))||!(isFinite(yearDoge))) {
        document.getElementById("yearDoge").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearDoge").innerText = yearDoge.toFixed(10);
        }
    
    if ((isNaN(minDogeD))||!(isFinite(minDogeD))) {
        document.getElementById("minDogeD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minDogeD").innerText = "$" + minDogeD.toFixed(5);
        }
    if ((isNaN(hourDogeD))||!(isFinite(hourDogeD))) {
        document.getElementById("hourDogeD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hourDogeD").innerText = "$" + hourDogeD.toFixed(5);
        }
    if ((isNaN(dayDogeD))||!(isFinite(dayDogeD))) {
        document.getElementById("dayDogeD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("dayDogeD").innerText = "$" + dayDogeD.toFixed(5);
        }
    if ((isNaN(weekDogeD))||!(isFinite(weekDogeD))) {
        document.getElementById("weekDogeD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weekDogeD").innerText = "$" + weekDogeD.toFixed(5);
        }
    if ((isNaN(monthDogeD))||!(isFinite(monthDogeD))) {
        document.getElementById("monthDogeD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthDogeD").innerText = "$" + monthDogeD.toFixed(5);
        }
    if ((isNaN(yearDogeD))||!(isFinite(yearDogeD))) {
        document.getElementById("yearDogeD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearDogeD").innerText = "$" + yearDogeD.toFixed(5);
        }
//ETHEREUM HESAPLAMA ARACI//
    var ethPower = ((Number(totalRate)/1000) * Number(distEth))/100
        ethPrice1 = document.getElementById('eth-price-api').innerHTML
        ethPrice = Number(ethPrice1.substring(1))
        minEth = (Number(ethPower)*blockEth)/(Number(netEth)*1000)
        minEthD = Number(minEth) * ethPrice
        hourEth = Number(minEth) * 6
        hourEthD = Number(hourEth) * ethPrice
        dayEth = Number(hourEth) * 24 
        dayEthD = Number(dayEth) * ethPrice
        weekEth = Number(dayEth) * 7
        weekEthD = Number(weekEth) * ethPrice
        monthEth = Number(dayEth) * 30
        monthEthD = Number(monthEth) * ethPrice
        yearEth = Number(dayEth) * 365
        yearEthD = Number(yearEth) * ethPrice

    if ((isNaN(minEth))||!(isFinite(minEth))) {
        document.getElementById("minEth").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minEth").innerText = minEth.toFixed(10);
        }
    if ((isNaN(hourEth))||!(isFinite(hourEth))) {
        document.getElementById("hourEth").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hourEth").innerText = hourEth.toFixed(10);
        }
    if ((isNaN(dayEth))||!(isFinite(dayEth))) {
        document.getElementById("dayEth").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("dayEth").innerText = dayEth.toFixed(10);
        }
    if ((isNaN(weekEth))||!(isFinite(weekEth))) {
        document.getElementById("weekEth").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weekEth").innerText = weekEth.toFixed(10);
        }
    if ((isNaN(monthEth))||!(isFinite(monthEth))) {
        document.getElementById("monthEth").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthEth").innerText = monthEth.toFixed(10);
        }
    if ((isNaN(yearEth))||!(isFinite(yearEth))) {
        document.getElementById("yearEth").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearEth").innerText = yearEth.toFixed(10);
        }
    
    if ((isNaN(minEthD))||!(isFinite(minEthD))) {
        document.getElementById("minEthD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minEthD").innerText = "$" + minEthD.toFixed(5);
        }
    if ((isNaN(hourEthD))||!(isFinite(hourEthD))) {
        document.getElementById("hourEthD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hourEthD").innerText = "$" + hourEthD.toFixed(5);
        }
    if ((isNaN(dayEthD))||!(isFinite(dayEthD))) {
        document.getElementById("dayEthD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("dayEthD").innerText = "$" + dayEthD.toFixed(5);
        }
    if ((isNaN(weekEthD))||!(isFinite(weekEthD))) {
        document.getElementById("weekEthD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weekEthD").innerText = "$" + weekEthD.toFixed(5);
        }
    if ((isNaN(monthEthD))||!(isFinite(monthEthD))) {
        document.getElementById("monthEthD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthEthD").innerText = "$" + monthEthD.toFixed(5);
        }
    if ((isNaN(yearEthD))||!(isFinite(yearEthD))) {
        document.getElementById("yearEthD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearEthD").innerText = "$" + yearEthD.toFixed(5);
        }
//BINANCECOIN HESAPLAMA ARACI//
    var bnbPower = ((Number(totalRate)/1000) * Number(distbnb))/100
        bnbPrice1 = document.getElementById('bnb-price-api').innerHTML
        bnbPrice = Number(bnbPrice1.substring(1))
        minbnb = (Number(bnbPower)*blockbnb)/(Number(netbnb)*1000)
        minbnbD = Number(minbnb) * bnbPrice
        hourbnb = Number(minbnb) * 6
        hourbnbD = Number(hourbnb) * bnbPrice
        daybnb = Number(hourbnb) * 24 
        daybnbD = Number(daybnb) * bnbPrice
        weekbnb = Number(daybnb) * 7
        weekbnbD = Number(weekbnb) * bnbPrice
        monthbnb = Number(daybnb) * 30
        monthbnbD = Number(monthbnb) * bnbPrice
        yearbnb = Number(daybnb) * 365
        yearbnbD = Number(yearbnb) * bnbPrice

    if ((isNaN(minbnb))||!(isFinite(minbnb))) {
        document.getElementById("minbnb").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minbnb").innerText = minbnb.toFixed(10);
        }
    if ((isNaN(hourbnb))||!(isFinite(hourbnb))) {
        document.getElementById("hourbnb").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hourbnb").innerText = hourbnb.toFixed(10);
        }
    if ((isNaN(daybnb))||!(isFinite(daybnb))) {
        document.getElementById("daybnb").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("daybnb").innerText = daybnb.toFixed(10);
        }
    if ((isNaN(weekbnb))||!(isFinite(weekbnb))) {
        document.getElementById("weekbnb").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weekbnb").innerText = weekbnb.toFixed(10);
        }
    if ((isNaN(monthbnb))||!(isFinite(monthbnb))) {
        document.getElementById("monthbnb").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthbnb").innerText = monthbnb.toFixed(10);
        }
    if ((isNaN(yearbnb))||!(isFinite(yearbnb))) {
        document.getElementById("yearbnb").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearbnb").innerText = yearbnb.toFixed(10);
        }
    if ((isNaN(minbnbD))||!(isFinite(minbnbD))) {
        document.getElementById("minbnbD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minbnbD").innerText = "$" + minbnbD.toFixed(5);
        }
    if ((isNaN(hourbnbD))||!(isFinite(hourbnbD))) {
        document.getElementById("hourbnbD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hourbnbD").innerText = "$" + hourbnbD.toFixed(5);
        }
    if ((isNaN(daybnbD))||!(isFinite(daybnbD))) {
        document.getElementById("daybnbD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("daybnbD").innerText = "$" + daybnbD.toFixed(5);
        }
    if ((isNaN(weekbnbD))||!(isFinite(weekbnbD))) {
        document.getElementById("weekbnbD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weekbnbD").innerText = "$" + weekbnbD.toFixed(5);
        }
    if ((isNaN(monthbnbD))||!(isFinite(monthbnbD))) {
        document.getElementById("monthbnbD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthbnbD").innerText = "$" + monthbnbD.toFixed(5);
        }
    if ((isNaN(yearbnbD))||!(isFinite(yearbnbD))) {
        document.getElementById("yearbnbD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearbnbD").innerText = "$" + yearbnbD.toFixed(5);
        }
//POLYGON (MATIC) HESAPLAMA ARACI//
    var maticPower = ((Number(totalRate)/1000) * Number(distmatic))/100
        maticPrice1 = document.getElementById('matic-price-api').innerHTML
        maticPrice = Number(maticPrice1.substring(1))
        minmatic = (Number(maticPower)*blockmatic)/(Number(netmatic)*1000)
        minmaticD = Number(minmatic) * maticPrice
        hourmatic = Number(minmatic) * 6
        hourmaticD = Number(hourmatic) * maticPrice
        daymatic = Number(hourmatic) * 24 
        daymaticD = Number(daymatic) * maticPrice
        weekmatic = Number(daymatic) * 7
        weekmaticD = Number(weekmatic) * maticPrice
        monthmatic = Number(daymatic) * 30
        monthmaticD = Number(monthmatic) * maticPrice
        yearmatic = Number(daymatic) * 365
        yearmaticD = Number(yearmatic) * maticPrice

    if ((isNaN(minmatic))||!(isFinite(minmatic))) {
        document.getElementById("minmatic").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minmatic").innerText = minmatic.toFixed(10);
        }
    if ((isNaN(hourmatic))||!(isFinite(hourmatic))) {
        document.getElementById("hourmatic").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hourmatic").innerText = hourmatic.toFixed(10);
        }
    if ((isNaN(daymatic))||!(isFinite(daymatic))) {
        document.getElementById("daymatic").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("daymatic").innerText = daymatic.toFixed(10);
        }
    if ((isNaN(weekmatic))||!(isFinite(weekmatic))) {
        document.getElementById("weekmatic").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weekmatic").innerText = weekmatic.toFixed(10);
        }
    if ((isNaN(monthmatic))||!(isFinite(monthmatic))) {
        document.getElementById("monthmatic").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthmatic").innerText = monthmatic.toFixed(10);
        }
    if ((isNaN(yearmatic))||!(isFinite(yearmatic))) {
        document.getElementById("yearmatic").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearmatic").innerText = yearmatic.toFixed(10);
        }
    if ((isNaN(minmaticD))||!(isFinite(minmaticD))) {
        document.getElementById("minmaticD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minmaticD").innerText = "$" + minmaticD.toFixed(5);
        }
    if ((isNaN(hourmaticD))||!(isFinite(hourmaticD))) {
        document.getElementById("hourmaticD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hourmaticD").innerText = "$" + hourmaticD.toFixed(5);
        }
    if ((isNaN(daymaticD))||!(isFinite(daymaticD))) {
        document.getElementById("daymaticD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("daymaticD").innerText = "$" + daymaticD.toFixed(5);
        }
    if ((isNaN(weekmaticD))||!(isFinite(weekmaticD))) {
        document.getElementById("weekmaticD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weekmaticD").innerText = "$" + weekmaticD.toFixed(5);
        }
    if ((isNaN(monthmaticD))||!(isFinite(monthmaticD))) {
        document.getElementById("monthmaticD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthmaticD").innerText = "$" + monthmaticD.toFixed(5);
        }
    if ((isNaN(yearmaticD))||!(isFinite(yearmaticD))) {
        document.getElementById("yearmaticD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearmaticD").innerText = "$" + yearmaticD.toFixed(5);
        }
//SOLANA HESAPLAMA ARACI//
    var solPower = ((Number(totalRate)/1000) * Number(distsol))/100
        solPrice1 = document.getElementById('sol-price-api').innerHTML
        solPrice = Number(solPrice1.substring(1))
        minsol = (Number(solPower)*blocksol)/(Number(netsol)*1000)
        minsolD = Number(minsol) * solPrice
        hoursol = Number(minsol) * 6
        hoursolD = Number(hoursol) * solPrice
        daysol = Number(hoursol) * 24 
        daysolD = Number(daysol) * solPrice
        weeksol = Number(daysol) * 7
        weeksolD = Number(weeksol) * solPrice
        monthsol = Number(daysol) * 30
        monthsolD = Number(monthsol) * solPrice
        yearsol = Number(daysol) * 365
        yearsolD = Number(yearsol) * solPrice

    if ((isNaN(minsol))||!(isFinite(minsol))) {
        document.getElementById("minsol").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minsol").innerText = minsol.toFixed(10);
        }
    if ((isNaN(hoursol))||!(isFinite(hoursol))) {
        document.getElementById("hoursol").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hoursol").innerText = hoursol.toFixed(10);
        }
    if ((isNaN(daysol))||!(isFinite(daysol))) {
        document.getElementById("daysol").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("daysol").innerText = daysol.toFixed(10);
        }
    if ((isNaN(weeksol))||!(isFinite(weeksol))) {
        document.getElementById("weeksol").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weeksol").innerText = weeksol.toFixed(10);
        }
    if ((isNaN(monthsol))||!(isFinite(monthsol))) {
        document.getElementById("monthsol").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthsol").innerText = monthsol.toFixed(10);
        }
    if ((isNaN(yearsol))||!(isFinite(yearsol))) {
        document.getElementById("yearsol").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearsol").innerText = yearsol.toFixed(10);
        }
    if ((isNaN(minsolD))||!(isFinite(minsolD))) {
        document.getElementById("minsolD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minsolD").innerText = "$" + minsolD.toFixed(5);
        }
    if ((isNaN(hoursolD))||!(isFinite(hoursolD))) {
        document.getElementById("hoursolD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hoursolD").innerText = "$" + hoursolD.toFixed(5);
        }
    if ((isNaN(daysolD))||!(isFinite(daysolD))) {
        document.getElementById("daysolD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("daysolD").innerText = "$" + daysolD.toFixed(5);
        }
    if ((isNaN(weeksolD))||!(isFinite(weeksolD))) {
        document.getElementById("weeksolD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weeksolD").innerText = "$" + weeksolD.toFixed(5);
        }
    if ((isNaN(monthsolD))||!(isFinite(monthsolD))) {
        document.getElementById("monthsolD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthsolD").innerText = "$" + monthsolD.toFixed(5);
        }
    if ((isNaN(yearsolD))||!(isFinite(yearsolD))) {
        document.getElementById("yearsolD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearsolD").innerText = "$" + yearsolD.toFixed(5);
        }
//ROLLERTOKEN HESAPLAMA ARACI//
    var rltPower = ((Number(totalRate)/1000) * Number(distRlt))/100
        rltPrice1 = document.getElementById('rlt-price-api').innerHTML
        rltPrice = Number(rltPrice1.substring(1))
        minRlt = (Number(rltPower)*blockRlt)/(Number(netRlt)*1000)
        minRltD = Number(minRlt) * rltPrice
        hourRlt = Number(minRlt) * 6
        hourRltD = Number(hourRlt) * rltPrice
        dayRlt = Number(hourRlt) * 24 
        dayRltD = Number(dayRlt) * rltPrice
        weekRlt = Number(dayRlt) * 7
        weekRltD = Number(weekRlt) * rltPrice
        monthRlt = Number(dayRlt) * 30
        monthRltD = Number(monthRlt) * rltPrice
        yearRlt = Number(dayRlt) * 365
        yearRltD = Number(yearRlt) * rltPrice

    if ((isNaN(minRlt))||!(isFinite(minRlt))) {
        document.getElementById("minRlt").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minRlt").innerText = minRlt.toFixed(10);
        }
    if ((isNaN(hourRlt))||!(isFinite(hourRlt))) {
        document.getElementById("hourRlt").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hourRlt").innerText = hourRlt.toFixed(10);
        }
    if ((isNaN(dayRlt))||!(isFinite(dayRlt))) {
        document.getElementById("dayRlt").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("dayRlt").innerText = dayRlt.toFixed(10);
        }
    if ((isNaN(weekRlt))||!(isFinite(weekRlt))) {
        document.getElementById("weekRlt").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weekRlt").innerText = weekRlt.toFixed(10);
        }
    if ((isNaN(monthRlt))||!(isFinite(monthRlt))) {
        document.getElementById("monthRlt").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthRlt").innerText = monthRlt.toFixed(10);
        }
    if ((isNaN(yearRlt))||!(isFinite(yearRlt))) {
        document.getElementById("yearRlt").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearRlt").innerText = yearRlt.toFixed(10);
        }
    if ((isNaN(minRltD))||!(isFinite(minRltD))) {
        document.getElementById("minRltD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("minRltD").innerText = "$" + minRltD.toFixed(5);
        }
    if ((isNaN(hourRltD))||!(isFinite(hourRltD))) {
        document.getElementById("hourRltD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("hourRltD").innerText = "$" + hourRltD.toFixed(5);
        }
    if ((isNaN(dayRltD))||!(isFinite(dayRltD))) {
        document.getElementById("dayRltD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("dayRltD").innerText = "$" + dayRltD.toFixed(5);
        }
    if ((isNaN(weekRltD))||!(isFinite(weekRltD))) {
        document.getElementById("weekRltD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("weekRltD").innerText = "$" + weekRltD.toFixed(5);
        }
    if ((isNaN(monthRltD))||!(isFinite(monthRltD))) {
        document.getElementById("monthRltD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("monthRltD").innerText = "$" + monthRltD.toFixed(5);
        }
    if ((isNaN(yearRltD))||!(isFinite(yearRltD))) {
        document.getElementById("yearRltD").innerText = "【⛏ Kazım Miktarı ⛏】"}
        else {
            document.getElementById("yearRltD").innerText = "$" + yearRltD.toFixed(5);
        }
    }
    