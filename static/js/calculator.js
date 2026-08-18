calc = function(){
    var minerRate = document.getElementById("minerRate").value;
        // Calc Total Mining
        totalRate = Number(minerRate);
    document.getElementById("totalRate").innerText = totalRate.toFixed(3);
        
    //var //distBtc = document.getElementById("distBtc").value,
        //distDoge = document.getElementById("distDoge").value,
        //distEth = document.getElementById("distEth").value,
		//distbnb = document.getElementById("distbnb").value,
		//distmatic = document.getElementById("distmatic").value,
		//distltc = document.getElementById("distltc").value,
		//distsol = document.getElementById("distsol").value,
		//disttrx = document.getElementById("disttrx").value,
		//distRlt = document.getElementById("distRlt").value,
		//distrst = document.getElementById("distrst").value;

    var netBtc = document.getElementById("netBtc").value,
        netDoge = document.getElementById("netDoge").value,
        netEth = document.getElementById("netEth").value,
		netbnb = document.getElementById("netbnb").value,
		netmatic = document.getElementById("netmatic").value,
		netltc = document.getElementById("netltc").value,
		netsol = document.getElementById("netsol").value,
		nettrx = document.getElementById("nettrx").value,
        netRlt = document.getElementById("netRlt").value,
		netrst = document.getElementById("netrst").value;
        // Calc Total Net Power
        totalNet = Number(netBtc) + Number(netDoge) + Number(netEth) + Number(netbnb) + Number(netmatic) + Number(netltc) + Number(netsol) + Number(nettrx) + Number(netRlt) + Number(netrst);
    document.getElementById("totalNet").innerText = totalNet.toFixed(3);

    var blockBtc = document.getElementById("blockBtc").innerText/100000000,
        blockDoge = document.getElementById("blockDoge").innerText,
        blockEth = document.getElementById("blockEth").innerText,
		blockbnb = document.getElementById("blockbnb").innerText,
		blockmatic = document.getElementById("blockmatic").innerText,
		blocksol = document.getElementById("blocksol").innerText,
		blockltc = document.getElementById("blockltc").innerText,
		blocktrx = document.getElementById("blocktrx").innerText,
        blockRlt = document.getElementById("blockRlt").innerText,
		blockrst = document.getElementById("blockrst").innerText;
    
//BITCOIN HESAPLAMA ARACI//
    var btcPower = ((Number(totalRate)/1000))
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
        document.getElementById("minBtc").innerText = "【⛏】"}
        else {
            document.getElementById("minBtc").innerText = minBtc.toFixed(10);
        }
    if ((isNaN(hourBtc))||!(isFinite(hourBtc))) {
        document.getElementById("hourBtc").innerText = "【⛏】"}
        else {
            document.getElementById("hourBtc").innerText = hourBtc.toFixed(10);
        }
    if ((isNaN(dayBtc))||!(isFinite(dayBtc))) {
        document.getElementById("dayBtc").innerText = "【⛏】"}
        else {
            document.getElementById("dayBtc").innerText = dayBtc.toFixed(10);
        }
    if ((isNaN(weekBtc))||!(isFinite(weekBtc))) {
        document.getElementById("weekBtc").innerText = "【⛏】"}
        else {
            document.getElementById("weekBtc").innerText = weekBtc.toFixed(10);
        }
    if ((isNaN(monthBtc))||!(isFinite(monthBtc))) {
        document.getElementById("monthBtc").innerText = "【⛏】"}
        else {
            document.getElementById("monthBtc").innerText = monthBtc.toFixed(10);
        }
    if ((isNaN(yearBtc))||!(isFinite(yearBtc))) {
        document.getElementById("yearBtc").innerText = "【⛏】"}
        else {
            document.getElementById("yearBtc").innerText = yearBtc.toFixed(10);
        }
    if ((isNaN(minBtcD))||!(isFinite(minBtcD))) {
        document.getElementById("minBtcD").innerText = "【⛏】"}
        else {
            document.getElementById("minBtcD").innerText = "$" + minBtcD.toFixed(5);
        }
    if ((isNaN(hourBtcD))||!(isFinite(hourBtcD))) {
        document.getElementById("hourBtcD").innerText = "【⛏】"}
        else {
            document.getElementById("hourBtcD").innerText = "$" + hourBtcD.toFixed(5);
        }
    if ((isNaN(dayBtcD))||!(isFinite(dayBtcD))) {
        document.getElementById("dayBtcD").innerText = "【⛏】"}
        else {
            document.getElementById("dayBtcD").innerText = "$" + dayBtcD.toFixed(5);
        }
    if ((isNaN(weekBtcD))||!(isFinite(weekBtcD))) {
        document.getElementById("weekBtcD").innerText = "【⛏】"}
        else {
            document.getElementById("weekBtcD").innerText = "$" + weekBtcD.toFixed(5);
        }
    if ((isNaN(monthBtcD))||!(isFinite(monthBtcD))) {
        document.getElementById("monthBtcD").innerText = "【⛏】"}
        else {
            document.getElementById("monthBtcD").innerText = "$" + monthBtcD.toFixed(5);
        }
    if ((isNaN(yearBtcD))||!(isFinite(yearBtcD))) {
        document.getElementById("yearBtcD").innerText = "【⛏】"}
        else {
            document.getElementById("yearBtcD").innerText = "$" + yearBtcD.toFixed(5);
        }
