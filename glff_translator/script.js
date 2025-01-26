const pMap = ["盖伦。", "发发。", "盖伦，", "发发，", "盖伦？", "发发？", "盖伦！", "发发！", "盖伦；", "发发；"];
const rMap = new Map();

rMap.set("。", 0);
rMap.set("，", 2);
rMap.set("？", 4);
rMap.set("！", 6);
rMap.set("；", 8);

function encryptText() {
    var plain = document.getElementById("plain");
    var cipher = document.getElementById("cipher");
    var text = plain.value;
    var res = '';
    for (var i = 0; i < text.length; ++i) {
        var code = text.charCodeAt(i);
        var t = code.toString().padStart(5, '0');
        for (var j = 0; j < 5; ++j) {
            res += pMap[t[j] - '0'];
        }
    }
    cipher.value = res;
    return;
}

function decryptText() {
    var plain = document.getElementById("plain");
    var cipher = document.getElementById("cipher");
    var text = cipher.value;
    var t = 0;
    var res = '';
    for (var i = 1; i < text.length; i += 3) {
        if (text[i] == "伦") {
            t = t * 10 + rMap.get(text[i + 1]);
        }
        else {
            t = t * 10 + rMap.get(text[i + 1]) + 1;
        }
        if ((i - 1) / 3 % 5 == 4) {
            res += eval("'" + "\\u" + t.toString(16).padStart(4, '0') + "'");
            t = 0;
        }
    }
    plain.value = res;
    return;
}