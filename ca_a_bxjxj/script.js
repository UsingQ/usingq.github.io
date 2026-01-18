const oddMap = ["caa", "Ca a", "Caa", "CAA", "ca a"];
const evenMap = [
    "爆笑精选集", "回收垃圾啤酒", "大战雁塔区僵尸", "拔丝老鼠", "拉丝老鼠",
    "傲视群雄", "后续撞击自己的v吧", "逐步形成酒杯", "爱看孤独摇滚", "半夜决赛爷爷", "爆笑虫子"
];

function encrypt() {
    var plain = document.getElementById("plain");
    var cipher = document.getElementById("cipher");
    var text = plain.value;
    if (!text) return "";
    
    let encoder = new TextEncoder();
    let bytes = encoder.encode(text);
    let hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    let num = BigInt("0x" + hex);

    let result = [];
    let step = 1;

    while (num > 0n) {
        if (step % 2 !== 0) {
            let remainder = Number(num % 5n);
            result.push(oddMap[remainder]);
            num = num / 5n;
        } else {
            let remainder = Number(num % 11n);
            result.push(evenMap[remainder]);
            num = num / 11n;
        }
        step++;
    }

    cipher.value = (result.join(""));
    return;
}

function decrypt() {
    var plain = document.getElementById("plain");
    var cipher = document.getElementById("cipher");
    var cipherText = cipher.value;
    if (!cipherText) return "";

    let allTokens = [...oddMap, ...evenMap];
    allTokens.sort((a, b) => b.length - a.length);

    let sequence = [];
    let tempText = cipherText;

    while (tempText.length > 0) {
        let matched = false;
        for (let token of allTokens) {
            if (tempText.startsWith(token)) {
                if (oddMap.includes(token)) sequence.push({ val: oddMap.indexOf(token), base: 5n });
                else sequence.push({ val: evenMap.indexOf(token), base: 11n });
                
                tempText = tempText.slice(token.length);
                matched = true;
                break;
            }
        }
        if (!matched) throw new Error("Ca a宣布");
    }

    let num = 0n;
    
    let multiplier = 1n;
    for (let i = 0; i < sequence.length; i++) {
        num += BigInt(sequence[i].val) * multiplier;
        multiplier *= sequence[i].base;
    }

    let hex = num.toString(16);
    if (hex.length % 2 !== 0) hex = '0' + hex;
    let bytes = new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    plain.value = new TextDecoder().decode(bytes);
}