// Coin Tanımları (Coingecko ID'leri ve DOM Prefix'leri)
const COIN_CONFIG = [
  { id: 'bitcoin', key: 'btc' },
  { id: 'dogecoin', key: 'doge' },
  { id: 'ethereum', key: 'eth' },
  { id: 'binancecoin', key: 'bnb' },
  { id: 'polygon-ecosystem-token', key: 'matic' },
  { id: 'solana', key: 'sol' },
  { id: 'tether', key: 'rlt' }, // RLT/USDT karşılığı
  { id: 'tron', key: 'trx' }
];

const PERIODS = ['min', 'hour', 'day', 'week', 'month', 'year'];

const fetchData = async () => {
  const ids = COIN_CONFIG.map(c => c.id).join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Hata! Statü: ${response.status}`);
    
    const data = await response.json();
    const prices = getResults(data);
    
    postResults(prices);
    calculate(prices);
  } catch (err) {
    console.error('Fetch Hatası:', err);
  }
};

const getResults = (data) => {
  const prices = {};
  COIN_CONFIG.forEach(coin => {
    // API'den veri gelmezse 0 kabul et
    prices[coin.key] = data?.[coin.id]?.usd || 0;
  });
  return prices;
};

const postResults = (prices) => {
  COIN_CONFIG.forEach(coin => {
    const el = document.getElementById(`${coin.key}-price-api`);
    if (el) {
      el.innerText = `$${prices[coin.key]}`;
    }
  });
};

const calculate = (prices) => {
  COIN_CONFIG.forEach(coin => {
    const coinPrice = prices[coin.key];

    PERIODS.forEach(period => {
      // Örn: minBtc, hourEth, dayTrx vb.
      const inputId = `${period}${capitalize(coin.key)}`;
      // Örn: minBtcD, hourEthD, dayTrxD vb.
      const outputId = `${inputId}D`;

      const inputEl = document.getElementById(inputId);
      const outputEl = document.getElementById(outputId);

      if (inputEl && outputEl) {
        const rawValue = inputEl.innerHTML.trim();
        const amount = Number(rawValue);
        const totalUsd = amount * coinPrice;

        if (isNaN(totalUsd) || rawValue === "") {
          outputEl.innerText = "∙•●$●•∙";
        } else {
          outputEl.innerText = `$${totalUsd.toFixed(5)}`;
        }
      }
    });
  });
};

// Yardımcı Fonksiyon: 'btc' -> 'Btc' dönüştürür (DOM ID uyumu için)
const capitalize = (str) => {
  if (str === 'rlt') return 'Rlt'; // Rlt camelCase özel durumu
  if (str === 'bnb' || str === 'matic' || str === 'sol') {
    // HTML'deki id'lerinize uygun olarak (minbnb, minmatic vb.) küçük harf bırakılır
    return str; 
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// İlk tetikleme ve Periyodik Yenileme (5 saniye)
fetchData();
setInterval(fetchData, 5000);