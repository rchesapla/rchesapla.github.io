// Coin Tanımları ve DOM Takı (Suffix) Eşleşmeleri
const COINS = [
  { key: 'Btc', apiId: 'btc-price-api' },
  { key: 'Doge', apiId: 'doge-price-api' },
  { key: 'Eth', apiId: 'eth-price-api' },
  { key: 'bnb', apiId: 'bnb-price-api' },
  { key: 'matic', apiId: 'matic-price-api' },
  { key: 'sol', apiId: 'sol-price-api' },
  { key: 'Rlt', apiId: 'rlt-price-api' },
  { key: 'trx', apiId: 'trx-price-api' },
  { key: 'xrp', apiId: 'xrp-price-api' }
];

const PERIOD_MULTIPLIERS = {
  min: 1,
  hour: 6,         // 10'ar dakikalık bloklar üzerinden 1 saat = 6 blok
  day: 6 * 24,     // 1 gün = 144 blok
  week: 6 * 24 * 7,
  month: 6 * 24 * 30,
  year: 6 * 24 * 365
};

const getValue = (id) => {
  const el = document.getElementById(id);
  if (!el) return 0;
  // Input ise value, element ise innerText / innerHTML al
  const val = el.value !== undefined ? el.value : el.innerText;
  return Number(val) || 0;
};

const getPriceFromApiEl = (apiId) => {
  const el = document.getElementById(apiId);
  if (!el) return 0;
  const rawText = el.innerText || el.innerHTML || "";
  // "$123.45" -> 123.45
  const cleanText = rawText.replace(/[^0-9.-]+/g, "");
  return Number(cleanText) || 0;
};

const updateElementText = (id, value, isCurrency = false, decimals = 10) => {
  const el = document.getElementById(id);
  if (!el) return;

  if (isNaN(value) || !isFinite(value) || value <= 0) {
    el.innerText = "- - -";
  } else {
    const formatted = value.toFixed(decimals);
    el.innerText = isCurrency ? `$${formatted}` : formatted;
  }
};

const calc = () => {
  // 1. Toplam Mining Power Hesaplama
  const minerRate = getValue("minerRate");
  const totalRate = minerRate;

  const totalRateEl = document.getElementById("totalRate");
  if (totalRateEl) totalRateEl.innerText = totalRate.toFixed(3);

  // 2. Toplam Net Power Hesaplama (TRX dahil)
  let totalNet = 0;
  COINS.forEach(coin => {
    totalNet += getValue(`net${coin.key}`);
  });

  const totalNetEl = document.getElementById("totalNet");
  if (totalNetEl) totalNetEl.innerText = totalNet.toFixed(3);

  // 3. Her Coin İçin Madencilik Kazanç Hesaplamaları
  COINS.forEach(coin => {
    const dist = getValue(`dist${coin.key}`);
    const net = getValue(`net${coin.key}`);
    const block = getValue(`block${coin.key}`);
    const price = getPriceFromApiEl(coin.apiId);

    // Güç Payı (Power)
    const power = ((totalRate / 1000) * dist) / 100;

    // 10 Dakikalık Temel Kazanç (min)
    // Formula: (power * blockReward) / (netPower * 1000)
    const baseReward = (net > 0) ? (power * block) / (net * 1000) : 0;

    // Periyotların (min, hour, day, week, month, year) hesaplanması
    Object.keys(PERIOD_MULTIPLIERS).forEach(period => {
      const multiplier = PERIOD_MULTIPLIERS[period];
      const coinAmount = baseReward * multiplier;
      const usdValue = coinAmount * price;

      const coinElId = `${period}${coin.key}`;
      const usdElId = `${period}${coin.key}D`;

      // Coin miktarı (10 basamak hassasiyet)
      updateElementText(coinElId, coinAmount, false, 10);
      // Dolar karşılığı (5 basamak hassasiyet)
      updateElementText(usdElId, usdValue, true, 5);
    });
  });
};