// const API_URL =
//   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin%2C%20matic-network%2C%20binancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false";
// const HTMLresponse = document.querySelector("#coins");
// const ul = document.createElement("ul");

// fetch(`${API_URL}`)
//   .then((response) => response.json())
//   .then((coins) => {
//     coins.forEach((coin) => {
//       let elem = document.createElement("li");
//       elem.appendChild(
//         document.createTextNode(
//           `${coin.name} - $${coin.current_price} icono: ${coin.image}`
//         )
//       );
//       ul.appendChild(elem);
//     });

//     HTMLresponse.appendChild(ul);
//   });

/* ----- Metodo alternativo para manipular DOM/ Hacer una petición a la API de  y mostrar los resultados en una lista ----- */
// fetch(`${API_URL}`)
//   .then((response) => response.json())
//   .then((coins) => {
//     const tmp = coins.map((coin) => `<li>${coin.name}</li>`);
//     HTMLresponse.innerHTML = `<ul>${tmp}</ul>`;
//   });

//Botones para consumir API
const btnDollar = document.getElementById("dollar");
const btnEuro = document.getElementById("euro");
// const btnCalcular = document.getElementById("btn-calcular");

//Inicializar
var crytocurrencies;

//Contadores
let clickDollar = 0;
let clickEuro = 0;

//Parametros de RESETBOARD
const moneda = ["dollar", "euro"];
const monedaSimbolo = ["$", "₺"];

//INICIALIZACION ARREGLOS DE PRECIOS PARA CONVERSION
const precioDollarMonedas = [];
const precioEuroMonedas = [];


//CONSULTA DOLARES API
let xhReq = new XMLHttpRequest();
xhReq.open(
  "GET",
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cdogecoin%2Cbinancecoin%2Csolana%2Cmatic-network&order=market_cap_desc&per_page=100&page=1&sparkline=false",
  false
);
xhReq.send(null);
let dataDollar = JSON.parse(xhReq.responseText);
console.log(dataDollar);
currentPriceDollar(dataDollar);

btnDollar.addEventListener("click", function () {
  if (clickDollar === 0) {
    resetBoard(dataDollar, moneda[0], monedaSimbolo[0]);
    clickDollar++;
  }
  Mostrar(moneda[0]);
});

//CONSULTA EUROS API
let euroReq = new XMLHttpRequest();
euroReq.open(
  "GET",
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=try&ids=bitcoin%2Cethereum%2Cdogecoin%2Cbinancecoin%2Csolana%2Cmatic-network&order=market_cap_desc&per_page=100&page=1&sparkline=false",
  false
);
euroReq.send(null);
let dataEuro = JSON.parse(euroReq.responseText);
console.log(dataEuro);
currenPriceEuro(dataEuro);

btnEuro.addEventListener("click", function () {
  if (clickEuro === 0) {
    resetBoard(dataEuro, moneda[1], monedaSimbolo[1]);
    clickEuro++;
  }
  Mostrar(moneda[1]);
});

//IMPRIMIR TABLA
function resetBoard(data, moneda, monedaSimbolo) {
  var $list = $(`#${moneda}-data`);
  $list.find(".crytocurrency").remove();
  const dataMoneda = [];

  for (let i = 0; i < 6; i++) {
    dataMoneda.push({
      name: data[i].name,
      symbol: data[i].symbol,
      current_price: data[i].current_price,
      price_change: data[i].price_change_percentage_24h,
      image: data[i].image,
    });
  }
  for (var i = 0; i < dataMoneda.length; i++) {
    var $item = $(
      "<tr class='text-center'>" +
        "<td>" +
        (i + 1) +
        "</td>" +
        "<td class='name'>" +
        "<img class='img__crypto' src='" +
        dataMoneda[i].image +
        "'/>" +
        "<span>" +
        dataMoneda[i].name +
        "</span>" +
        "<span class='symbol'>" +
        dataMoneda[i].symbol +
        "</span>" +
        "</td>" +
        // "<td class='symbol'>" + crytocurrencies[i].symbol + "</td>" +
        "<td>" +
        monedaSimbolo +
        " " +
        dataMoneda[i].current_price +
        "</td>" +
        "<td class=''>" +
        dataMoneda[i].price_change +
        "</td>" +
        // "<td class='image'>"+"<img class='img__crypto' src='"+ crytocurrencies[i].image+"'/>" + "</td>" +
        "</tr>"
    );
    dataMoneda[i].$item = $item;
    $list.append($item);
  }
}

