alertDismiss = function(cate){
    if (cate == 'error') {
        var alert = document.getElementById('errorAlert');
        alert.style.display = "none";
    } else {
        var alert = document.getElementById('successAlert');
        alert.style.display = "none";
    }
}
