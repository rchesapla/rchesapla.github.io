const fetchData = async () => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=polygon-ecosystem-token%2Csei-network%2Clitecoin%2Ctron%2Cbitcoin%2Cethereum%2Cdogecoin%2Cbinancecoin%2Ctether%2Cflow%2Csolana%2Calgorand&vs_currencies=usd',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }

    const data = await response.json();
    const prices = getResults(data);
    postResults(prices);
    calculate(prices);
  } catch (err) {
    console.log('Fetch Error :-S', err);
  }
};

const getResults = (fetch_data) => {
  return {
    btc: fetch_data.bitcoin?.usd,
    doge: fetch_data.dogecoin?.usd,
    eth: fetch_data.ethereum?.usd,
    bnb: fetch_data.binancecoin?.usd,
    matic: fetch_data["polygon-ecosystem-token"]?.usd,
    sol: fetch_data.solana?.usd,
    trx: fetch_data.tron?.usd,
    ltc: fetch_data.litecoin?.usd,
    algo: fetch_data.algorand?.usd,
  };
};

function formatPrice(val) {
  if (val === undefined || val === null || isNaN(val)) return val;
  return Number(val).toLocaleString('tr-TR');
}

const postResults = (prices) => {
  const elements = [
    { id: "btc-price-api", val: prices.btc },
    { id: "doge-price-api", val: prices.doge },
    { id: "eth-price-api", val: prices.eth },
    { id: "bnb-price-api", val: prices.bnb },
    { id: "matic-price-api", val: prices.matic },
    { id: "sol-price-api", val: prices.sol },
    { id: "trx-price-api", val: prices.trx },
    { id: "ltc-price-api", val: prices.ltc },
    { id: "algo-price-api", val: prices.algo }
  ];

  elements.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      el.innerHTML = "₺" + formatPrice(item.val);
    }
  });

  const timeEl = document.getElementById("last-update-time");
  if (timeEl) {
    const now = new Date();
    timeEl.innerHTML = `${now.toLocaleDateString('tr-TR')} ${now.toLocaleTimeString('tr-TR')}`;
  }
};

const calculate = (prices) => {
  const coins = ['Btc', 'Doge', 'Eth', 'bnb', 'matic', 'sol', 'trx', 'ltc', 'algo'];
  const periods = ['min', 'hour', 'day', 'week', 'month', 'year'];

  coins.forEach(coin => {
    const priceKey = coin.toLowerCase();
    const currentPrice = prices[priceKey];

    if (!currentPrice) return;

    periods.forEach(period => {
      const inputEl = document.getElementById(`${period}${coin}`);
      const outputEl = document.getElementById(`${period}${coin}D`);

      if (inputEl && outputEl) {
        const amount = Number(inputEl.innerHTML);
        const total = amount * currentPrice;

        if (isNaN(total)) {
          outputEl.innerText = "∙•●₺●•∙";
        } else {
          outputEl.innerText = total.toFixed(5);
        }
      }
    });
  });
};

fetchData();
setInterval(fetchData, 5000);