//DOGECOIN HESAPLAMA ARACI//
    var dogePower = ((Number(totalRate)/1000))
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
        document.getElementById("minDoge").innerText = "【⛏】"}
        else {
            document.getElementById("minDoge").innerText = minDoge.toFixed(10);
        }
    if ((isNaN(hourDoge))||!(isFinite(hourDoge))) {
        document.getElementById("hourDoge").innerText = "【⛏】"}
        else {
            document.getElementById("hourDoge").innerText = hourDoge.toFixed(10);
        }
    if ((isNaN(dayDoge))||!(isFinite(dayDoge))) {
        document.getElementById("dayDoge").innerText = "【⛏】"}
        else {
            document.getElementById("dayDoge").innerText = dayDoge.toFixed(10);
        }
    if ((isNaN(weekDoge))||!(isFinite(weekDoge))) {
        document.getElementById("weekDoge").innerText = "【⛏】"}
        else {
            document.getElementById("weekDoge").innerText = weekDoge.toFixed(10);
        }
    if ((isNaN(monthDoge))||!(isFinite(monthDoge))) {
        document.getElementById("monthDoge").innerText = "【⛏】"}
        else {
            document.getElementById("monthDoge").innerText = monthDoge.toFixed(10);
        }
    if ((isNaN(yearDoge))||!(isFinite(yearDoge))) {
        document.getElementById("yearDoge").innerText = "【⛏】"}
        else {
            document.getElementById("yearDoge").innerText = yearDoge.toFixed(10);
        }
    
    if ((isNaN(minDogeD))||!(isFinite(minDogeD))) {
        document.getElementById("minDogeD").innerText = "【⛏】"}
        else {
            document.getElementById("minDogeD").innerText = "$" + minDogeD.toFixed(5);
        }
    if ((isNaN(hourDogeD))||!(isFinite(hourDogeD))) {
        document.getElementById("hourDogeD").innerText = "【⛏】"}
        else {
            document.getElementById("hourDogeD").innerText = "$" + hourDogeD.toFixed(5);
        }
    if ((isNaN(dayDogeD))||!(isFinite(dayDogeD))) {
        document.getElementById("dayDogeD").innerText = "【⛏】"}
        else {
            document.getElementById("dayDogeD").innerText = "$" + dayDogeD.toFixed(5);
        }
    if ((isNaN(weekDogeD))||!(isFinite(weekDogeD))) {
        document.getElementById("weekDogeD").innerText = "【⛏】"}
        else {
            document.getElementById("weekDogeD").innerText = "$" + weekDogeD.toFixed(5);
        }
    if ((isNaN(monthDogeD))||!(isFinite(monthDogeD))) {
        document.getElementById("monthDogeD").innerText = "【⛏】"}
        else {
            document.getElementById("monthDogeD").innerText = "$" + monthDogeD.toFixed(5);
        }
    if ((isNaN(yearDogeD))||!(isFinite(yearDogeD))) {
        document.getElementById("yearDogeD").innerText = "【⛏】"}
        else {
            document.getElementById("yearDogeD").innerText = "$" + yearDogeD.toFixed(5);
        }
