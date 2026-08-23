const { Block } = require("strip-comments/lib/Node");

console.log("Hello World");

function blockAmount() {
    // Returns pre-set block rewards based on block selected
    // Update if updated on rollercoin
    switch (document.getElementById("block-type").selectedIndex) {
        case 0:
            //Bitcoin - 30000
            var blockreward = 30000;
            document.getElementById("block-reward").value = 30000;
			document.getElementById("exp_reward").innerHTML = "⛏";
			document.getElementById("daily").innerHTML = "⛏";
			document.getElementById("weekly").innerHTML = "⛏";
			document.getElementById("monthly").innerHTML = "⛏";
			document.getElementById("yearly").innerHTML = "⛏";
            break;
        case 1:
            //Doge - 20
            var blockreward = 30;
            document.getElementById("block-reward").value = 30;
			document.getElementById("exp_reward").innerHTML = "⛏";
			document.getElementById("daily").innerHTML = "⛏";
			document.getElementById("weekly").innerHTML = "⛏";
			document.getElementById("monthly").innerHTML = "⛏";
			document.getElementById("yearly").innerHTML = "⛏";
            break;
        case 2:
            //Eth - 0.005
            var blockreward = 0.005;
            document.getElementById("block-reward").value = 0.005;
			document.getElementById("exp_reward").innerHTML = "⛏";
			document.getElementById("daily").innerHTML = "⛏";
			document.getElementById("weekly").innerHTML = "⛏";
			document.getElementById("monthly").innerHTML = "⛏";
			document.getElementById("yearly").innerHTML = "⛏";
            break;
        case 3:
            //Bnb - 0.012
            var blockreward = 0.012;
            document.getElementById("block-reward").value = 0.012;
			document.getElementById("exp_reward").innerHTML = "⛏";
			document.getElementById("daily").innerHTML = "⛏";
			document.getElementById("weekly").innerHTML = "⛏";
			document.getElementById("monthly").innerHTML = "⛏";
			document.getElementById("yearly").innerHTML = "⛏";
            break;
        case 4: 
            //Matic - 3
            var blockreward = 4;
            document.getElementById("block-reward").value = 4;
			document.getElementById("exp_reward").innerHTML = "⛏";
			document.getElementById("daily").innerHTML = "⛏";
			document.getElementById("weekly").innerHTML = "⛏";
			document.getElementById("monthly").innerHTML = "⛏";
			document.getElementById("yearly").innerHTML = "⛏";
            console.log("matic end");
            break;
        case 5: 
            //SOL - 0.05
            var blockreward = 0.07;
            document.getElementById("block-reward").value = 0.07;
			document.getElementById("exp_reward").innerHTML = "⛏";
			document.getElementById("daily").innerHTML = "⛏";
			document.getElementById("weekly").innerHTML = "⛏";
			document.getElementById("monthly").innerHTML = "⛏";
			document.getElementById("yearly").innerHTML = "⛏";
            console.log("sol end");
            break;
    default:
            //RLT - 30
            console.log("rlt start");
            var blockreward = 30;
            document.getElementById("block-reward").value = 30;
			document.getElementById("exp_reward").innerHTML = "⛏";
			document.getElementById("daily").innerHTML = "⛏";
			document.getElementById("weekly").innerHTML = "⛏";
			document.getElementById("monthly").innerHTML = "⛏";
			document.getElementById("yearly").innerHTML = "⛏";
            break;
    }
}

function showHashpowerHelp() {
    var x = document.querySelector("body > div.row.no-gutters.hashinput > div > div:nth-child(1) > img");
    if (x.classList.contains("hide")) {
        x.classList.remove("hide");
    } else {
        x.classList.add("hide");
    }
}

function supportMeToggle() {
    var x = document.querySelector("body > div.supportMe");
    if (x.classList.contains("hidden")) {
        x.classList.add("animate__animate", "animate__fadeInLeft");
        x.classList.remove("hidden");
        console.log("revealed SupportMe")
        // x.classList.add("animate__animated", "animate__bounceOutLeft"); 
    } else {
        x.classList.add("hidden");
        console.log("Hide SupportMe")
    }
}

