var globalPagination = '';
var globalMinerArr = [];
var globalFilteredMinerArr = [];
var globalQueryFilter = {
    name: '',
    power: [],
    cells: new Set(),
    bonus: [],
    stars: new Set(),
    levels: new Set(),
}

const globalMiners = `1;RollerGirl Dream;220000;0.25;2;rollergirl_dream
1;The Nirvana;1080000;0;2;the_nirvana
1;Cup Of Glory Fairy;1550000;1;2;cup_of_glory
1;Oscamster;255500;0;1;oscamster
2;Oscamster;670740;0.5;1;oscamster
1;New Milano 2;1050000;0.5;2;new_milano_2
2;Heretic Opera Miner;1522500;1.08;2;heretic_opera_miner
1;Eclipse Energion;11800000;5.5;2;eclipse_energion
1;Rainbow Fairy;89600;0;2;631f7b818238ed283a235398
2;Rainbow Fairy;235200;0.55;2;631f7b818238ed283a235398
3;Rainbow Fairy;617400;1.66;2;631f7b818238ed283a235398
6;Rainbow Fairy;11167590;3.9;2;631f7b818238ed283a235398
1;Giftbox Pile;230000;0;2;6474a38830cd78b9cb76478c
2;Giftbox Pile;603750;0.82;2;6474a38830cd78b9cb76478c
3;Giftbox Pile;1584870;2.47;2;6474a38830cd78b9cb76478c
5;Giftbox Pile;10920840;3.87;2;6474a38830cd78b9cb76478c
1;Gandhi's Splittie;213600;0;2;6399c3541c483a58f70e9ae4
2;Gandhi's Splittie;560700;0.74;2;6399c3541c483a58f70e9ae4
3;Gandhi's Splittie;1471890;2.22;2;6399c3541c483a58f70e9ae4
5;Gandhi's Splittie;10142475;3.47;2;6399c3541c483a58f70e9ae4
1;Magma;210000;0;2;63d90be608311b97a96a9c2e
2;Magma;551250;0.73;2;63d90be608311b97a96a9c2e
5;Magma;9971640;3.4;2;63d90be608311b97a96a9c2e
1;Dragon Wing;815500;0;2;631b561ba775e04d9a285494
3;Dragon Wing;5619495;4.91;2;631b561ba775e04d9a285494
1;Sun-kissed Shores;825000;0;2;64a80c393fd5253fb80fa01a
3;Sun-kissed Shores;5684805;4.91;2;64a80c393fd5253fb80fa01a
1;Vinylla 78-RPM;152550;0;2;6399c3501c483a58f70e9a9e
2;Vinylla 78-RPM;400470;0.55;2;6399c3501c483a58f70e9a9e
3;Vinylla 78-RPM;1051260;1.66;2;6399c3501c483a58f70e9a9e
5;Vinylla 78-RPM;7244055;3.4;2;6399c3501c483a58f70e9a9e
1;Pencil-ReRoller;1136000;0;2;pencil_reroller
2;Pencil-ReRoller;2982000;1.64;2;pencil_reroller
3;Pencil-ReRoller;7827750;4.91;2;pencil_reroller
1;Earthbind;210000;0;2;63d90106547cfab9a2a43623
2;Earthbind;551250;0.73;2;63d90106547cfab9a2a43623
3;Earthbind;1447110;2.18;2;63d90106547cfab9a2a43623
5;Earthbind;9971640;3.4;2;63d90106547cfab9a2a43623
5;YMCA Game;5413590;2.6;2;6399c34b1c483a58f70e9a58
4;YMCA Game;2062305;2.08;2;6399c34b1c483a58f70e9a58
3;YMCA Game;785610;1.66;2;6399c34b1c483a58f70e9a58
2;YMCA Game;299250;0.55;2;6399c34b1c483a58f70e9a58
1;YMCA Game;114000;0;2;6399c34b1c483a58f70e9a58
1;SkullMiner;7900000;1;2;skullminer
1;Pumpkin King;1915000;1;2;pumpkin_king
1;CP-106;11106;0.5;1;cp_106
2;CP-106;29190;0.53;1;cp_106
3;CP-106;76650;0.55;1;cp_106
4;CP-106;201285;0.58;1;cp_106
1;The Turret;389000;0;1;the_turret
1;Aurora Citadel;9750000;5;2;aurora_citadel
1;The Big Boss;9200000;3.5;2;the_big_boss
1;Riding Free Relic;5000000;2.5;2;644bb671648294b4642f3690
3;JingleGrooveGram;4944240;3.27;2;jinglegroovegram
2;BTW-2024;4685625;7.3;2;btw_2024
3;The Big Top;4410000;4.91;2;the_big_top
3;Snake;4410000;3.27;2;snake
1;HoloIA Companion;2920000;1;2;holoia_companion
1;Muerte Miner;3000000;1;2;muerte_miner
2;Guess-the-Card;2835000;1.64;2;631f7b2c8238ed283a234f95
1;Guess-the-Card;1080000;0;2;631f7b2c8238ed283a234f95
3;Pacminer;2776935;1.96;2;pacminer
2;Pacminer;1057875;1.08;2;pacminer
1;Pacminer;403000;0.45;2;pacminer
6;Entminer;2743020;3.9;2;entminer
4;Entminer;398055;2.08;2;entminer
3;Entminer;151620;1.66;2;entminer
2;Entminer;57750;0.55;2;entminer
1;Entminer;22000;0;2;entminer
1;Brush'n'Palette;700000;0;2;brushnpalette
1;Sweet Memory Miner;560000;1.5;2;sweet_memory_miner
1;RollerMiner R4;6000;0.5;1;rollerminer_r4
3;Fallout Finder 55;4184040;4.21;2;fallout_finder_55`