//ETHEREUM HESAPLAMA ARACI//
    var ethPower = ((Number(totalRate)/1000))
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
        document.getElementById("minEth").innerText = "【⛏】"}
        else {
            document.getElementById("minEth").innerText = minEth.toFixed(10);
        }
    if ((isNaN(hourEth))||!(isFinite(hourEth))) {
        document.getElementById("hourEth").innerText = "【⛏】"}
        else {
            document.getElementById("hourEth").innerText = hourEth.toFixed(10);
        }
    if ((isNaN(dayEth))||!(isFinite(dayEth))) {
        document.getElementById("dayEth").innerText = "【⛏】"}
        else {
            document.getElementById("dayEth").innerText = dayEth.toFixed(10);
        }
    if ((isNaN(weekEth))||!(isFinite(weekEth))) {
        document.getElementById("weekEth").innerText = "【⛏】"}
        else {
            document.getElementById("weekEth").innerText = weekEth.toFixed(10);
        }
    if ((isNaN(monthEth))||!(isFinite(monthEth))) {
        document.getElementById("monthEth").innerText = "【⛏】"}
        else {
            document.getElementById("monthEth").innerText = monthEth.toFixed(10);
        }
    if ((isNaN(yearEth))||!(isFinite(yearEth))) {
        document.getElementById("yearEth").innerText = "【⛏】"}
        else {
            document.getElementById("yearEth").innerText = yearEth.toFixed(10);
        }
    
    if ((isNaN(minEthD))||!(isFinite(minEthD))) {
        document.getElementById("minEthD").innerText = "【⛏】"}
        else {
            document.getElementById("minEthD").innerText = "$" + minEthD.toFixed(5);
        }
    if ((isNaN(hourEthD))||!(isFinite(hourEthD))) {
        document.getElementById("hourEthD").innerText = "【⛏】"}
        else {
            document.getElementById("hourEthD").innerText = "$" + hourEthD.toFixed(5);
        }
    if ((isNaN(dayEthD))||!(isFinite(dayEthD))) {
        document.getElementById("dayEthD").innerText = "【⛏】"}
        else {
            document.getElementById("dayEthD").innerText = "$" + dayEthD.toFixed(5);
        }
    if ((isNaN(weekEthD))||!(isFinite(weekEthD))) {
        document.getElementById("weekEthD").innerText = "【⛏】"}
        else {
            document.getElementById("weekEthD").innerText = "$" + weekEthD.toFixed(5);
        }
    if ((isNaN(monthEthD))||!(isFinite(monthEthD))) {
        document.getElementById("monthEthD").innerText = "【⛏】"}
        else {
            document.getElementById("monthEthD").innerText = "$" + monthEthD.toFixed(5);
        }
    if ((isNaN(yearEthD))||!(isFinite(yearEthD))) {
        document.getElementById("yearEthD").innerText = "【⛏】"}
        else {
            document.getElementById("yearEthD").innerText = "$" + yearEthD.toFixed(5);
        }
