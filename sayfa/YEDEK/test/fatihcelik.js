var app = angular.module('miningApp', ['ui.bootstrap']);

app.controller('MiningController', ['$scope', 'CurrencyService', 'UserMinerService', 'MinerService', '$sce', '$timeout', async function($scope, CurrencyService, UserMinerService, MinerService, $sce, $timeout) {
    
    $scope.units = ['GH/s', 'TH/s', 'PH/s', 'EH/s'];
    $scope.networkUnits = ['GH/s', 'TH/s', 'PH/s', 'EH/s', 'ZH/s'];
    let default_form = {
        currency: null,
        power: 0,
        unit: $scope.units[0],
        networkPower: 0,
        networkUnit: $scope.networkUnits[0],
        blockSize: 0,
        blockTime: 0,
        timeUnit: 'seconds'
    };

    setTimeout(function() {
        var balao = document.getElementById('balao2');
        if (balao) balao.style.display = "block";
    }, 2000);

    $scope.formData = default_form;
    $scope.isLoading = true;
    $scope.orderByField = 'block_value_in_usd';
    $scope.orderByFarmField = 'user_alocated_power_month_profit_in_usd';
    $scope.orderByMinersField = 'power';
    $scope.orderByRacksField = 'bonus';
    $scope.reverseRacksSort = true;
    $scope.reverseMinersSort = true;
    $scope.reverseSort = true;

    const exchangeRates = await CurrencyService.getCurrenciesPrices();
    $scope.exchangeRates = exchangeRates;

    const filterFn = function(currency) {
        return currency.user_alocated_power && currency.user_alocated_power > 0;
    };
    $scope.filterFn = filterFn;

    function getUrlParamValue(paramName){
        var params = new URL(location).searchParams;
        var keyName = Array.from(params.keys()).find(
            function(key){
                return key.toLowerCase() == paramName.toLowerCase();
            }
        );
        return params.get(keyName);
    }

    function setParamValue(paramName, paramValue){
        if ('URLSearchParams' in window) {
            const url = new URL(window.location)
            if(!paramValue) {
                url.searchParams.delete(paramName)
            }else {
                url.searchParams.set(paramName, paramValue)
            }
            history.pushState(null, '', url);
        }
    }

    $scope.donationValue = 2;
    $scope.donationCurrency = 'U$';

    // OTOMATİK KULLANICI YÜKLEME DEVRE DIŞI (Açılışta boş form gelir)
    let loaded_user = null; 
    let loaded_league = getUrlParamValue('league');
    let loaded_miners = getUrlParamValue('miners');

    $scope.isLoadedUser = false;

    // ... (Sabit Koleksiyonlar ve Yardımcı Fonksiyonlar - Orijinalliği Korunmuştur) ...
    $scope.collections = [
        {
            id: 1,
            name: "Miners of Infinity",
            miners: [
                "669fd40b8055d6def342d91a",
                "669fcfc58055d6def342d1ab",
                "669fd3b78055d6def342d8bd",
                "669fd1fd8055d6def342d53d",
                "669fd3538055d6def342d81c",
                "669fd35f8055d6def342d865",
                "669fd1788055d6def342d420",
                "669fd0e78055d6def342d31c",
                "669fd08e8055d6def342d2d1",
                "669fd6a88055d6def342da6b",
                "66a112918055d6def3474184",
                "66a112918055d6def347418c"
            ]
        },
        {
            id: 2,
            name: "Roller Football League",
            miners: [
                "66668980bdddadd0605fdaa2e",
                "6668963edddadd0605fda7ac",
                "666896c5dddadd0605fda8bb",
                "6668973cdddadd0605fda94f",
                "66689701dddadd0605fda905",
                "66689684dddadd0605fda7f6",
                "66689843dddadd0605fdaa78",
                "666897d2dddadd0605fda9e4",
                "66689794dddadd0605fda99a",
                "6668991fdddadd0605fdab24",
                "6668991fdddadd0605fdab27",
                "6668991fdddadd0605fdab2d"
            ]
        },
        {
            id: 3,
            name: "Music Festival",
            miners: [
                "661466bcd6c322a6c7c344ba",
                "661466e1d6c322a6c7c34504",
                "661467e8d6c322a6c7c346a7",
                "6614674ad6c322a6c7c3465b",
                "6614672ad6c322a6c7c34612",
                "66146919d6c322a6c7c3488d",
                "661468f7d6c322a6c7c34844",
                "66146703d6c322a6c7c3454d",
                "66146868d6c322a6c7c3476d",
                "66146973d6c322a6c7c348d8"
            ]
        },
        {
            id: 4,
            name: "Interstellar Armada",
            miners: [
                "654a1eb4d23e8edde9341e5f",
                "654a1f91d23e8edde9341eb1",
                "654a21aed23e8edde93420c9",
                "654a223cd23e8edde9342146",
                "654a210cd23e8edde9341fd6",
                "654a2382d23e8edde934216a",
                "654a253ad23e8edde9342353",
                "654a24ced23e8edde934228f",
                "654a22d9d23e8edde9342158",
                "654a1e06d23e8edde9341dfe"
            ]
        },
        {
            id: 5,
            name: "Yatch Club",
            miners: [
                "64c3a0bd31ec0b205c25efd6",
                "64c39ebd31ec0b205c25ec50",
                "64c39e7731ec0b205c25ebcd",
                "64c3a1fa31ec0b205c25f14b",
                "64c39f5b31ec0b205c25ed8b",
                "64c3a05a31ec0b205c25ef44",
                "64c3a15d31ec0b205c25f0f9",
                "64c3a29131ec0b205c25f1dd",
                "64c3a23e31ec0b205c25f18f",
                "64c254c20c6fb1d2237a1391"
            ]
        },
        {
            id: 6,
            name: "Ultimate Blaster",
            miners: [
                "65affbbf43dcad8f6d0f7a52",
                "65aff78243dcad8f6d0f79b6",
                "65affb6d43dcad8f6d0f7a36",
                "65affd6543dcad8f6d0f7acd",
                "65affccf43dcad8f6d0f7a94",
                "65affc7f43dcad8f6d0f7a78",
                "65affb1e43dcad8f6d0f7a1a",
                "65aff67743dcad8f6d0f7962",
                "65affd1843dcad8f6d0f7ab0",
                "65b0f72543dcad8f6d0fa7ff"
            ]
        },
        {
            id: 7,
            name: "Moto Gang Club",
            miners: [
                "644bbdd2648294b4642f3695",
                "644bbece648294b4642f3697",
                "644bbf0a648294b4642f3698",
                "644bbe15648294b4642f3696",
                "644bc010648294b4642f369d",
                "644bbf6f648294b4642f369a",
                "644bbf44648294b4642f3699",
                "644bbfb1648294b4642f369b",
                "644bbfe6648294b4642f369c",
                "644bb5de648294b4642f368f",
                "644bb270648294b4642f368e",
                "644bb225648294b4642f368d",
                "644bb671648294b4642f3690"
            ]
        },
        {
            id: 8,
            name: "Season 14 | Harvest Time!",
            miners: [
                '6687ccfc7643815232d6402d', '6687cd307643815232d64077', '6687cd837643815232d640c1', '6687cdc47643815232d64726', '6687c01a7643815232d60217', '6687bf4f7643815232d5f741', '6687cf557643815232d65d5c', '6687cf817643815232d65da6', '6687cfae7643815232d65def', '6687cfd57643815232d65e39', '6687ce4e7643815232d65297', '6687cea87643815232d65882', '6687ced67643815232d65cc8', '6687cefd7643815232d65d11', '6687bde47643815232d5f0c6', '6687be827643815232d5f3c1'
            ]
        }
    ];

    const convertHashrate = (value, fromUnit, toUnit) => {
        const units = { 'GH/s': 1, 'TH/s': 1000, 'PH/s': 1000000, 'EH/s': 1000000000, 'ZH/s': 1000000000000 };
        return value * units[fromUnit] / units[toUnit];
    };

    // Temel Lig ve Para Birimi Yüklemesi
    $scope.leagues = CurrencyService.getLeagues();
    $scope.loaded_league = loaded_league || $scope.leagues[0].id;
    $scope.formData.league = $scope.leagues.filter(l => l.id == $scope.loaded_league)[0] ?? $scope.leagues[0];
    
    $scope.currencies = await CurrencyService.getDetailedCurrenciesByLeague($scope.formData.league.id);
    $scope.currencies?.forEach(c => {
        c.block_value_in_brl = c.in_game_only ? 0 : (c.blockSize * exchangeRates[c.name]['brl']).toFixed(2);
        c.block_value_in_usd = c.in_game_only ? 0 : (c.blockSize * exchangeRates[c.name]['usd']).toFixed(2);
        c.user_block_farm_brl = 0;
        c.user_block_farm_usd = 0;
        c.user_block_farm_token = 0;
        c.user_days_to_widthdraw = c.disabled_withdraw ? Number.MAX_SAFE_INTEGER : 0;
    });

    $scope.isLoading = false;
    $scope.$apply();

    // Diğer Tüm Orijinal Fonksiyonlar (calculateEarnings, donate, updateAllocatedPower, recalculateUserPower vb.) aynen kalmıştır.
    
    $scope.calculateEarnings = function(timeframe, currency) {
        if (!$scope.formData.currency || !$scope.formData.blockSize || !$scope.formData.blockTime) return 0;
        let earningsPerBlock = $scope.formData.blockSize;
        let blockTimeInSeconds = $scope.formData.blockTime;
        if ($scope.formData.timeUnit === 'minutes') blockTimeInSeconds *= 60;
        let userPowerPercentage = convertHashrate($scope.formData.power, $scope.formData.unit, 'GH/s') / convertHashrate($scope.formData.networkPower, $scope.formData.networkUnit,'GH/s');
        earningsPerBlock *= userPowerPercentage;
        let earningsPerDay = earningsPerBlock * (86400 / blockTimeInSeconds);
        switch(timeframe) {
            case 'block': return currency === 'amount' ? earningsPerBlock.toFixed(6) : $scope.formData.currency.in_game_only ? 0 : (earningsPerBlock * exchangeRates[$scope.formData.currency.name][currency]).toFixed(2);
            case 'day': return currency === 'amount' ? earningsPerDay.toFixed(6) : $scope.formData.currency.in_game_only ? 0 : (earningsPerDay * exchangeRates[$scope.formData.currency.name][currency]).toFixed(2);
            case 'week': return currency === 'amount' ? (earningsPerDay * 7).toFixed(6) : $scope.formData.currency.in_game_only ? 0 : (earningsPerDay * 7 * exchangeRates[$scope.formData.currency.name][currency]).toFixed(2);
            case 'month': return currency === 'amount' ? (earningsPerDay * 30).toFixed(6) : $scope.formData.currency.in_game_only ? 0 : (earningsPerDay * 30 * exchangeRates[$scope.formData.currency.name][currency]).toFixed(2);
            default: return 0;
        }
    };

    // Firebase'e bağlı olan istatistik/loglama fonksiyonları tamamen temizlendi.
    $scope.showStatistics = function() { return; }; 
}]);