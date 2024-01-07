let baseUrl = "https://hamband.math.sharif.edu/volunteer/api/v2";
let key = "mecaenizajocjutebyeckrewtaegckor";

var loadingInterval;

function performDeleteRequest(url, params) {
    url = baseUrl + url;
    params["api_key"] = key;
    var target = new URL(url);
    target.search = new URLSearchParams(params).toString();

    return new Promise(function (resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", target, true);
        xhttp.responseType = "json";
        xhttp.onload = function() {
            if (xhttp.status == 200) {
                resolve(xhttp.response);
            }
            else {
                reject(xhttp.status);
            }
        };
        xhttp.send();
    });
}

function getSearchParam(key) {
    if (window.location.search == "" || window.location.search == "?") {
        return null;
    }
    var list = window.location.search.split("?")[1].split("&");
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item == key) {
            return "";
        }
        if (item.startsWith(key + "=")) {
            return item.replace(key + "=", "");
        }
    }
    return null;
}

function isEdit() {
    var editKey = getSearchParam("edit_key");
    if (editKey == null) {
        return false;
    }
    if (editKey == "") {
        return false;
    }
    return true;
}

async function onLoad() {
    enableLoading();
    if (isEdit()) {
        var editKey = getSearchParam("edit_key");
        var queryUrl = "/delete";
        var queryParams = {
            edit_key: editKey
        };
        try {
            var result = await performDeleteRequest(queryUrl, queryParams);
            if (result["status"] == "delete_ok") {
                handleSubmissionSuccess();
            }
            else {
                handleSubmissionError();
            }
        }
        catch (e) {
            handleSubmissionError();
        }
    }
    else {
        handleSubmissionError();
    }
    disableLoading();
}

function handleSubmissionSuccess() {
    document.getElementById("success").classList.remove("hidden");
}

function handleSubmissionError() {
    document.getElementById("fail").classList.remove("hidden");
}

function enableLoading() {
    document.getElementById("loading-indicator").classList.remove("hidden");
    loadingInterval = setInterval(function() {
        var t = document.getElementById("loading-dots").innerText;
        t += "·";
        t = t.replace("····", "·");
        document.getElementById("loading-dots").innerText = t;
    }, 800);
}

function disableLoading() {
    clearInterval(loadingInterval);
    document.getElementById("loading-indicator").classList.add("hidden");
}

onLoad();