//BINANCECOIN HESAPLAMA ARACI//
    var bnbPower = ((Number(totalRate)/1000))
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
        document.getElementById("minbnb").innerText = "【⛏】"}
        else {
            document.getElementById("minbnb").innerText = minbnb.toFixed(10);
        }
    if ((isNaN(hourbnb))||!(isFinite(hourbnb))) {
        document.getElementById("hourbnb").innerText = "【⛏】"}
        else {
            document.getElementById("hourbnb").innerText = hourbnb.toFixed(10);
        }
    if ((isNaN(daybnb))||!(isFinite(daybnb))) {
        document.getElementById("daybnb").innerText = "【⛏】"}
        else {
            document.getElementById("daybnb").innerText = daybnb.toFixed(10);
        }
    if ((isNaN(weekbnb))||!(isFinite(weekbnb))) {
        document.getElementById("weekbnb").innerText = "【⛏】"}
        else {
            document.getElementById("weekbnb").innerText = weekbnb.toFixed(10);
        }
    if ((isNaN(monthbnb))||!(isFinite(monthbnb))) {
        document.getElementById("monthbnb").innerText = "【⛏】"}
        else {
            document.getElementById("monthbnb").innerText = monthbnb.toFixed(10);
        }
    if ((isNaN(yearbnb))||!(isFinite(yearbnb))) {
        document.getElementById("yearbnb").innerText = "【⛏】"}
        else {
            document.getElementById("yearbnb").innerText = yearbnb.toFixed(10);
        }
    if ((isNaN(minbnbD))||!(isFinite(minbnbD))) {
        document.getElementById("minbnbD").innerText = "【⛏】"}
        else {
            document.getElementById("minbnbD").innerText = "$" + minbnbD.toFixed(5);
        }
    if ((isNaN(hourbnbD))||!(isFinite(hourbnbD))) {
        document.getElementById("hourbnbD").innerText = "【⛏】"}
        else {
            document.getElementById("hourbnbD").innerText = "$" + hourbnbD.toFixed(5);
        }
    if ((isNaN(daybnbD))||!(isFinite(daybnbD))) {
        document.getElementById("daybnbD").innerText = "【⛏】"}
        else {
            document.getElementById("daybnbD").innerText = "$" + daybnbD.toFixed(5);
        }
    if ((isNaN(weekbnbD))||!(isFinite(weekbnbD))) {
        document.getElementById("weekbnbD").innerText = "【⛏】"}
        else {
            document.getElementById("weekbnbD").innerText = "$" + weekbnbD.toFixed(5);
        }
    if ((isNaN(monthbnbD))||!(isFinite(monthbnbD))) {
        document.getElementById("monthbnbD").innerText = "【⛏】"}
        else {
            document.getElementById("monthbnbD").innerText = "$" + monthbnbD.toFixed(5);
        }
    if ((isNaN(yearbnbD))||!(isFinite(yearbnbD))) {
        document.getElementById("yearbnbD").innerText = "【⛏】"}
        else {
            document.getElementById("yearbnbD").innerText = "$" + yearbnbD.toFixed(5);
        }
//POLYGON (MATIC) HESAPLAMA ARACI//
    var maticPower = ((Number(totalRate)/1000))
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
        document.getElementById("minmatic").innerText = "【⛏】"}
        else {
            document.getElementById("minmatic").innerText = minmatic.toFixed(10);
        }
    if ((isNaN(hourmatic))||!(isFinite(hourmatic))) {
        document.getElementById("hourmatic").innerText = "【⛏】"}
        else {
            document.getElementById("hourmatic").innerText = hourmatic.toFixed(10);
        }
    if ((isNaN(daymatic))||!(isFinite(daymatic))) {
        document.getElementById("daymatic").innerText = "【⛏】"}
        else {
            document.getElementById("daymatic").innerText = daymatic.toFixed(10);
        }
    if ((isNaN(weekmatic))||!(isFinite(weekmatic))) {
        document.getElementById("weekmatic").innerText = "【⛏】"}
        else {
            document.getElementById("weekmatic").innerText = weekmatic.toFixed(10);
        }
    if ((isNaN(monthmatic))||!(isFinite(monthmatic))) {
        document.getElementById("monthmatic").innerText = "【⛏】"}
        else {
            document.getElementById("monthmatic").innerText = monthmatic.toFixed(10);
        }
    if ((isNaN(yearmatic))||!(isFinite(yearmatic))) {
        document.getElementById("yearmatic").innerText = "【⛏】"}
        else {
            document.getElementById("yearmatic").innerText = yearmatic.toFixed(10);
        }
    if ((isNaN(minmaticD))||!(isFinite(minmaticD))) {
        document.getElementById("minmaticD").innerText = "【⛏】"}
        else {
            document.getElementById("minmaticD").innerText = "$" + minmaticD.toFixed(5);
        }
    if ((isNaN(hourmaticD))||!(isFinite(hourmaticD))) {
        document.getElementById("hourmaticD").innerText = "【⛏】"}
        else {
            document.getElementById("hourmaticD").innerText = "$" + hourmaticD.toFixed(5);
        }
    if ((isNaN(daymaticD))||!(isFinite(daymaticD))) {
        document.getElementById("daymaticD").innerText = "【⛏】"}
        else {
            document.getElementById("daymaticD").innerText = "$" + daymaticD.toFixed(5);
        }
    if ((isNaN(weekmaticD))||!(isFinite(weekmaticD))) {
        document.getElementById("weekmaticD").innerText = "【⛏】"}
        else {
            document.getElementById("weekmaticD").innerText = "$" + weekmaticD.toFixed(5);
        }
    if ((isNaN(monthmaticD))||!(isFinite(monthmaticD))) {
        document.getElementById("monthmaticD").innerText = "【⛏】"}
        else {
            document.getElementById("monthmaticD").innerText = "$" + monthmaticD.toFixed(5);
        }
    if ((isNaN(yearmaticD))||!(isFinite(yearmaticD))) {
        document.getElementById("yearmaticD").innerText = "【⛏】"}
        else {
            document.getElementById("yearmaticD").innerText = "$" + yearmaticD.toFixed(5);
        }