class Pagination {
    constructor(currentPageNumber, itemPerPage, numberOfPages) {
        this.currentPageNumber = currentPageNumber;
        this.itemPerPage = itemPerPage;
        this.numberOfPages = numberOfPages;
        this.paginationHtmlTemplate = `
				<input class="pgnt-btn" type="button" id="firstPageButton" value="<<">
				<input class="pgnt-btn" type="button" id="previousPageButton" value="<"> 
				<span class="pageNumber" id="pageNumber">1 / ` + this.numberOfPages + `</span>            
				<input class="pgnt-btn" type="button" id="nextPageButton" value=">">
				<input class="pgnt-btn" type="button" id="lastPageButton" value=">>">`
    }

    // Moving the pagination state to the next page
    nextPage() {
        this.currentPageNumber =
            this.currentPageNumber++ < this.numberOfPages ?
            this.currentPageNumber++ :
            this.numberOfPages;
    }

    // Moving the pagination state to the last page
    lastPage() {
        this.currentPageNumber = this.numberOfPages;
    }

    // Moving the pagination state to the first page
    firstPage() {
        this.currentPageNumber = 1;
    }

    // Moving the pagination state to the preivous page
    previousPage() {
        this.currentPageNumber =
            this.currentPageNumber-- > 1 ?
            this.currentPageNumber-- :
            this.currentPageNumber = 1;
    }

    // Updating the value of the page number in the DOM
    updateHtmlPageNumber(numberOfRow) {
        this.numberOfPages = Math.ceil(numberOfRow / this.itemPerPage)
        if (this.numberOfPages > 1) {
            document.getElementById('pagination').style.visibility = 'visible'
            document.getElementById('pageNumber').innerHTML = '';
            document.getElementById('pageNumber').innerHTML = this.currentPageNumber + " / " + this.numberOfPages;
        } else {
            document.getElementById('pagination').style.visibility = 'hidden'
        }
    }

