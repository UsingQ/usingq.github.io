var captchaAns = new Array();
var randomVis = new Array(18).fill(0);
var randomPic = new Array();
var vis = new Array(9).fill(0);
var grade = 0;
var ansNum = 0;
function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n);
    });
}
function refreshCaptcha(){
    randomVis.fill(0);
    vis.fill(0);
    grade = 0;
    ansNum = 0;
    for(var i = 0; i < 9; ++i){
        captchaAns[i] = Math.round(Math.random());
        if (captchaAns[i]){
            ansNum++;
        }
        var t = Math.floor(Math.random() * 10);
        if(captchaAns[i] == 1){
            while(randomVis[t] != 0){
                t = Math.floor(Math.random() * 10);
            }
        }else{
            while(randomVis[t] != 0){
                t = Math.floor(Math.random() * 18);
            }
        }
        randomPic[i] = t;
        document.getElementById("c" + (i + 1)).setAttribute('style', 'background: url(images/' + captchaAns[i] + t + '.jpg); background-size:90px 90px;');
        document.getElementById("c" + (i + 1)).setAttribute('isPushed', 'No');
        randomVis[t] = 1;
    }
}
function checkAns(a){
    if(document.getElementById("c" + (a + 1)).getAttribute("isPushed") == 'Yes'){
        if(captchaAns[a] == 1 && vis[a] == 1){
            grade--;
            vis[a] = 0;
        }
        if(captchaAns[a] == 0 && vis[a] == 1){
            grade++;
            vis[a] = 0;
        }
        document.getElementById("c" + (a + 1)).setAttribute('style', 'background: url(images/' + captchaAns[a] + randomPic[a] + '.jpg); background-size:90px 90px;filter:brightness(100%); transform: scale(100%,100%);');
        document.getElementById("c" + (a + 1)).setAttribute('isPushed', 'No');
    }
    else{
        if(captchaAns[a] == 1 && vis[a] == 0){
            grade++;
            vis[a] = 1;
        }
        if(captchaAns[a] == 0 && vis[a] == 0){
            grade--;
            vis[a] = 1;
        }
        document.getElementById("c" + (a + 1)).setAttribute('style', 'background: url(images/' + captchaAns[a] + randomPic[a] + '.jpg); background-size:90px 90px;filter:brightness(50%); transform: scale(90%,90%); border:2px #4169E1');
        document.getElementById("c" + (a + 1)).setAttribute('isPushed', 'Yes');
    }
}
function showGrade(){
    var t = "";
    if(grade == ansNum){
        t = '恭喜，你通过了主播验证！';
        document.getElementById("result").innerHTML = t;
    }
    else{
        var t2 = (grade < 0) ? 0 : grade;
        t = "你是不是主播，竟然没有答对！你的分数是：" + t2 + "/" + ansNum;
        document.getElementById("result").innerHTML = t;
    }
    refreshCaptcha();
}