//LITECOIN HESAPLAMA ARACI//
    var ltcPower = ((Number(totalRate)/1000))
        ltcPrice1 = document.getElementById('ltc-price-api').innerHTML
        ltcPrice = Number(ltcPrice1.substring(1))
        minltc = (Number(ltcPower)*blockltc)/(Number(netltc)*1000)
        minltcD = Number(minltc) * ltcPrice
        hourltc = Number(minltc) * 6
        hourltcD = Number(hourltc) * ltcPrice
        dayltc = Number(hourltc) * 24 
        dayltcD = Number(dayltc) * ltcPrice
        weekltc = Number(dayltc) * 7
        weekltcD = Number(weekltc) * ltcPrice
        monthltc = Number(dayltc) * 30
        monthltcD = Number(monthltc) * ltcPrice
        yearltc = Number(dayltc) * 365
        yearltcD = Number(yearltc) * ltcPrice

    if ((isNaN(minltc))||!(isFinite(minltc))) {
        document.getElementById("minltc").innerText = "【⛏】"}
        else {
            document.getElementById("minltc").innerText = minltc.toFixed(10);
        }
    if ((isNaN(hourltc))||!(isFinite(hourltc))) {
        document.getElementById("hourltc").innerText = "【⛏】"}
        else {
            document.getElementById("hourltc").innerText = hourltc.toFixed(10);
        }
    if ((isNaN(dayltc))||!(isFinite(dayltc))) {
        document.getElementById("dayltc").innerText = "【⛏】"}
        else {
            document.getElementById("dayltc").innerText = dayltc.toFixed(10);
        }
    if ((isNaN(weekltc))||!(isFinite(weekltc))) {
        document.getElementById("weekltc").innerText = "【⛏】"}
        else {
            document.getElementById("weekltc").innerText = weekltc.toFixed(10);
        }
    if ((isNaN(monthltc))||!(isFinite(monthltc))) {
        document.getElementById("monthltc").innerText = "【⛏】"}
        else {
            document.getElementById("monthltc").innerText = monthltc.toFixed(10);
        }
    if ((isNaN(yearltc))||!(isFinite(yearltc))) {
        document.getElementById("yearltc").innerText = "【⛏】"}
        else {
            document.getElementById("yearltc").innerText = yearltc.toFixed(10);
        }
    if ((isNaN(minltcD))||!(isFinite(minltcD))) {
        document.getElementById("minltcD").innerText = "【⛏】"}
        else {
            document.getElementById("minltcD").innerText = "$" + minltcD.toFixed(5);
        }
    if ((isNaN(hourltcD))||!(isFinite(hourltcD))) {
        document.getElementById("hourltcD").innerText = "【⛏】"}
        else {
            document.getElementById("hourltcD").innerText = "$" + hourltcD.toFixed(5);
        }
    if ((isNaN(dayltcD))||!(isFinite(dayltcD))) {
        document.getElementById("dayltcD").innerText = "【⛏】"}
        else {
            document.getElementById("dayltcD").innerText = "$" + dayltcD.toFixed(5);
        }
    if ((isNaN(weekltcD))||!(isFinite(weekltcD))) {
        document.getElementById("weekltcD").innerText = "【⛏】"}
        else {
            document.getElementById("weekltcD").innerText = "$" + weekltcD.toFixed(5);
        }
    if ((isNaN(monthltcD))||!(isFinite(monthltcD))) {
        document.getElementById("monthltcD").innerText = "【⛏】"}
        else {
            document.getElementById("monthltcD").innerText = "$" + monthltcD.toFixed(5);
        }
    if ((isNaN(yearltcD))||!(isFinite(yearltcD))) {
        document.getElementById("yearltcD").innerText = "【⛏】"}
        else {
            document.getElementById("yearltcD").innerText = "$" + yearltcD.toFixed(5);
        }
