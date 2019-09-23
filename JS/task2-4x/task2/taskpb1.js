var IDNum = "";
function myLoad() {
    playerNum.player.value = 8;
    var x =document.getElementById('killer').innerHTML = 2;
    var y = document.getElementById('pingMin').innerHTML = 6;
    
    var killer =[];
    for (let i = 0; i < x; i++) {
        killer.push("杀手"); 
    }
    console.log(killer);
    var pingMin =[];
    for (let i = 0; i < y; i++) {
        pingMin.push("平民"); 
    }
    console.log(pingMin);
    var killAndPing = killer.concat(pingMin);
    console.log(killAndPing);
    //费舍尔洗牌算法
    var _array = killAndPing.concat();
     for (var i = _array.length; i--; ) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = _array[i];
    _array[i] = _array[j];
    _array[j] = temp;
    }
    //得到随机的身份
    var IDNum = _array.join("|");
    console.log(IDNum);
    sessionStorage.setItem("IDNum",IDNum);//传参
}
function change() {
    var x =2;
    var y =6;
    var a = playerNum.player.value;
     if ( a <= 5 && a > 3) {
        x = 1;
        y = a - 1;
    }
    else if (a < 9 && a > 5) {
        x = 2;
        y = a - 2;
    }
    else if (a > 8 && a < 12) {
        x = 3;
        y = a - 3;
    }
    else if (a>11 && a<16) {
        x = 4;
        y = a - 4;
    }
    else if (a>15 && a<19) {
        x = 5;
        y = a - 5;
    }
    else  {
        x = "&nbsp;&nbsp;";
        y = "&nbsp;&nbsp;";
    }
    document.getElementById('killer').innerHTML = x;
    document.getElementById('pingMin').innerHTML = y;
    var killer =[];
    for (let i = 0; i < x; i++) {
        killer.push("杀手"); 
    }
    console.log(killer);
    var pingMin =[];
    for (let i = 0; i < y; i++) {
        pingMin.push("平民"); 
    }
    console.log(pingMin);
    var killAndPing = killer.concat(pingMin);
    console.log(killAndPing);
    //费舍尔洗牌算法
    var _array = killAndPing.concat();
     for (var i = _array.length; i--; ) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = _array[i];
    _array[i] = _array[j];
    _array[j] = temp;
    }
    // console.log(_array);//得到随机的身份
    var IDNum = _array.join("|");//转字符串
    console.log(IDNum);
    sessionStorage.setItem("IDNum",IDNum);//传参
}
function tiShi() {
    var a = playerNum.player.value;
    console.log(a);
    let reg = /^[0-9]*$/;
    if(!reg.test(a)){
        playerNum.player.value = 8;
        alert('请输入正确的玩家数量');
        myLoad();
    }
    else if ( a > 18) {
        playerNum.player.value = 18;
        alert('最大可输入18');
        myLoad();
    }else if(a < 4){
        playerNum.player.value = 4;
        alert('最小可输入4');
        myLoad();
    }
    else {
        window.location.href = "../task3/taskck.html"
    }
}



