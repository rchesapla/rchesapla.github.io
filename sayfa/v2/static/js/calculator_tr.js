var calc = function () {
    // 1. Yardımcı Fonksiyonlar ve Parse İşlemleri
    const getValue = (id) => Number(document.getElementById(id)?.value) || 0;
    const getText = (id) => Number(document.getElementById(id)?.innerText?.replace(',', '.')) || 0;
    
    // Fiyat metninden para birimi simgelerini ve noktaları temizleyip sayıya çevirir
    const getPrice = (id) => {
        const raw = document.getElementById(id)?.innerText || "0";
        const cleaned = raw.replace(/[^\d,-]/g, '').replace(',', '.');
        return Number(cleaned) || 0;
    };

    // DOM Alanlarını Güncelleme
    const updateField = (id, val, isCurrency = false) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (isNaN(val) || !isFinite(val)) {
            el.innerText = isCurrency ? "∙•●₺●•∙" : "【⛏】";
        } else {
            el.innerText = isCurrency ? "₺" + val.toFixed(5) : val.toFixed(10);
        }
    };

    // 2. Genel Toplam Hesaplamaları
    const totalRate = getValue("minerRate");
    const totalRateEl = document.getElementById("totalRate");
    if (totalRateEl) totalRateEl.innerText = totalRate.toFixed(3);

    const coins = ['Btc', 'Doge', 'Eth', 'bnb', 'matic', 'sol', 'trx', 'ltc'];
    
    const totalNet = coins.reduce((acc, coin) => acc + getValue("net" + coin), 0);
    const totalNetEl = document.getElementById("totalNet");
    if (totalNetEl) totalNetEl.innerText = totalNet.toFixed(3);

    // 3. Coin Bazlı Dinamik Hesaplama Döngüsü
    coins.forEach(coin => {
        const coinLower = coin.toLowerCase();
        const power = totalRate / 1000;
        const netPower = getValue("net" + coin);
        const price = getPrice(`${coinLower}-price-api`);

        // Block ödülü alma (BTC için 10^8 bölme kuralı dahil)
        let blockReward = getText("block" + coin);
        if (coin === 'Btc') blockReward /= 100000000;

        // Kazanç Hesaplamaları
        const minCoin = (netPower > 0) ? (power * blockReward) / (netPower * 1000) : 0;
        const hourCoin = minCoin * 6;
        const dayCoin = hourCoin * 24;
        const weekCoin = dayCoin * 7;
        const monthCoin = dayCoin * 30;
        const yearCoin = dayCoin * 365;

        // Miktar (Kripto) Güncellemeleri
        updateField("min" + coin, minCoin);
        updateField("hour" + coin, hourCoin);
        updateField("day" + coin, dayCoin);
        updateField("week" + coin, weekCoin);
        updateField("month" + coin, monthCoin);
        updateField("year" + coin, yearCoin);

        // Değer (TL/Para Birimi) Güncellemeleri
        updateField("min" + coin + "D", minCoin * price, true);
        updateField("hour" + coin + "D", hourCoin * price, true);
        updateField("day" + coin + "D", dayCoin * price, true);
        updateField("week" + coin + "D", weekCoin * price, true);
        updateField("month" + coin + "D", monthCoin * price, true);
        updateField("year" + coin + "D", yearCoin * price, true);
    });
};