//SOLANA HESAPLAMA ARACI//
    var solPower = ((Number(totalRate)/1000))
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
        document.getElementById("minsol").innerText = "【⛏】"}
        else {
            document.getElementById("minsol").innerText = minsol.toFixed(10);
        }
    if ((isNaN(hoursol))||!(isFinite(hoursol))) {
        document.getElementById("hoursol").innerText = "【⛏】"}
        else {
            document.getElementById("hoursol").innerText = hoursol.toFixed(10);
        }
    if ((isNaN(daysol))||!(isFinite(daysol))) {
        document.getElementById("daysol").innerText = "【⛏】"}
        else {
            document.getElementById("daysol").innerText = daysol.toFixed(10);
        }
    if ((isNaN(weeksol))||!(isFinite(weeksol))) {
        document.getElementById("weeksol").innerText = "【⛏】"}
        else {
            document.getElementById("weeksol").innerText = weeksol.toFixed(10);
        }
    if ((isNaN(monthsol))||!(isFinite(monthsol))) {
        document.getElementById("monthsol").innerText = "【⛏】"}
        else {
            document.getElementById("monthsol").innerText = monthsol.toFixed(10);
        }
    if ((isNaN(yearsol))||!(isFinite(yearsol))) {
        document.getElementById("yearsol").innerText = "【⛏】"}
        else {
            document.getElementById("yearsol").innerText = yearsol.toFixed(10);
        }
    if ((isNaN(minsolD))||!(isFinite(minsolD))) {
        document.getElementById("minsolD").innerText = "【⛏】"}
        else {
            document.getElementById("minsolD").innerText = "$" + minsolD.toFixed(5);
        }
    if ((isNaN(hoursolD))||!(isFinite(hoursolD))) {
        document.getElementById("hoursolD").innerText = "【⛏】"}
        else {
            document.getElementById("hoursolD").innerText = "$" + hoursolD.toFixed(5);
        }
    if ((isNaN(daysolD))||!(isFinite(daysolD))) {
        document.getElementById("daysolD").innerText = "【⛏】"}
        else {
            document.getElementById("daysolD").innerText = "$" + daysolD.toFixed(5);
        }
    if ((isNaN(weeksolD))||!(isFinite(weeksolD))) {
        document.getElementById("weeksolD").innerText = "【⛏】"}
        else {
            document.getElementById("weeksolD").innerText = "$" + weeksolD.toFixed(5);
        }
    if ((isNaN(monthsolD))||!(isFinite(monthsolD))) {
        document.getElementById("monthsolD").innerText = "【⛏】"}
        else {
            document.getElementById("monthsolD").innerText = "$" + monthsolD.toFixed(5);
        }
    if ((isNaN(yearsolD))||!(isFinite(yearsolD))) {
        document.getElementById("yearsolD").innerText = "【⛏】"}
        else {
            document.getElementById("yearsolD").innerText = "$" + yearsolD.toFixed(5);
        }