    // Getting the index of the first and last element of the page from the data set.
    getCurrentPageIndexes(numberOfRow) {

        if (numberOfRow == 0) {
            var endIndex = 0;
            var startIndex = 0;
        } else {
            var endIndex = this.currentPageNumber * this.itemPerPage;
            var startIndex = (this.currentPageNumber - 1) * this.itemPerPage;

            // If the current page is the last one
            if (this.currentPageNumber == this.numberOfPages) {
                endIndex = numberOfRow % this.itemPerPage == 0 ?
                    endIndex :
                    (startIndex + (numberOfRow % this.itemPerPage));
            }
        }
        return {
            "startIndex": startIndex,
            "endIndex": endIndex
        }
    }
}

function triggerSelect(selectId) {
    slct = document.getElementById(selectId);
    slct.trigger('onclick')
}

function show(val, cls) {
    const divId = '#' + cls;
    document.querySelector(divId).value = val;
}

// Building and rendering the html table of miners
function buildTable(m) {

    // Getting miners table
    var table = document.getElementById("minerTable")
    
    if (m.length == 0) {
        table.style.display = "none";
    } else {
        table.style.display = "block"
        // Removing table rows
        var trs = table.getElementsByClassName("minerrow")
        while (trs.length > 0) trs[0].parentNode.removeChild(trs[0]);

        // Getting table body
        var tableBody = table.tBodies[0];

        for (var i = 0; i < m.length; i++) {

            // Creating new tr element
            var tr = document.createElement('TR');
            tr.classList.add('minerrow');

            for (var j = 0; j < 6; j++) {

                // Creating new td element
                var td = document.createElement('TD');
                if (j == 5) {                    
                    imgUrl = "https://static.rollercoin.com/static/img/market/miners/"
                    imgUrl = imgUrl.concat(m[i][j])
                    imgUrl = imgUrl.concat('.gif?v=1.0.3');
                    img = document.createElement('IMG');
                    img.src = imgUrl;
                    img.width = 63;
                    img.height = 50;
                    img.alt = "Resim Yok" 
                    img.onerror="img/basic-miner.png"
                    td.appendChild(img);
                } else if (j == 2) {
                    td.appendChild(document.createTextNode(thousanize(m[i][j])));
                } else {
                    td.appendChild(document.createTextNode(m[i][j]));
                }
                tr.appendChild(td);
                tableBody.appendChild(tr);
            }
        }
        table.appendChild(tableBody);
    }
}

function main() {
    let pgm = [];
    let arr = globalMiners.split('\n');
    for (var i = 0; i < arr.length; i++) {
        row = arr[i].split(';');
        globalMinerArr.push(row);
    }

    // Initializing global filtered miners array with initial miner array
    globalFilteredMinerArr = globalMinerArr;

    // Initializing pagination object
    globalPagination = new Pagination(1, 6, Math.ceil(parseFloat(globalMinerArr.length / 6)));

    // Getting subset of miners to display according to the current page
    let indexes = globalPagination.getCurrentPageIndexes();
    for (let i = parseInt(indexes.startIndex); i < parseInt(indexes.endIndex); i++) {
        pgm.push(globalMinerArr[i]);
    }

    // Building html miners table with paginated data
    buildTable(pgm);

    // Adding onclick events
    let dropdown = document.getElementsByClassName('dropdown');
    for (let i = 0; i < dropdown.length; i++) {
        dropdown[i].onclick = function() {
            dropdown[i].classList.toggle('active');
        }
    }

    // Setting page number info in the html section of pagination
    globalPagination.updateHtmlPageNumber(globalMinerArr.length);

    // Setting number of miners listed 
    document.getElementById('miner-count-amount').textContent = globalMinerArr.length

}

