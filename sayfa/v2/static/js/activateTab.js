function changeTab(btn) {
    var dataBtn = document.getElementById("data-tab-btn");
    var resultsBtn = document.getElementById("results-tab-btn");
    var tab1 = document.getElementById("tab1-content");
    var tab2 = document.getElementById("tab2-content");
    tab2.style.display = "None";
    tab1.style.display = "None";
    if (btn == 'data') {
        tab1.style.display = "grid";
        dataBtn.style.background = "#6e6b8f";
        resultsBtn.style.background = "none";
    } else {
        tab2.style.display = "block";
        resultsBtn.style.background = "#6e6b8f";
        dataBtn.style.background = "none";
    }
}