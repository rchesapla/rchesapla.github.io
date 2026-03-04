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