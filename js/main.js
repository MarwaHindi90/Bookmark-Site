var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var btn = document.getElementById("myBtn");
var results = document.getElementById("siteResult");
var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
var siteContainer;
if (localStorage.getItem("siteContainer") === null) {
    siteContainer = [];
} else {
    siteContainer = JSON.parse(localStorage.getItem("siteContainer"));
    displaySite()
}

btn.onclick = function() {
    if (!siteName.value || !siteUrl.value) {
        document.getElementsByClassName("show")[0].style.display = "block";
        document.getElementsByClassName("show")[1].style.display = "block";
    } else if (!siteUrl.value.match(regex)) {
        alert("Please Use a Valid URL");
    } else {
        addSite();
        displaySite();
        clearForm()
    }
}

function addSite() {
    var site = {
        name: siteName.value,
        url: siteUrl.value
    }
    siteContainer.push(site);
    localStorage.setItem("siteContainer", JSON.stringify(siteContainer));
}

function displaySite() {
    var col = "";
    for (var i = 0; i < siteContainer.length; i++) {
        col += `<div class="clearfix">
        <div class="clearfix result mb-2">
            <h3 class="float-left">` + siteContainer[i].name + `</h3>
            <a href="` + siteContainer[i].url + `" target="_blank" class="btn btn-primary">Visit</a>
            <button class="btn btn-danger mr-5" onclick="deleteSite(` + i + `)">Delete</button>
            </div>
         </div>`
    }
    results.innerHTML = col;
}

function deleteSite(id) {
    siteContainer.splice(id, 1);
    localStorage.setItem("siteContainer", JSON.stringify(siteContainer));
    displaySite();
}

function clearForm() {
    var inputs = document.getElementsByClassName("form-control");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}