var reult = [];
var colors = [];
var set;
function colorss() {
    for (var i = 0; i < 3; i++) {
        var color = "#";
        for (var j = 0; j < 3; j++) {
            var r = Math.floor(Math.random() * 256);
            if (r < 16) {
            color += "0";//一位加零
            }
            color += r.toString(16);//转换16进制
        }
        colors[i] = color;
    }
    if (i > 0) { //颜色查重
        for (var t = 0; t < colors.length; t++) {
            if (colors[i] != colors[t]) {
                break;
            }
            else {
                i--;
            }
        }
    }
}
function num() {
    var arr = [];
    for (var i = 0; i <= 8; i++) {
        arr[i] = i;
    }
    for (var i = 0; i < 3; i++) {
    var ran = Math.floor(Math.random() * (arr.length - i));
    reult[i]=arr[ran];//往随机数组里边存入随机选中的数
    arr[ran] = arr[arr.length - i - 1];//数组内容替换
    }
}
var y = document.getElementsByTagName("div");
function move() {
    colorss();num();clearColor();
    clearInterval(set);
    for(var i=0;i<reult.length;i++){
        y[reult[i]].style.backgroundColor = colors[i];
        clearInterval(set);
        set=window.setInterval("move()",500);
    }
    document.getElementById("topBtn").style.backgroundColor = "orange";
    document.getElementById("topBtn").style.color = "#fff"
    document.getElementById("buttomBtn").removeAttribute("style");
}
function clearColor() {
    for (var i = 0; i < y.length; i++) {//去色
        y[i].removeAttribute("style");
    }
}
function stopall() {
    window.clearInterval(set);
    for (var i = 0; i < y.length; i++) {//去色
        y[i].removeAttribute("style");
    }
    document.getElementById("topBtn").removeAttribute("style");//按钮改色
    document.getElementById("buttomBtn").style.backgroundColor = "orange"
    document.getElementById("buttomBtn").style.color = "#fff"
}