// Loading the paginated table content according to 
// page number
function loadPage(numberOfRow, action) {
    let pgm = [];
    switch (action) {
        case 'next':
            globalPagination.nextPage();
            break;
        case 'previous':
            globalPagination.previousPage();
            break;
        case 'last':
            globalPagination.lastPage();
            break;
        case 'first':
            globalPagination.firstPage();
            break;
        default:
            console.log('forbidden action.');
    }

    // Getting subset of miners to display according to the current page
    let indexes = globalPagination.getCurrentPageIndexes(numberOfRow);
    for (let i = parseInt(indexes.startIndex); i < parseInt(indexes.endIndex); i++) {
        pgm.push(globalFilteredMinerArr[i]);
    }

    // Building html miners table with paginated data
    buildTable(pgm);

    // Updating page number in the pagination section
    globalPagination.updateHtmlPageNumber(numberOfRow);
}

function paginate(m, numberOfItemPerPage) {
    let pgm = [];
    let numberOfRow = m.length;
    globalPagination.itemPerPage = numberOfItemPerPage;
    globalPagination.currentPageNumber = 1;
    globalPagination.numberOfPages = Math.ceil(parseFloat(numberOfRow / numberOfItemPerPage));
    loadPage(numberOfRow, 'first');

    // Getting subset of miners to display according to the current page
    let indexes = globalPagination.getCurrentPageIndexes(numberOfRow);
    for (let i = parseInt(indexes.startIndex); i < parseInt(indexes.endIndex); i++) {
        pgm.push(m[i]);
    }

    // Building html miners table with paginated data
    buildTable(pgm);
}

