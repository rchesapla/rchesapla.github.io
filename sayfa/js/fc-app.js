async function fetchCryptoPrices() {
    try {
        const cryptoIds = {
            BTC: 'bitcoin', ETH: 'ethereum', LTC: 'litecoin', BNB: 'binancecoin',
            POL: 'polygon-ecosystem-token', XRP: 'ripple', DOGE: 'dogecoin',
            TRX: 'tron', SOL: 'solana', ALGO: 'algorand', USDT: 'tether'
        };

        const ids = Object.values(cryptoIds).join(',');
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd,try`);
        if (!res.ok) throw new Error('Failed to fetch prices');

        const data = await res.json();

        for (const [sym, id] of Object.entries(cryptoIds)) {
            if (data[id]?.usd && !isNaN(data[id].usd) && data[id]?.try && !isNaN(data[id].try)) {
                cryptoPrices[sym] = {
                    usd: data[id].usd,
                    try: data[id].try
                };
            }
        }

        if (data.bitcoin?.usd && data.bitcoin?.try && data.bitcoin.try > 0) {
            tryToUsdRate = data.bitcoin.usd / data.bitcoin.try;
        }

        pricesLastUpdated = Date.now();

        if (currentLeague && Object.keys(networkPowers).length > 0) {
            displayEarnings();
        }

        updatePricesTable();
        updateWithdrawalsTable();
    } catch (e) {

    }
}

function initializePriceUpdates() {
    fetchCryptoPrices();
    setInterval(fetchCryptoPrices, 60_000);
}

function updateWithdrawalsTable() {
    const tableBody = document.getElementById('withdrawalsTableBody');

    if (!tableBody || !withdrawalMinimums) return;

    tableBody.innerHTML = '';

    const cryptosWithWithdrawal = Object.entries(withdrawalMinimums)
    .filter(([crypto]) => cryptoInfo[crypto])
    .sort(([a], [b]) => cryptoInfo[a].order - cryptoInfo[b].order);

    cryptosWithWithdrawal.forEach(([crypto, minAmount]) => {
        const info = cryptoInfo[crypto];
        const prices = cryptoPrices[crypto];
        const usdPrice = prices?.usd || 0;
        const tryPrice = prices?.try || (usdPrice && tryToUsdRate > 0 ? usdPrice / tryToUsdRate : 0);

        const usdValue = usdPrice > 0 ? minAmount * usdPrice : 0;
        const tryValue = tryPrice > 0 ? minAmount * tryPrice : 0;

        const row = document.createElement('tr');
        row.className = 'hover:bg-opacity-50 transition-all duration-200';

        row.innerHTML = `
            <td class="py-2 px-3">
                <div class="coin-name-mini">
                    <img src="crypto_icons/${crypto.toLowerCase()}.png" alt="${crypto}" class="coin-icon-mini" onerror="this.style.display='none';">
                    <span style="color: ${info.color.replace('[', '').replace(']', '')}; font-weight: 600;">${crypto}</span>
                </div>
            </td>
            <td class="py-2 px-3 text-center">
                <span class="withdrawal-value">${formatCryptoAmount(minAmount, crypto)}</span>
            </td>
            <td class="py-2 px-3 text-center">
                <span class="price-value">$${usdValue > 0 ? formatNumber(usdValue, null, false, 'usd') : 'N/A'}</span>
            </td>
            <td class="py-2 px-3 text-center">
                <span class="price-value">${tryValue > 0 ? '€' + formatNumber(tryValue, null, false, 'try') : 'N/A'}</span>
            </td>
        `;

        tableBody.appendChild(row);
    });

    if (cryptoInfo['ALGO']) {
        const info = cryptoInfo['ALGO'];
        const row = document.createElement('tr');
        row.className = 'hover:bg-opacity-50 transition-all duration-200';

        row.innerHTML = `
            <td class="py-2 px-3">
                <div class="coin-name-mini">
                    <img src="crypto_icons/algo.png" alt="ALGO" class="coin-icon-mini" onerror="this.style.display='none';">
                    <span style="color: ${info.color.replace('[', '').replace(']', '')}; font-weight: 600;">ALGO</span>
                </div>
            </td>
            <td class="py-2 px-3 text-center coming-soon-withdrawal" colspan="3">
                Withdrawable Soon
            </td>
        `;

        tableBody.appendChild(row);
    }
}