//TRON HESAPLAMA ARACI//
    var trxPower = ((Number(totalRate)/1000))
        trxPrice1 = document.getElementById('trx-price-api').innerHTML
        trxPrice = Number(trxPrice1.substring(1))
        mintrx = (Number(trxPower)*blocktrx)/(Number(nettrx)*1000)
        mintrxD = Number(mintrx) * trxPrice
        hourtrx = Number(mintrx) * 6
        hourtrxD = Number(hourtrx) * trxPrice
        daytrx = Number(hourtrx) * 24 
        daytrxD = Number(daytrx) * trxPrice
        weektrx = Number(daytrx) * 7
        weektrxD = Number(weektrx) * trxPrice
        monthtrx = Number(daytrx) * 30
        monthtrxD = Number(monthtrx) * trxPrice
        yeartrx = Number(daytrx) * 365
        yeartrxD = Number(yeartrx) * trxPrice

    if ((isNaN(mintrx))||!(isFinite(mintrx))) {
        document.getElementById("mintrx").innerText = "【⛏】"}
        else {
            document.getElementById("mintrx").innerText = mintrx.toFixed(10);
        }
    if ((isNaN(hourtrx))||!(isFinite(hourtrx))) {
        document.getElementById("hourtrx").innerText = "【⛏】"}
        else {
            document.getElementById("hourtrx").innerText = hourtrx.toFixed(10);
        }
    if ((isNaN(daytrx))||!(isFinite(daytrx))) {
        document.getElementById("daytrx").innerText = "【⛏】"}
        else {
            document.getElementById("daytrx").innerText = daytrx.toFixed(10);
        }
    if ((isNaN(weektrx))||!(isFinite(weektrx))) {
        document.getElementById("weektrx").innerText = "【⛏】"}
        else {
            document.getElementById("weektrx").innerText = weektrx.toFixed(10);
        }
    if ((isNaN(monthtrx))||!(isFinite(monthtrx))) {
        document.getElementById("monthtrx").innerText = "【⛏】"}
        else {
            document.getElementById("monthtrx").innerText = monthtrx.toFixed(10);
        }
    if ((isNaN(yeartrx))||!(isFinite(yeartrx))) {
        document.getElementById("yeartrx").innerText = "【⛏】"}
        else {
            document.getElementById("yeartrx").innerText = yeartrx.toFixed(10);
        }
    if ((isNaN(mintrxD))||!(isFinite(mintrxD))) {
        document.getElementById("mintrxD").innerText = "【⛏】"}
        else {
            document.getElementById("mintrxD").innerText = "$" + mintrxD.toFixed(5);
        }
    if ((isNaN(hourtrxD))||!(isFinite(hourtrxD))) {
        document.getElementById("hourtrxD").innerText = "【⛏】"}
        else {
            document.getElementById("hourtrxD").innerText = "$" + hourtrxD.toFixed(5);
        }
    if ((isNaN(daytrxD))||!(isFinite(daytrxD))) {
        document.getElementById("daytrxD").innerText = "【⛏】"}
        else {
            document.getElementById("daytrxD").innerText = "$" + daytrxD.toFixed(5);
        }
    if ((isNaN(weektrxD))||!(isFinite(weektrxD))) {
        document.getElementById("weektrxD").innerText = "【⛏】"}
        else {
            document.getElementById("weektrxD").innerText = "$" + weektrxD.toFixed(5);
        }
    if ((isNaN(monthtrxD))||!(isFinite(monthtrxD))) {
        document.getElementById("monthtrxD").innerText = "【⛏】"}
        else {
            document.getElementById("monthtrxD").innerText = "$" + monthtrxD.toFixed(5);
        }
    if ((isNaN(yeartrxD))||!(isFinite(yeartrxD))) {
        document.getElementById("yeartrxD").innerText = "【⛏】"}
        else {
            document.getElementById("yeartrxD").innerText = "$" + yeartrxD.toFixed(5);
        }
//SEZONTOKEN HESAPLAMA ARACI//
    var rstPower = ((Number(totalRate)/1000))
        minrst = (Number(rstPower)*blockrst)/(Number(netrst)*1000)
        hourrst = Number(minrst) * 6
        dayrst = Number(hourrst) * 24 
        weekrst = Number(dayrst) * 7
        monthrst = Number(dayrst) * 30
        yearrst = Number(dayrst) * 365

    if ((isNaN(minrst))||!(isFinite(minrst))) {
        document.getElementById("minrst").innerText = "【⛏】"}
        else {
            document.getElementById("minrst").innerText = minrst.toFixed(10);
        }
    if ((isNaN(hourrst))||!(isFinite(hourrst))) {
        document.getElementById("hourrst").innerText = "【⛏】"}
        else {
            document.getElementById("hourrst").innerText = hourrst.toFixed(10);
        }
    if ((isNaN(dayrst))||!(isFinite(dayrst))) {
        document.getElementById("dayrst").innerText = "【⛏】"}
        else {
            document.getElementById("dayrst").innerText = dayrst.toFixed(10);
        }
    if ((isNaN(weekrst))||!(isFinite(weekrst))) {
        document.getElementById("weekrst").innerText = "【⛏】"}
        else {
            document.getElementById("weekrst").innerText = weekrst.toFixed(10);
        }
    if ((isNaN(monthrst))||!(isFinite(monthrst))) {
        document.getElementById("monthrst").innerText = "【⛏】"}
        else {
            document.getElementById("monthrst").innerText = monthrst.toFixed(10);
        }
    if ((isNaN(yearrst))||!(isFinite(yearrst))) {
        document.getElementById("yearrst").innerText = "【⛏】"}
        else {
            document.getElementById("yearrst").innerText = yearrst.toFixed(10);
        }
    if ((isNaN(minrstD))||!(isFinite(minrstD))) {
        document.getElementById("minrstD").innerText = "【Değersiz】"}
        else {
            document.getElementById("minrstD").innerText = "$" + minrstD.toFixed(5);
        }
    if ((isNaN(hourrstD))||!(isFinite(hourrstD))) {
        document.getElementById("hourrstD").innerText = "【Değersiz】"}
        else {
            document.getElementById("hourrstD").innerText = "$" + hourrstD.toFixed(5);
        }
    if ((isNaN(dayrstD))||!(isFinite(dayrstD))) {
        document.getElementById("dayrstD").innerText = "【Değersiz】"}
        else {
            document.getElementById("dayrstD").innerText = "$" + dayrstD.toFixed(5);
        }
    if ((isNaN(weekrstD))||!(isFinite(weekrstD))) {
        document.getElementById("weekrstD").innerText = "【Değersiz】"}
        else {
            document.getElementById("weekrstD").innerText = "$" + weekrstD.toFixed(5);
        }
    if ((isNaN(monthrstD))||!(isFinite(monthrstD))) {
        document.getElementById("monthrstD").innerText = "【Değersiz】"}
        else {
            document.getElementById("monthrstD").innerText = "$" + monthrstD.toFixed(5);
        }
    if ((isNaN(yearrstD))||!(isFinite(yearrstD))) {
        document.getElementById("yearrstD").innerText = "【Değersiz】"}
        else {
            document.getElementById("yearrstD").innerText = "$" + yearrstD.toFixed(5);
        }