//Mostrar y ocultas tablas
function Mostrar(moneda) {
  let elem = document.querySelector(`.tabla--${moneda}`);
  // let prom = document.querySelector(".prom");
  let textBtnMostrar = document.querySelector(".text-btn-mostrar");

  if (elem.classList.contains("hidden")) {
    elem.classList.remove("hidden");
    textBtnMostrar.innerHTML = "Gizlemek için düğmeye tıklayın!";
  } else {
    elem.classList.add("hidden");
    textBtnMostrar.innerHTML = "Coin fiyatlarını görmek için butona tıklayın!";
  }
}

//CALCULAR - ENTER
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    console.log(e);
    calculateGoalPower();
  }
});

//Conversion SATOSHI a BTC
function calculateBTC() {
  var satoshi = parseFloat(document.getElementById("satoshi-value").value);
  var btc = satoshi / 100000000;

  console.log(satoshi);

  console.log(btc);

  document.getElementById("btc-resultado").value = btc.toFixed(8);
}

function currentPriceDollar(data) {
  for (let i = 0; i < 6; i++) {
    precioDollarMonedas.push({
      name: data[i].name,
      current_price: data[i].current_price,
    });
  }
  console.log(precioDollarMonedas);
}

function currenPriceEuro(data) {
  for (let i = 0; i < 6; i++) {
    precioEuroMonedas.push({
      name: data[i].name,
      current_price: data[i].current_price,
    });
  }
  console.log(precioEuroMonedas);
}

//Conversion Cripto a USD/EUR
function calculated$() {
  let crypto = parseFloat(document.getElementById("btc-value").value);

  let btc_dolar = crypto * precioDollarMonedas[0].current_price;
  let eth_dolar = crypto * precioDollarMonedas[1].current_price;
  let bnb_dolar = crypto * precioDollarMonedas[2].current_price;
  let sol_dolar = crypto * precioDollarMonedas[3].current_price;
  let doge_dolar = crypto * precioDollarMonedas[4].current_price;
  let matic_dolar = crypto * precioDollarMonedas[5].current_price;

  let btc_euro = crypto * precioEuroMonedas[0].current_price;
  let eth_euro = crypto * precioEuroMonedas[1].current_price;
  let bnb_euro = crypto * precioEuroMonedas[2].current_price;
  let sol_euro = crypto * precioEuroMonedas[3].current_price;
  let doge_euro = crypto * precioEuroMonedas[4].current_price;
  let matic_euro = crypto * precioEuroMonedas[5].current_price;

  switch (document.getElementById("crypto-type").selectedIndex) {
    case 0:
      switch (document.getElementById("coin-type").selectedIndex) {
        case 0:
          document.getElementById("coin-resultado").value = btc_dolar.toFixed(2);
          break;
        default:
          document.getElementById("coin-resultado").value = btc_euro.toFixed(2);
          break;
      }
      break;
    case 1:
      switch (document.getElementById("coin-type").selectedIndex) {
        case 0:
          document.getElementById("coin-resultado").value = eth_dolar.toFixed(2);
          break;
        default:
          document.getElementById("coin-resultado").value = eth_euro.toFixed(2);
          break;
      }
      break;
    case 2:
      switch (document.getElementById("coin-type").selectedIndex) {
        case 0:
          document.getElementById("coin-resultado").value = bnb_dolar.toFixed(2);
          break;
        default:
          document.getElementById("coin-resultado").value = bnb_euro.toFixed(2);
          break;
      }
      break;
    case 3:
      switch (document.getElementById("coin-type").selectedIndex) {
        case 0:
          document.getElementById("coin-resultado").value = doge_dolar.toFixed(2);
          break;
        default:
          document.getElementById("coin-resultado").value = doge_euro.toFixed(2);
          break;
      }
      break;
	case 4:
      switch (document.getElementById("coin-type").selectedIndex) {
        case 0:
          document.getElementById("coin-resultado").value = matic_dolar.toFixed(2);
          break;
        default:
          document.getElementById("coin-resultado").value = matic_euro.toFixed(2);
          break;
      }
      break;
    default:
      switch (document.getElementById("coin-type").selectedIndex) {
        case 0:
          document.getElementById("coin-resultado").value = sol_dolar.toFixed(2);
          break;
        default:
          document.getElementById("coin-resultado").value = sol_euro.toFixed(2);
          break;
      }
      break;
  }
  console.log(crypto);
  console.log(btc_dolar);
}