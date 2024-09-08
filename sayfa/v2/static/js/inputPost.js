function getData(field) {
    var field2 = document.getElementById(field).value

    fetch('/input_data/'+field, {
        method: 'POST',
        body: JSON.stringify({ [field]: field2 })
    }).then(response => {
    });
}
