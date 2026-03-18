	
// Sağ Tıklama ve F12 Engelleme + Uyarı Mesajı
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert("Sistem güvenliği nedeniyle sağ tıklama devre dışı bırakılmıştır.");
});

document.onkeydown = function(e) {
    // Engellenecek tuş kombinasyonları
    const forbiddenKeys = (
        e.keyCode == 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || // Ctrl+Shift+I, J, C
        (e.ctrlKey && e.keyCode == 85) // Ctrl+U
    );

    if (forbiddenKeys) {
        alert("Bu işlem sistem yöneticisi tarafından kısıtlanmıştır!");
        return false;
    }
};
	
//////////////////////////////////////////////////////////////////////////
        const serviceApp = angular.module('miningApp', []);
        serviceApp.service('CurrencyService', ['$http', function($http) {
//////////////////////////////////////////////////////////////////////////

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
//////////////////////////////////////////////////////////////////////////
        serviceApp.service('UserMinerService', ['$http', function($http) {
//////////////////////////////////////////////////////////////////////////

            this.getAllUserDataByNick = async function(nick) {
                const proxy = "https://morning-thunder-0ce3.wminerrc.workers.dev/?";
                const apiUser = `https://rollercoin.com/api/profile/public-user-profile-data/${nick}`;
                const resUser = await $http.get(proxy + encodeURIComponent(apiUser));
                if(!resUser.data.data) throw "Kullanıcı Yok";
                const resPower = await $http.get(proxy + encodeURIComponent(`https://rollercoin.com/api/profile/user-power-data/${resUser.data.data.avatar_id}`));
                return { powerData: resPower.data.data, leagueId: resUser.data.data.league_id };
            };
        }]);
//////////////////////////////////////////////////////////////////////////
        serviceApp.controller('MiningController', ['$scope', 'UserMinerService', 'CurrencyService', '$timeout', 
        function($scope, UserMinerService, CurrencyService, $timeout) {
//////////////////////////////////////////////////////////////////////////















		
// Tüm kullanıcıların verilerini içeren objeyi al
$scope.allUserStats = JSON.parse(localStorage.getItem('rc_user_stats')) || {};
$scope.currentUserCalcs = 0;
		
		
$scope.logoutUser = function() {
    // Arayüzü sıfırla
    $scope.isAuthorized = false;
    
    // Formu temizle ve sonuçları gizle
    $scope.userNick = ""; 
    document.getElementById('results').style.display = 'none';
    
    // Küçük bir bildirim (isteğe bağlı)
    console.log("Oturum güvenli bir şekilde kapatıldı.");
};
		
		// IP Tabanlı Aktif Kullanıcı Simülasyonu
async function setupActiveUsers() {
    let ipHash = 0;
    try {
        // Kullanıcının IP adresini basit bir servisten alıyoruz
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        
        // IP adresini sayısal bir değere (hash) dönüştür
        ipHash = ipData.ip.split('.').reduce((acc, part) => acc + parseInt(part), 0);
    } catch (e) {
        // IP alınamazsa rastgele bir sayı ata
        ipHash = Math.floor(Math.random() * 500);
    }

    function updateCounter() {
        const now = new Date();
        const hour = now.getHours();
        
        // Saatlik yoğunluk çarpanı (Gece az, akşam çok kullanıcı)
        const hourlyMultiplier = [0.4, 0.3, 0.2, 0.2, 0.3, 0.5, 0.7, 0.9, 1.1, 1.2, 1.3, 1.4, 1.3, 1.2, 1.2, 1.3, 1.5, 1.8, 2.0, 2.2, 2.1, 1.8, 1.2, 0.8];
        
        // Baz rakam (IP'ye özel) + Saatlik yoğunluk + 10-50 arası anlık değişim
        const base = 400 + (ipHash % 200); 
        const variation = Math.floor(Math.random() * 40);
        const total = Math.floor((base * hourlyMultiplier[hour]) + variation);
        
        const element = document.getElementById('active-count');
        if (element) {
            element.innerText = total.toLocaleString();
        }
    }

    updateCounter();
    setInterval(updateCounter, 10000); // 10 saniyede bir güncelle
}

setupActiveUsers();
            
            $scope.userHistory = JSON.parse(localStorage.getItem('rc_user_history')) || [];
            $scope.totalCalculations = 1420 + (parseInt(localStorage.getItem('rc_user_calculations')) || 0);
            $scope.isAuthorized = false; $scope.loadingLeague = false; $scope.loadingApi = false;
            $scope.liveData = []; $scope.lastUpdate = "Otomatik";
            $scope.leagues = CurrencyService.getLeagues();
            $scope.calcData = { fiat: 'usd', coin: 'RLT', leagueId: '68af01ce48490927df92d687', myPower: 0, myUnit: 'th', netPower: 0, netUnit: 'eh', reward: 0.88, blockTime: 10 };

            $scope.quickFetch = (nick) => { $scope.userNick = nick; $scope.fetchUserData(); };
            $scope.removeFromHistory = (idx) => { $scope.userHistory.splice(idx, 1); localStorage.setItem('rc_user_history', JSON.stringify($scope.userHistory)); };

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
        
        // Ham ağ gücü (Sistemden Gh/s cinsinden gelebilir veya TH)
        // RollerCoin API genellikle ham değeri büyük gönderir.
        let rawNetPower = coin.networkPower; // Örn: 1.000.000.000 (1 EH)
        
        // Birim Otomatik Seçme Mantığı
        if (rawNetPower >= 1000000000000) { // Zettahash sınırı
            $scope.calcData.netPower = parseFloat((rawNetPower / 1000000000000).toFixed(4));
            $scope.calcData.netUnit = 'zh';
        } else if (rawNetPower >= 1000000000) { // Exahash sınırı
            $scope.calcData.netPower = parseFloat((rawNetPower / 1000000000).toFixed(4));
            $scope.calcData.netUnit = 'eh';
        } else if (rawNetPower >= 1000000) { // Petahash sınırı
            $scope.calcData.netPower = parseFloat((rawNetPower / 1000000).toFixed(4));
            $scope.calcData.netUnit = 'ph';
        } else {
            $scope.calcData.netPower = parseFloat((rawNetPower / 1000).toFixed(4));
            $scope.calcData.netUnit = 'th';
        }

        const simdi = new Date();
$scope.lastUpdate = simdi.toLocaleDateString('tr-TR') + " / " + simdi.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    }
	
$scope.updateROI = function() {
    const resultEl = document.getElementById('roiResult');
    if ($scope.calcData.minerCost > 0 && $scope.currentDailyFiat > 0) {
        const days = Math.ceil($scope.calcData.minerCost / $scope.currentDailyFiat);
        
        if (days > 3650) {
            resultEl.innerText = "10+ YIL";
        } else if (days > 365) {
            resultEl.innerText = (days / 365).toFixed(1) + " YIL";
        } else {
            resultEl.innerText = days + " GÜN";
        }
    } else {
        resultEl.innerText = "- GÜN";
    }
};
	
};

//////////////////////////////////////////////////////////////////////////
$scope.fetchUserData = async function() {
//////////////////////////////////////////////////////////////////////////
    if(!$scope.userNick) return;
    $scope.loadingApi = true;
    try {
        const response = await UserMinerService.getAllUserDataByNick($scope.userNick);
        // ... mevcut başarılı kodlar ...
        
        $scope.isAuthorized = true; 
        await $scope.updateLeagueData();
    } catch(e) {
        // alert yerine yeni fonksiyonu çağırıyoruz
        $scope.triggerError("Kullanıcı bulunamadı veya profil gizli!");
    }
    finally {
        $scope.loadingApi = false;
        $scope.$apply();
    }
};


// Kullanıcı verisinden birimleri otomatik seçme (KİŞİSEL GÜÇ İÇİN)
    $scope.fetchUserData = async function() {
	
	// fetchUserData fonksiyonunun içindeki try bloğuna ekle:
$scope.currentUserCalcs = $scope.allUserStats[$scope.userNick] || 0;
	
        if(!$scope.userNick) return;
        $scope.loadingApi = true;
        try {
            const response = await UserMinerService.getAllUserDataByNick($scope.userNick);
            
            // Geçmişe ekle
            if (!$scope.userHistory.includes($scope.userNick)) {
                $scope.userHistory.push($scope.userNick);
                localStorage.setItem('rc_user_history', JSON.stringify($scope.userHistory));
            }

            const powerData = response.powerData;
            let rawPower = parseFloat(powerData.current_power); // GH/s cinsinden

            if (rawPower >= 1000000000000) { // Zettahash
                $scope.calcData.myPower = parseFloat((rawPower / 1000000000000).toFixed(2));
                $scope.calcData.myUnit = 'zh';
            } else if (rawPower >= 1000000000) { // Exahash
                $scope.calcData.myPower = parseFloat((rawPower / 1000000000).toFixed(2));
                $scope.calcData.myUnit = 'eh';
            } else if (rawPower >= 1000000) { // Petahash
                $scope.calcData.myPower = parseFloat((rawPower / 1000000).toFixed(2));
                $scope.calcData.myUnit = 'ph';
            } else if (rawPower >= 1000) { // Terahash
                $scope.calcData.myPower = parseFloat((rawPower / 1000).toFixed(2));
                $scope.calcData.myUnit = 'th';
            } else { // Gigahash
                $scope.calcData.myPower = rawPower;
                $scope.calcData.myUnit = 'gh';
            }

            if(response.leagueId) { $scope.calcData.leagueId = response.leagueId; }
            $scope.isAuthorized = true; 
            await $scope.updateLeagueData();
        } catch(e) { alert("Kullanıcı bulunamadı."); }
        finally { $scope.loadingApi = false; $scope.$apply(); }
    };
//////////////////////////////////////////////////////////////////////////
            $scope.calcular = async function() {
//////////////////////////////////////////////////////////////////////////
				
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


// Kullanıcıya özel sayacı artır
    $scope.currentUserCalcs++;
    
    // Objeyi güncelle ve kaydet
    $scope.allUserStats[$scope.userNick] = $scope.currentUserCalcs;
    localStorage.setItem('rc_user_stats', JSON.stringify($scope.allUserStats));


                try {
                    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinKey}&vs_currencies=usd,try`);
                    if (!res.ok) throw new Error("API Limit");
                    const prices = await res.json();
                    const price = prices[coinKey][$scope.calcData.fiat];
// ROI Görünürlük ve Filtreleme Kontrolü
const isCrypto = !['RLT', 'RST', 'USDT'].includes($scope.calcData.coin);
const hasLeague = $scope.calcData.leagueId !== ""; // Lig seviyesi seçili mi kontrolü
const roiCard = document.getElementById('roiCard');

if (isCrypto && hasLeague) {
    roiCard.style.display = 'block';
    $scope.currentDailyFiat = daily * price; // ROI için günlük kazancı değişkene atar
    $scope.updateROI(); // Varsa eski değeri günceller
} else {
    roiCard.style.display = 'none'; // Şartlar sağlanmazsa (Manuel mod veya RLT/RST) gizle
}
                    $timeout(() => {
                        const s = $scope.calcData.fiat === 'try' ? '₺' : '$';
                        document.getElementById('porBloque').innerText = porBloque.toFixed(10);
                        document.getElementById('dia').innerText = daily.toFixed(8);
                        document.getElementById('hafta').innerText = (daily * 7).toFixed(6);
                        document.getElementById('mes').innerText = (daily * 30).toFixed(6);
                        document.getElementById('yil').innerText = (daily * 365).toFixed(4);
                        document.getElementById('diaFiat').innerText = `${s}${(daily * price).toFixed(2)}`;
                        document.getElementById('haftaFiat').innerText = `${s}${(daily * 7 * price).toFixed(2)}`;
                        document.getElementById('mesFiat').innerText = `${s}${(daily * 30 * price).toFixed(2)}`;
                        document.getElementById('yilFiat').innerText = `${s}${(daily * 365 * price).toFixed(2)}`;
                        document.getElementById('priceDisplay').innerText = `1 ${$scope.calcData.coin} ≈ ${s}${price.toFixed(4)}`;
                        document.getElementById('results').style.display = 'block';
                        $scope.loadingApi = false;
                    }, 100);
                }
				catch(e) { 
                    // Fiyat hatası durumunda bildirim ver ve tekrarla
                    $timeout(() => {
                        document.getElementById('results').style.display = 'block';
                        document.getElementById('priceDisplay').innerHTML = '<span style="color:#ff4444">Fiyat hatası! 3sn içinde tekrar deneniyor...</span>';
                    });
                    
                    $timeout(() => {
                        $scope.calcular(); 
                    }, 3000);
                }
            };
        }]);

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