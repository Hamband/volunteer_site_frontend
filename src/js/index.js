let baseUrl = "https://hamband.math.sharif.edu/volunteer/api/v1";
let key = "mecaenizajocjutebyeckrewtaegckor";

function performGetRequest(url, params) {
    params["api_key"] = key;
    var target = new URL(url);
    target.search = new URLSearchParams(params).toString();

    return new Promise(function (resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", target, true);
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

async function invokeCompletion() {
    var e = document.activeElement;
    if (e.tagName.toLowerCase() !== "input") {
        return;
    }
    if (!"completionType" in e.dataset) {
        return;
    }
    var queryUrl = baseUrl + "/get_completions/" + e.dataset["completionType"];
    var queryParams = {
        prefix: e.value,
        num: "10"
    }
    var response = await performGetRequest(queryUrl, queryParams);
    var dl = document.getElementById(e.id + "-dl");
    dl.replaceChildren();
    for (var i = 0; i < response.length; i++) {
        var child = document.createElement("option");
        child.value = response[i];
        dl.appendChild(child);
    }
}

function addFieldInput() {
    var fs = document.getElementById("fields");
    var lastIdx = fs.dataset["lastIdx"];
    var curIdx = parseInt(lastIdx) + 1;
    fs.dataset["lastIdx"] = curIdx;
//    var el = document.getElementById("field-" + lastIdx);
    var newEl = document.createElement("div");

    var newElI = document.createElement("input");
    newElI.type = "text";
    newElI.dataset["completionType"] = "fields";
    newElI.setAttribute("oninput", "invokeCompletion()");
    newElI.name = "field-" + curIdx;
    newElI.id = "field-" + curIdx;


    var newElD = document.createElement("datalist");
    newElD.id = "field-" + curIdx + "-dl";

    newElI.setAttribute("list", "field-" + curIdx + "-dl");

    var newElR = document.createElement("span");
    newElR.classList.add("pointer");
    newElR.classList.add("minus-button");
    newElR.setAttribute("onclick", "removeFieldInput(" + curIdx + ")");
    newElR.innerText = "حذف";

    newEl.appendChild(newElI);
    newEl.appendChild(newElD);
    newEl.appendChild(newElR);
    document.getElementById("field-add").before(newEl);
}

function removeFieldInput(idx) {
    var el = document.getElementById("field-" + idx).parentElement;
    el.parentElement.removeChild(el);
}

function onLoad() {
    addFieldInput();
}

onLoad();