//ROLLERTOKEN HESAPLAMA ARACI//
    var rltPower = ((Number(totalRate)/1000))
        rltPrice1 = document.getElementById('rlt-price').innerHTML
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
        document.getElementById("minRlt").innerText = "【⛏】"}
        else {
            document.getElementById("minRlt").innerText = minRlt.toFixed(10);
        }
    if ((isNaN(hourRlt))||!(isFinite(hourRlt))) {
        document.getElementById("hourRlt").innerText = "【⛏】"}
        else {
            document.getElementById("hourRlt").innerText = hourRlt.toFixed(10);
        }
    if ((isNaN(dayRlt))||!(isFinite(dayRlt))) {
        document.getElementById("dayRlt").innerText = "【⛏】"}
        else {
            document.getElementById("dayRlt").innerText = dayRlt.toFixed(10);
        }
    if ((isNaN(weekRlt))||!(isFinite(weekRlt))) {
        document.getElementById("weekRlt").innerText = "【⛏】"}
        else {
            document.getElementById("weekRlt").innerText = weekRlt.toFixed(10);
        }
    if ((isNaN(monthRlt))||!(isFinite(monthRlt))) {
        document.getElementById("monthRlt").innerText = "【⛏】"}
        else {
            document.getElementById("monthRlt").innerText = monthRlt.toFixed(10);
        }
    if ((isNaN(yearRlt))||!(isFinite(yearRlt))) {
        document.getElementById("yearRlt").innerText = "【⛏】"}
        else {
            document.getElementById("yearRlt").innerText = yearRlt.toFixed(10);
        }
    if ((isNaN(minRltD))||!(isFinite(minRltD))) {
        document.getElementById("minRltD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("minRltD").innerText = "$" + minRltD.toFixed(5);
        }
    if ((isNaN(hourRltD))||!(isFinite(hourRltD))) {
        document.getElementById("hourRltD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("hourRltD").innerText = "$" + hourRltD.toFixed(5);
        }
    if ((isNaN(dayRltD))||!(isFinite(dayRltD))) {
        document.getElementById("dayRltD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("dayRltD").innerText = "$" + dayRltD.toFixed(5);
        }
    if ((isNaN(weekRltD))||!(isFinite(weekRltD))) {
        document.getElementById("weekRltD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("weekRltD").innerText = "$" + weekRltD.toFixed(5);
        }
    if ((isNaN(monthRltD))||!(isFinite(monthRltD))) {
        document.getElementById("monthRltD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("monthRltD").innerText = "$" + monthRltD.toFixed(5);
        }
    if ((isNaN(yearRltD))||!(isFinite(yearRltD))) {
        document.getElementById("yearRltD").innerText = "【Önce Hesapla】"}
        else {
            document.getElementById("yearRltD").innerText = "$" + yearRltD.toFixed(5);
        }
    }
    