function calculateGoalPower() {
    console.log("Calculate Begin");
    var netpower = parseFloat(document.getElementById("network-power").value);
    var goalpower = parseFloat(document.getElementById("goal-power").value);
    var blockreward = parseFloat(document.getElementById("block-reward").value);

    switch (document.getElementById("network-power-selector").selectedIndex) {
        case 0:
            netpower *= 1000000000;
            console.log("Netpower after ghs conversion: " + netpower);
            break;
        case 1:
            netpower *= 1000000000000;
            console.log("Netpower after ths conversion: " + netpower);
            break;
        case 2:
            netpower *= 1000000000000000;
            console.log("Netpower after phs conversion: " + netpower);
            break;
        default:
            netpower *= 1000000000000000000;
            console.log("Netpower after ehs conversion: " + netpower);
            break;
    }
    switch (document.getElementById("goal-power-selector").selectedIndex) {
        case 0:
            //GH/s
            goalpower *= 1000000000;
            console.log("goalpower after ghs conversion: " + goalpower);
            break;
        case 1:
            //TH/s
            goalpower *= 1000000000000;
            console.log("goalpower after ths conversion: " + goalpower);
            break;
        case 2:
            //PH/s
            goalpower *= 1000000000000000;
            console.log("goalpwer after phs conversion: " + goalpower);
            break;
        default:
            //EH/s
            goalpower *= 1000000000000000000;
            console.log("goalpwer after ehs conversion: " + goalpower);
            break;
    }
    console.log("Block: " + blockreward);
    var exp_reward = blockreward * (goalpower / netpower);

    console.log("exp. reward " + exp_reward.toFixed(4));

    //All timers are now the same 2021-04-19
    let blockInput = parseFloat(document.getElementById("block-timer").value);
    const BlockTimer = blockInput * 60;
    console.log("Blocktimer is: " + BlockTimer + ". (" + blockInput + " * 60");
    const secFullDay = 86400;

    const dailyBlocks = secFullDay / BlockTimer;
    console.log(exp_reward);

    switch (document.getElementById("block-type").selectedIndex) {
        case 0:
            document.getElementById("exp_reward").innerHTML = exp_reward.toFixed(4) + " SAT ⛏";
            var btcResult = (exp_reward * dailyBlocks).toFixed(4);
            document.getElementById("daily").innerHTML = btcResult + " SAT ⛏";
            document.getElementById("weekly").innerHTML = (btcResult * 7).toFixed(4) + " SAT ⛏";
            document.getElementById("monthly").innerHTML = (btcResult * 30).toFixed(4) + " SAT ⛏";
			document.getElementById("yearly").innerHTML = (btcResult * 365).toFixed(4) + " SAT ⛏";
            break;
        case 1:
            document.getElementById("exp_reward").innerHTML = exp_reward.toFixed(4) + " DOGE ⛏";
            var dogeResult = (exp_reward * dailyBlocks).toFixed(6);
            document.getElementById("daily").innerHTML = dogeResult + " DOGE ⛏";
            document.getElementById("weekly").innerHTML = (dogeResult * 7).toFixed(4) + " DOGE ⛏";
            document.getElementById("monthly").innerHTML = (dogeResult * 30).toFixed(4) + " DOGE ⛏";
			document.getElementById("yearly").innerHTML = (dogeResult * 365).toFixed(4) + " DOGE ⛏";
            break;
        case 2:
            document.getElementById("exp_reward").innerHTML = exp_reward.toFixed(8) + " ETH ⛏";
            var ethResult = (exp_reward * dailyBlocks).toFixed(8);
            document.getElementById("daily").innerHTML = ethResult + " ETH ⛏";
            document.getElementById("weekly").innerHTML = (ethResult * 7).toFixed(8) + " ETH ⛏";
            document.getElementById("monthly").innerHTML = (ethResult * 30).toFixed(8) + " ETH ⛏";
			document.getElementById("yearly").innerHTML = (ethResult * 365).toFixed(8) + " ETH ⛏";
            break;
        case 3:
            document.getElementById("exp_reward").innerHTML = exp_reward.toFixed(8) + " BNB ⛏";
            var bnbResult = (exp_reward * dailyBlocks).toFixed(8);
            document.getElementById("daily").innerHTML = bnbResult + " BNB ⛏";
            document.getElementById("weekly").innerHTML = (bnbResult * 7).toFixed(8) + " BNB ⛏";
            document.getElementById("monthly").innerHTML = (bnbResult * 30).toFixed(8) + " BNB ⛏";
			document.getElementById("yearly").innerHTML = (bnbResult * 365).toFixed(8) + " BNB ⛏";
            break;
        case 4:
            document.getElementById("exp_reward").innerHTML = exp_reward.toFixed(8) + " MATIC ⛏";
            var maticResult = (exp_reward * dailyBlocks).toFixed(8);
            document.getElementById("daily").innerHTML = maticResult + " MATIC ⛏";
            document.getElementById("weekly").innerHTML = (maticResult * 7).toFixed(8) + " MATIC ⛏";
            document.getElementById("monthly").innerHTML = (maticResult * 30).toFixed(8) + " MATIC ⛏";
			document.getElementById("yearly").innerHTML = (maticResult * 365).toFixed(8) + " MATIC ⛏";
            break;
        case 5:
            document.getElementById("exp_reward").innerHTML = exp_reward.toFixed(8) + " SOL ⛏";
            var solResult = (exp_reward * dailyBlocks).toFixed(8);
            document.getElementById("daily").innerHTML = solResult + " SOL ⛏";
            document.getElementById("weekly").innerHTML = (solResult * 7).toFixed(8) + " SOL ⛏";
            document.getElementById("monthly").innerHTML = (solResult * 30).toFixed(8) + " SOL ⛏";
			document.getElementById("yearly").innerHTML = (solResult * 365).toFixed(8) + " SOL ⛏";
            break;
        default:
            document.getElementById("exp_reward").innerHTML = exp_reward.toFixed(8) + " RLT ⛏";
            var rltResult = (exp_reward * dailyBlocks).toFixed(4);
            document.getElementById("daily").innerHTML = rltResult + " RLT ⛏";
            document.getElementById("weekly").innerHTML = (rltResult * 7).toFixed(4) + " RLT ⛏";
            document.getElementById("monthly").innerHTML = (rltResult * 30).toFixed(4) + " RLT ⛏";
			document.getElementById("yearly").innerHTML = (rltResult * 365).toFixed(4) + " RLT ⛏";
            break;
    }
}
