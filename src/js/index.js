let baseUrl = "https://hamband.math.sharif.edu/volunteer/api/v1";
let key = "mecaenizajocjutebyeckrewtaegckor";

function performGetRequest(url, params) {
    url = baseUrl + url;
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

function performPutRequest(url, data) {
    url = baseUrl + url;
    params = {};
    params["api_key"] = key;
    var target = new URL(url);
    target.search = new URLSearchParams(params).toString();

    return new Promise(function (resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", target, true);
        xhttp.responseType = "json";
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.onload = function() {
            if (xhttp.status == 200) {
                resolve(xhttp.response);
            }
            else {
                reject(xhttp.status);
            }
        };
        xhttp.send(data);
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
    var queryUrl = "/get_completions/" + e.dataset["completionType"];
    var queryParams = {
        prefix: e.value,
        num: "10"
    }
    var response = await performGetRequest(queryUrl, queryParams);
    var dl = document.getElementById(e.id + "-dl");
    dl.replaceChildren();
    if (response.length == 1 && response[0] == e.value) {
        return;
    }
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
    var d = document.createElement("div");

    var l1 = document.createElement("label");
    l1.setAttribute("for", "field-" + curIdx);
    l1.dataset["required"] = "true";
    l1.innerText = "نام زمینه";

    var i1 = document.createElement("input");
    i1.type = "text";
    i1.dataset["completionType"] = "fields";
    i1.setAttribute("oninput", "invokeCompletion()");
    i1.setAttribute("onfocus", "invokeCompletion()");
    i1.name = "field-" + curIdx;
    i1.id = "field-" + curIdx;
    i1.required = true;


    var dl1 = document.createElement("datalist");
    dl1.id = "field-" + curIdx + "-dl";

    i1.setAttribute("list", "field-" + curIdx + "-dl");

    var sp = document.createElement("span");
    sp.classList.add("pointer");
    sp.classList.add("minus-button");
    sp.setAttribute("onclick", "removeFieldInput(" + curIdx + ")");
    sp.innerText = "حذف";

    d.appendChild(l1);
    d.appendChild(i1);
    d.appendChild(dl1);
    d.appendChild(sp);
    document.getElementById("field-add").before(d);
}

function removeFieldInput(idx) {
    var el = document.getElementById("field-" + idx).parentElement;
    el.parentElement.removeChild(el);
}

function addDegreeInput() {
    var fs = document.getElementById("degrees");
    var lastIdx = fs.dataset["lastIdx"];
    var curIdx = parseInt(lastIdx) + 1;
    fs.dataset["lastIdx"] = curIdx;

    var d = document.createElement("div");
    {
    var s1 = document.createElement("select");
    s1.name = "degree-" + curIdx + "-type";
    s1.id = "degree-" + curIdx + "-type";
    s1.required = true;
    {
        var o1 = document.createElement("option"); o1.value = "BACHELOR"; o1.innerText = "کارشناسی"; s1.options.add(o1);
        var o2 = document.createElement("option"); o2.value = "MASTER"; o2.innerText = "کارشناسی ارشد"; s1.options.add(o2);
        var o3 = document.createElement("option"); o3.value = "PHD"; o3.innerText = "دکترا"; s1.options.add(o3);
        var o4 = document.createElement("option"); o4.value = "POSTDOC"; o4.innerText = "پسادکترا"; s1.options.add(o4);
    }
    d.appendChild(s1);
    }
    {
    var l2 = document.createElement("label");
    l2.setAttribute("for", "degree-" + curIdx + "-uni");
    l2.innerText = "دانشگاه";
    l2.dataset["required"] = "true";
    var i2 = document.createElement("input");
    i2.type = "text";
    i2.name = "degree-" + curIdx + "-uni";
    i2.id = "degree-" + curIdx + "-uni";
    i2.dataset["completionType"] = "degrees/uni";
    i2.required = true;
    i2.setAttribute("oninput", "invokeCompletion()");
    i2.setAttribute("onfocus", "invokeCompletion()");
    i2.setAttribute("list", "degree-" + curIdx + "-uni-dl");
    var dl2 = document.createElement("datalist");
    dl2.id = "degree-" + curIdx + "-uni-dl";

    d.appendChild(l2);
    d.appendChild(i2);
    d.appendChild(dl2);
    }
    {
    var l3 = document.createElement("label");
    l3.setAttribute("for", "degree-" + curIdx + "-major");
    l3.innerText = "رشته";
    l3.dataset["required"] = "true";
    var i3 = document.createElement("input");
    i3.type = "text";
    i3.name = "degree-" + curIdx + "-major";
    i3.id = "degree-" + curIdx + "-major";
    i3.dataset["completionType"] = "degrees/major";
    i3.required = true;
    i3.setAttribute("oninput", "invokeCompletion()");
    i3.setAttribute("onfocus", "invokeCompletion()");
    i3.setAttribute("list", "degree-" + curIdx + "-major-dl");
    var dl3 = document.createElement("datalist");
    dl3.id = "degree-" + curIdx + "-major-dl";

    d.appendChild(l3);
    d.appendChild(i3);
    d.appendChild(dl3);
    }
    {
    var div = document.createElement("div");
    d.appendChild(div);
    }
    {
    var l4 = document.createElement("label");
    l4.setAttribute("for", "degree-" + curIdx + "-start_year");
    l4.innerText = "سال شروع";
    l4.dataset["required"] = "true";
    var i4 = document.createElement("input");
    i4.type = "text";
    i4.name = "degree-" + curIdx + "-start_year";
    i4.id = "degree-" + curIdx + "-start_year";
    i4.required = true;
    i4.minLength = 4;
    i4.maxLength = 4;
    i4.setAttribute("inputmode", "number");

    d.appendChild(l4);
    d.appendChild(i4);
    }
    {
    var l5 = document.createElement("label");
    l5.setAttribute("for", "degree-" + curIdx + "-end_year");
    l5.innerText = "سال پایان (احتمالی)";
    l5.dataset["required"] = "true";
    var i5 = document.createElement("input");
    i5.type = "text";
    i5.name = "degree-" + curIdx + "-end_year";
    i5.id = "degree-" + curIdx + "-end_year";
    i5.required = true;
    i5.minLength = 4;
    i5.maxLength = 4;
    i5.setAttribute("inputmode", "number");

    d.appendChild(l5);
    d.appendChild(i5);
    }
    {
    var sp = document.createElement("span");
    sp.classList.add("pointer");
    sp.classList.add("minus-button");
    sp.setAttribute("onclick", "removeDegreeInput(" + curIdx + ")");
    sp.innerText = "حذف";
    d.appendChild(sp);
    }
    document.getElementById("degree-add").before(d);
}

function removeDegreeInput(idx) {
    var el = document.getElementById("degree-" + idx + "-type").parentElement;
    el.parentElement.removeChild(el);
}

function addContactInput() {
    var fs = document.getElementById("contacts");
    var lastIdx = fs.dataset["lastIdx"];
    var curIdx = parseInt(lastIdx) + 1;
    fs.dataset["lastIdx"] = curIdx;

    var d = document.createElement("div");
    {
        var l1 = document.createElement("label");
        l1.setAttribute("for", "contact-" + curIdx + "-type");
        l1.innerText = "نوع";
        l1.dataset["required"] = "true";

        var i1 = document.createElement("input");
        i1.type = "text";
        i1.name = "contact-" + curIdx + "-type";
        i1.id = "contact-" + curIdx + "-type";
        i1.dataset["completionType"] = "contacts/type";
        i1.setAttribute("list", "contact-" + curIdx + "-type-dl");
        i1.setAttribute("oninput", "invokeCompletion()");
        i1.setAttribute("onfocus", "invokeCompletion()");
        i1.required = true;
        if (curIdx == 1) {
            i1.value = "email";
        }

        var dl1 = document.createElement("datalist");
        dl1.id = "contact-" + curIdx + "-type-dl";

        d.appendChild(l1);
        d.appendChild(i1);
        d.appendChild(dl1);
    }
    {
        var l2 = document.createElement("label");
        l2.setAttribute("for", "contact-" + curIdx + "-address");
        l2.innerText = "آدرس";
        l2.dataset["required"] = "true";

        var i2 = document.createElement("input");
        i2.type = "text";
        i2.name = "contact-" + curIdx + "-address";
        i2.id = "contact-" + curIdx + "-address";
        i2.required = true;

        d.appendChild(l2);
        d.appendChild(i2);
    }
    if (curIdx != 1) {
    var sp = document.createElement("span");
    sp.classList.add("pointer");
    sp.classList.add("minus-button");
    sp.setAttribute("onclick", "removeContactInput(" + curIdx + ")");
    sp.innerText = "حذف";
    d.appendChild(sp);
    }
    document.getElementById("contact-add").before(d);
}

function removeContactInput(idx) {
    var el = document.getElementById("contact-" + idx + "-type").parentElement;
    el.parentElement.removeChild(el);
}

function onLoad() {
    addFieldInput();
    addDegreeInput();
    addContactInput();
}

async function handleSubmitPress() {
    document.documentElement.style.setProperty("--invalidInputColor", "rgba(230, 0, 0, 0.2)");
    if (!document.getElementById("reg-form").checkValidity()) {
        window.alert("لطفا مقدار فیلدها را به طور مناسب وارد کنید. فیلدهای مشکل‌دار، قرمز شده‌اند.");
        return;
    }
    var jsonData = JSON.stringify(buildDataJson());
    var queryUrl = "/new";
    var response = await performPutRequest(queryUrl, jsonData);
    try {
        if (response["status"] == "new_ok") {
            handleSubmissionSuccess();
        }
        else {
            handleSubmissionError(response["status"]);
        }
    }
    catch (e) {
        handleSubmissionError(e);
    }
}

function buildDataJson() {
    var obj = getPersonalFSJson();
    obj = appendFieldsJson(obj);
    obj = appendDegreesJson(obj);
    obj = appendContactsJson(obj);

    return obj;
}

function getPersonalFSJson() {
    var fs = document.querySelectorAll("#personal input, #personal select");
    var obj = {};
    for (var i = 0; i < fs.length; i++) {
        obj[fs[i].name] = fs[i].value;
        if (fs[i].value == "null") {
            obj[fs[i].name] = null;
        }
    }
    return obj;
}

function appendFieldsJson(obj) {
    var fs = document.querySelectorAll("#fields input");
    var fobj = [];
    for (var i = 0; i < fs.length; i++) {
        fobj.push(fs[i].value);
    }
    obj["fields"] = fobj;
    return obj;
}

function appendDegreesJson(obj) {
    var fs = document.querySelectorAll("#degrees div");
    var fobj = [];
    for (var i = 0; i < fs.length; i++) {
        var tobj = {};
        var fsd = fs[i];
        var fsis = fsd.querySelectorAll("input, select");
        for (var j = 0; j < fsis.length; j++) {
            var item = fsis[j];
            tobj[item.name.split("-")[2]] = item.value
        }
        fobj.push(tobj);
    }
    obj["degrees"] = fobj;
    return obj;
}

function appendContactsJson(obj) {
    var fs = document.querySelectorAll("#contacts div");
    var fobj = [];
    for (var i = 0; i < fs.length; i++) {
        var tobj = {};
        var fsd = fs[i];
        var fsis = fsd.querySelectorAll("input, select");
        for (var j = 0; j < fsis.length; j++) {
            var item = fsis[j];
            tobj[item.name.split("-")[2]] = item.value
        }
        fobj.push(tobj);
    }
    obj["contacts"] = fobj;
    return obj;
}

function handleSubmissionSuccess() {
    document.getElementById("reg-form").classList.add("hidden");
    document.getElementById("success").classList.remove("hidden");
}

function handleSubmissionError(msg) {
    window.alert("ثبت اطلاعات شما با خطا مواجه شد. اطلاعات شما ثبت نشده‌است. اگر از صحت آن‌ها مطمئنید، دوباره تلاش کنید. کد خطا: " + msg);
}

onLoad();