// Cleaning all filter and rebuild table of miners in the default state.
function clearFilters() {
    // Re-initializing filtered miners with all miners
    globalFilteredMinerArr = globalMinerArr;

    // Removing number inputs controls value
    let input = document.getElementsByClassName('input');
    for (let i = 0; i < input.length; i++) {
        input[i].value = "";
    }

    // Setting all checkboxes into "unchecked" state
    let checkboxes = document.getElementsByClassName('checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }

    paginate(globalMinerArr, 6);
    globalQueryFilter.name = "";
    globalQueryFilter.power.length = 0;
    globalQueryFilter.bonus.length = 0;
    globalQueryFilter.cells.forEach(e => globalQueryFilter.cells.delete(e));
    globalQueryFilter.levels.forEach(e => globalQueryFilter.levels.delete(e));
    globalQueryFilter.stars.forEach(e => globalQueryFilter.stars.delete(e));
}

function applyFilters() {
    let m = globalMinerArr;

    // filtering on name
    if (globalQueryFilter.name != '') {
        m = m.filter(e => e[1].toUpperCase().indexOf(globalQueryFilter.name) > -1);
    }

    // filtering on cells
    if (globalQueryFilter.cells.size != 0) {
        m = m.filter(e => globalQueryFilter.cells.has(e[4]));
    }

    // filtering on stars
    if (globalQueryFilter.stars.size != 0) {
        m = m.filter(e => globalQueryFilter.stars.has(e[5]));
    }
    // filtering on levels
    if (globalQueryFilter.levels.size != 0) {
        m = m.filter(e => globalQueryFilter.levels.has(e[0]));
    }

    // filtering on power
    if (globalQueryFilter.power.length != 0) {
        m = m.filter(e => globalQueryFilter.power[0] <= e[2] && globalQueryFilter.power[1] >= e[2]);
    }

    // filtering on bonus
    if (globalQueryFilter.bonus.length) {
        m = m.filter(e => globalQueryFilter.bonus[0] <= e[3] && globalQueryFilter.bonus[1] >= e[3]);
    }

    globalFilteredMinerArr = m;
    return m;
}

// Sorts an array of 2 dimensions.
// The sorting order is given throu the "order" parameter.
// This parameter can have only 2 values : asc for ascending et desc for descending.
// if the value of ordering is different from what is expected,
// The array will not be filtered and leaev as it is.
// The array is sorted based on a specific column.
// The index of the column is given as parameter (index).
function sort2DimensionArray(arr, order, index) {
    let sorted = arr;
    if (order == "asc") {
        sorted.sort((a, b) => parseFloat(a[index]) - parseFloat(b[index]));
    } else if (order == "desc") {
        sorted.sort((a, b) => parseFloat(b[index]) - parseFloat(a[index]));
    }
    return sorted;
}

function sortMiners(arr, order, position) {
    let sorted = sort2DimensionArray(arr, order, position)
    itmPrPg = document.getElementById('txtBxPgntn').value;
    itmPrPg = itmPrPg == "" ? 6 : itmPrPg;
    paginate(sorted, itmPrPg);
}

function filterOnColumns(key) {

    // Getting number of items per page. 
    let itmPrPg = document.getElementById('txtBxPgntn').value;
    itmPrPg = itmPrPg == "" ? 12 : parseInt(itmPrPg);

    // Getting order of miners
    let order = document.getElementById('txtBxMrLss').value;
    order = order == "" ? "Güç: Yüksek - Düşük" : order;

    // Applying filters
    switch (key) {
        case 'name':
            let txtInput = document.getElementById("minerSearchInput").value.toUpperCase();
            globalQueryFilter.name = txtInput;
            paginate(applyFilters(), itmPrPg);
            break;
        case 'power':
            var filterLow = document.getElementById('powerRangeLow').value;
            var filterHigh = document.getElementById('powerRangeHigh').value;
            globalQueryFilter.power = [parseInt(filterLow), parseInt(filterHigh)];
            paginate(applyFilters(), itmPrPg);
            break;
        case 'cells':
            let clls = document.getElementsByClassName('checkboxCell');
            let cells = new Set();
            for (var i = 0; i < clls.length; i++) {
                if (clls[i].checked) {
                    cells.add(clls[i].id.substring(0, 1));
                } else {
                    cells.delete(clls[i].id.substring(0, 1));
                }
            }
            globalQueryFilter.cells = cells;
            paginate(applyFilters(), itmPrPg);
            break;
        case 'bonus':
            var filterLow = document.getElementById('bonusRangeLow').value;
            var filterHigh = document.getElementById('bonusRangeHigh').value;
            globalQueryFilter.bonus = [parseFloat(filterLow), parseFloat(filterHigh)];
            paginate(applyFilters(), itmPrPg);
            break;
        case 'stars':
            let strs = document.getElementsByClassName('checkboxStar');
            let stars = new Set();
            for (var i = 0; i < strs.length; i++) {
                if (strs[i].checked) {
                    stars.add(strs[i].id.substring(0, 1));
                } else {
                    stars.delete(strs[i].id.substring(0, 1));
                }
            }
            globalQueryFilter.stars = stars;
            paginate(applyFilters(), itmPrPg);
            break;
        case 'levels':
            let levels = new Set();
            let lvls = document.getElementsByClassName('level');
            for (var i = 0; i < lvls.length; i++) {
                if (lvls[i].checked) {
                    levels.add(lvls[i].id);
                } else {
                    levels.delete(lvls[i].id);
                }
            }
            globalQueryFilter.levels = levels;
            paginate(applyFilters(), itmPrPg);
            break;
        default:
            console.log('default');
            break;
    }

    // Applying ordering on miners after filtering
    switch (order) {
        case 'Güç: Yüksek - Düşük':
            sortMiners(globalFilteredMinerArr, 'desc', 2);
            break;
        case 'Güç: Düşük - Yüksek':
            sortMiners(globalFilteredMinerArr, 'asc', 2);
            break;
        case 'Bonus: Yüksek - Düşük':
            sortMiners(globalFilteredMinerArr, 'desc', 3);
            break;
        case 'Bonus: Düşük - Yüksek':
            sortMiners(globalFilteredMinerArr, 'asc', 3);
            break;
        default:
            console.log('default');
            break;
    }
}

function thousanize(number) {
    str = number.split('').reverse();
    fnl = [];
    for (var i = 0; i < str.length; i++) {

        if (i % 3 == 0) {
            fnl.push(' ');
        }
        fnl.push(str[i])
    }
    return fnl.reverse().join('');
}
main();
