var captchaAns = new Array();
var randomVis = new Array(9).fill(0);
var randomPic = new Array();
var vis = new Array(9).fill(0);
var grade = 0;
var ansNum = 0;
function refreshCaptcha(){
    randomVis.fill(0);
    vis.fill(0);
    grade = 0;
    ansNum = 0;
    for(var i = 0; i < 9; ++i){
        captchaAns[i] = Math.floor(Math.random() + 0.5);
        if (captchaAns[i]){
            ansNum++;
        }
        var t = Math.floor(Math.random() * 10);
        while(randomVis[t] != 0){
            t = Math.floor(Math.random() * 10);
        }
        randomPic[i] = t;
        document.getElementById("c" + (i + 1)).setAttribute('style', 'background: url(images/' + captchaAns[i] + t + '.jpg); background-size:90px 90px;');
        randomVis[t] = 1;
    }
}
function checkAns(a){
    if(document.getElementById("c" + (a + 1)).getAttribute("style") == 'filter: opacity(50%)'){
        if(captchaAns[a] == 1 && vis[a] == 1){
            grade = (grade == 0) ? 0 : grade - 1;
            vis[a] = 0;
        }
        if(captchaAns[a] == 0 && vis[a] == 1){
            grade++;
            vis[a] = 0;
        }
        document.getElementById("c" + (a + 1)).setAttribute('style', 'background: url(images/' + captchaAns[a] + randomPic[a] + '.jpg); background-size:90px 90px;');
    }
    else{
        if(captchaAns[a] == 1 && vis[a] == 0){
            grade++;
            vis[a] = 1;
        }
        if(captchaAns[a] == 0 && vis[a] == 0){
            grade = (grade == 0) ? 0 : grade - 1;
            vis[a] = 1;
        }
        document.getElementById("c" + (a + 1)).setAttribute('style', 'filter: opacity(50%)');
    }
}
function showGrade(){
    var t = "";
    if(grade == ansNum){
        t = '恭喜，你通过了主播验证！';
        document.getElementById("result").innerHTML = t;
    }
    else{
        t = "你是不是主播，竟然没有答对！你的分数是：" + grade + "/" + ansNum;
        document.getElementById("result").innerHTML = t;
    }
    refreshCaptcha();
}