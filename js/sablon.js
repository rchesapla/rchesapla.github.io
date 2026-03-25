function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    document.getElementById('current-date').textContent = `${day}.${month}.${year}`;
}
setInterval(updateClock, 1000);
updateClock();

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert("Sistem güvenliği nedeniyle sağ tıklama devre dışı bırakılmıştır.");
});

document.onkeydown = function(e) {
    const forbiddenKeys = (
        e.keyCode == 123 || 
        (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || 
        (e.ctrlKey && e.keyCode == 85)
    );
    if (forbiddenKeys) {
        alert("Bu işlem sistem yöneticisi tarafından kısıtlanmıştır!");
        return false;
    }
};

const serviceApp = angular.module('miningApp', []);

serviceApp.service('CurrencyService', ['$http', function($http) {
    const current_date = new Date().toISOString().split('T')[0];
    const cacheValidity = 24 * 60 * 60 * 1000;
    const proxy = "https://morning-thunder-0ce3.wminerrc.workers.dev/?";

    this.getLeagues = () => [
        { "id": "68af01ce48490927df92d687", "name": "Bronze I" }, { "id": "68af01ce48490927df92d686", "name": "Bronze II" },
        { "id": "68af01ce48490927df92d685", "name": "Bronze III" }, { "id": "68af01ce48490927df92d684", "name": "Silver I" },
        { "id": "68af01ce48490927df92d683", "name": "Silver II" }, { "id": "68af01ce48490927df92d682", "name": "Silver III" },
        { "id": "68af01ce48490927df92d681", "name": "Gold I" }, { "id": "68af01ce48490927df92d680", "name": "Gold II" },
        { "id": "68af01ce48490927df92d67f", "name": "Gold III" }, { "id": "68af01ce48490927df92d67e", "name": "Platinum I" },
        { "id": "68af01ce48490927df92d67d", "name": "Platinum II" }, { "id": "68af01ce48490927df92d67c", "name": "Platinum III" },
        { "id": "68af01ce48490927df92d67b", "name": "Diamond I" }, { "id": "68af01ce48490927df92d67a", "name": "Diamond II" },
        { "id": "68af01ce48490927df92d679", "name": "Diamond III" }
    ];

    this.getDetailedCurrenciesByLeague = async function(league, forceRefresh = false) {
        const cacheKey = `rc_net_${league}`;
        if(!forceRefresh) {
            const cached = localStorage.getItem(cacheKey);
            const exp = localStorage.getItem(`${cacheKey}_exp`);
            if(cached && exp && (new Date().getTime() - exp < cacheValidity)) return JSON.parse(cached);
        }
        const configUrl = proxy + encodeURIComponent('https://rollercoin.com/api/wallet/get-currencies-config');
        const configRes = await $http.get(configUrl);
        const rawCurrencies = configRes.data.data.currencies_config.filter(c => c.is_can_be_mined);
        const detailed = [];
        for (const c of rawCurrencies) {
            const endpoints = ['block_reward', 'total_power', 'duration'];
            const results = await Promise.all(endpoints.map(type => 
                $http.get(proxy + encodeURIComponent(`https://rollercoin.com/api/league/network-info-by-day?from=${current_date}&to=${current_date}&currency=${c.balance_key}&groupBy=${type}&leagueId=${league}`))
            ));
            detailed.push({
                name: c.name, balance_key: c.balance_key,
                blockSize: ((results[0].data.data[0]?.value || 0) / c.divider) / c.to_small,
                networkPower: results[1].data.data[0]?.value || 0,
                blockTime: results[2].data.data[0]?.value || 600
            });
        }
        localStorage.setItem(cacheKey, JSON.stringify(detailed));
        localStorage.setItem(`${cacheKey}_exp`, new Date().getTime());
        return detailed;
    };
}]);

serviceApp.service('UserMinerService', ['$http', function($http) {
    this.getAllUserDataByNick = async function(nick) {
        const proxy = "https://morning-thunder-0ce3.wminerrc.workers.dev/?";
        const apiUser = `https://rollercoin.com/api/profile/public-user-profile-data/${nick}`;
        const resUser = await $http.get(proxy + encodeURIComponent(apiUser));
        if(!resUser.data.data) throw "Kullanıcı Yok";
        const resPower = await $http.get(proxy + encodeURIComponent(`https://rollercoin.com/api/profile/user-power-data/${resUser.data.data.avatar_id}`));
        return { powerData: resPower.data.data, leagueId: resUser.data.data.league_id };
    };
}]);

serviceApp.controller('MiningController', ['$scope', 'UserMinerService', 'CurrencyService', '$timeout', '$location',
function($scope, UserMinerService, CurrencyService, $timeout, $location) {

    // --- PAYLAŞILABİLİR LİNK MANTIĞI ---
    $scope.shareLink = "";
    
    // Sayfa ilk açıldığında URL'de ?user= parametresi var mı kontrol et
    const urlParams = new URLSearchParams(window.location.search);
    const sharedUser = urlParams.get('user');

    if (sharedUser) {
        $scope.userNick = sharedUser;
        // Kısa bir gecikme ile verileri otomatik çek
        $timeout(() => { $scope.fetchUserData(); }, 800);
    }

    $scope.getBestCoin = function() {
        if (!$scope.liveData || $scope.liveData.length === 0) return { name: '...' };
        return $scope.liveData.reduce((prev, current) => {
            let prevEfficiency = prev.blockSize / prev.networkPower;
            let currEfficiency = current.blockSize / current.networkPower;
            return (currEfficiency > prevEfficiency) ? current : prev;
        });
    };

    $scope.minWithdrawLimits = {
        'BTC': 0.00085, 'DOGE': 220, 'ETH': 0.014, 'BNB': 0.06, 'MATIC': 300,
        'SOL': 0.6, 'TRX': 300, 'LTC': 5, 'USDT': 0, 'XRP': 40, 'ALGO': 0, 'RLT': 0, 'RST': 0
    };

    $scope.convertToGh = function(value, unit) {
        if (!value) return 0;
        const units = { 'gh': 1, 'th': 1000, 'ph': 1000000, 'eh': 1000000000, 'zh': 1000000000000 };
        return value * (units[unit.toLowerCase()] || 1);
    };

    $scope.userBalances = {};
    $scope.activeDetail = null;

    $scope.toggleDetail = function(coinName) {
        $scope.activeDetail = ($scope.activeDetail === coinName) ? null : coinName;
    };

    $scope.calculateWithdrawTime = function(item) {
        if (!$scope.calcData || !$scope.calcData.myPower || $scope.calcData.myPower <= 0) return "Güç Girin";
        let myPowerGH = $scope.convertToGh($scope.calcData.myPower, $scope.calcData.myUnit);
        let netPowerGH = item.networkPower; 
        if (!myPowerGH || !netPowerGH || netPowerGH === 0) return "---";
        let blockReward = item.blockSize;
        let dailyBlocks = 86400 / (item.blockTime || 600);
        let dailyEarning = (myPowerGH / netPowerGH) * blockReward * dailyBlocks;
        let minLimit = $scope.minWithdrawLimits[item.name];
        let currentBalance = $scope.userBalances[item.name] || 0;
        if (!minLimit || minLimit === 0) return "---";
        let remainingAmount = minLimit - currentBalance;
        if (remainingAmount <= 0) return "Çekilebilir!";
        let totalDays = remainingAmount / dailyEarning;
        let years = Math.floor(totalDays / 365);
        let months = Math.floor((totalDays % 365) / 30);
        let days = Math.floor((totalDays % 365) % 30);
        let result = [];
        if (years > 0) result.push(years + " Yıl");
        if (months > 0) result.push(months + " Ay");
        if (days > 0 || result.length === 0) result.push(days + " Gün");
        return result.join(", ");
    };

    $scope.formatPower = function(power) {
        if (!power || power <= 0) return "0.00 GH/s";
        let units = ['GH/s', 'TH/s', 'PH/s', 'EH/s', 'ZH/s'];
        let unitIndex = 0;
        while (power >= 1000 && unitIndex < units.length - 1) {
            power /= 1000;
            unitIndex++;
        }
        return power.toFixed(2) + " " + units[unitIndex];
    };

    $scope.allUserStats = JSON.parse(localStorage.getItem('rc_user_stats')) || {};
    $scope.userHistory = JSON.parse(localStorage.getItem('rc_user_history')) || [];
    $scope.totalCalculations = 1420 + (parseInt(localStorage.getItem('rc_user_calculations')) || 0);
    $scope.isAuthorized = false; $scope.loadingLeague = false; $scope.loadingApi = false;
    $scope.liveData = []; $scope.lastUpdate = "Otomatik";
    $scope.leagues = CurrencyService.getLeagues();
    $scope.calcData = { fiat: 'usd', coin: 'RLT', leagueId: '68af01ce48490927df92d687', myPower: 0, myUnit: 'th', netPower: 0, netUnit: 'eh', reward: 0.88, blockTime: 10 };

    $scope.updateLeagueData = async function() {
        if (!$scope.calcData.leagueId) return;
        $scope.loadingLeague = true;
        try {
            const data = await CurrencyService.getDetailedCurrenciesByLeague($scope.calcData.leagueId, true);
            $timeout(() => { $scope.liveData = data; $scope.updateFromLiveData(); });
        } catch (e) { console.error(e); }
        finally { $scope.loadingLeague = false; $scope.$apply(); }
    };

    $scope.updateFromLiveData = () => {
        const coin = $scope.liveData.find(c => c.balance_key === $scope.calcData.coin || c.name === $scope.calcData.coin);
        if (coin) {
            $scope.calcData.reward = coin.blockSize;
            $scope.calcData.blockTime = coin.blockTime / 60;
            let rawNetPower = coin.networkPower; 
            if (rawNetPower >= 1000000000000) { $scope.calcData.netPower = parseFloat((rawNetPower / 1000000000000).toFixed(4)); $scope.calcData.netUnit = 'zh'; }
            else if (rawNetPower >= 1000000000) { $scope.calcData.netPower = parseFloat((rawNetPower / 1000000000).toFixed(4)); $scope.calcData.netUnit = 'eh'; }
            else if (rawNetPower >= 1000000) { $scope.calcData.netPower = parseFloat((rawNetPower / 1000000).toFixed(4)); $scope.calcData.netUnit = 'ph'; }
            else { $scope.calcData.netPower = parseFloat((rawNetPower / 1000).toFixed(4)); $scope.calcData.netUnit = 'th'; }
            const simdi = new Date();
            $scope.lastUpdate = simdi.toLocaleDateString('tr-TR') + " / " + simdi.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        }
    };

    $scope.fetchUserData = async function() {
        if(!$scope.userNick) return;
        $scope.loadingApi = true;
        try {
            const response = await UserMinerService.getAllUserDataByNick($scope.userNick);
            
            // --- Link Oluşturma ---
            const baseUrl = window.location.origin + window.location.pathname;
            $scope.shareLink = baseUrl + "?user=" + encodeURIComponent($scope.userNick);
            window.history.pushState({}, '', $scope.shareLink);
            // ---------------------

            if (!$scope.userHistory.includes($scope.userNick)) {
                $scope.userHistory.push($scope.userNick);
                localStorage.setItem('rc_user_history', JSON.stringify($scope.userHistory));
            }

            const powerData = response.powerData;
            let rawPower = parseFloat(powerData.current_power);
            if (rawPower >= 1000000000000) { $scope.calcData.myPower = parseFloat((rawPower / 1000000000000).toFixed(2)); $scope.calcData.myUnit = 'zh'; }
            else if (rawPower >= 1000000000) { $scope.calcData.myPower = parseFloat((rawPower / 1000000000).toFixed(2)); $scope.calcData.myUnit = 'eh'; }
            else if (rawPower >= 1000000) { $scope.calcData.myPower = parseFloat((rawPower / 1000000).toFixed(2)); $scope.calcData.myUnit = 'ph'; }
            else if (rawPower >= 1000) { $scope.calcData.myPower = parseFloat((rawPower / 1000).toFixed(2)); $scope.calcData.myUnit = 'th'; }
            else { $scope.calcData.myPower = rawPower; $scope.calcData.myUnit = 'gh'; }

            if(response.leagueId) { $scope.calcData.leagueId = response.leagueId; }
            $scope.isAuthorized = true; 
            await $scope.updateLeagueData();
        } catch(e) { alert("Kullanıcı bulunamadı veya profil gizli."); }
        finally { $scope.loadingApi = false; $scope.$apply(); }
    };

    $scope.calcular = async function() {
        $scope.loadingApi = true; 
        localStorage.setItem('rc_user_calculations', (parseInt(localStorage.getItem('rc_user_calculations')) || 0) + 1);
        $scope.totalCalculations++;
        const units = { gh: 0.001, th: 1, ph: 1000, eh: 1000000, zh: 1000000000 };
        const myTH = $scope.calcData.myPower * units[$scope.calcData.myUnit];
        const netTH = $scope.calcData.netPower * units[$scope.calcData.netUnit];
        const porBloque = (myTH / netTH) * $scope.calcData.reward;
        const daily = porBloque * (1440 / $scope.calcData.blockTime);
        const cgMap = { 'RLT':'tether','RST':'tether','BTC':'bitcoin','ETH':'ethereum','BNB':'binancecoin','MATIC':'polygon-ecosystem-token','LTC':'litecoin','DOGE':'dogecoin','SOL':'solana','TRX':'tron','XRP':'ripple','USDT':'tether','ALGO':'algorand' };
        const coinKey = cgMap[$scope.calcData.coin] || 'tether';

        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinKey}&vs_currencies=usd,try`);
            const prices = await res.json();
            const price = prices[coinKey][$scope.calcData.fiat];
            
            $timeout(() => {
                const s = $scope.calcData.fiat === 'try' ? '₺' : '$';
                document.getElementById('porBloque').innerText = porBloque.toFixed(10);
                document.getElementById('dia').innerText = daily.toFixed(8);
                document.getElementById('diaFiat').innerText = `${s}${(daily * price).toFixed(2)}`;
                document.getElementById('results').style.display = 'block';
                $scope.loadingApi = false;
            }, 100);
        } catch(e) { $scope.loadingApi = false; }
    };
}]);

// Matrix Arkaplan
const canvas = document.getElementById('matrix'), ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight, cols = Math.floor(w/20), drops = Array(cols).fill(1);
setInterval(() => {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'; ctx.fillRect(0,0,w,h);
    ctx.fillStyle = '#00ff88'; ctx.font = '15px monospace';
    for(let i=0; i<drops.length; i++) {
        ctx.fillText(Math.floor(Math.random()*2), i*20, drops[i]*20);
        if(drops[i]*20 > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}, 50);