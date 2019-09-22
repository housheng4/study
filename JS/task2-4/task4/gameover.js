var d = JSON.parse(sessionStorage.getItem('days')); //获取天数
var IDNum = sessionStorage.getItem('IDNum');
console.log("身份字符串",IDNum);
var IDArray = IDNum.split('|');
console.log("身份数组",IDArray);
console.log(d);
shengyu1 = sessionStorage.getItem('shengyu1')
shengyu2 = sessionStorage.getItem('shengyu2')
tip1 = JSON.parse(sessionStorage.getItem('tip1'))//投票页面结果
tip2 = JSON.parse(sessionStorage.getItem('tip2'))//杀人页面结果
tip1s = JSON.parse(sessionStorage.getItem('tip1s')) //投票页面结果下标
tip2s = JSON.parse(sessionStorage.getItem('tip2s')) //杀人页面结果下标
for (let i = 0; i < d; i++) {
    $(".box").eq(i).clone().appendTo('.boxA');
    $(".box").eq(i).show();
    $(".day").eq(i).text("第" + (i+1) + "天");//插入天数
    if (tip1[i] == "no") {
        $(".black").eq(i).text("黑夜：啥也没发生");
        $(".white").eq(i).text("白天:"+tip2[i]+"号被投死了，真实身份是"+IDArray[tip2s[i]]);
    }else {
    $(".black").eq(i).text("黑夜:"+tip1[i]+"号被杀死了，真实身份是"+IDArray[tip1s[i]]);
    $(".white").eq(i).text("白天:"+tip2[i]+"号被投死了，真实身份是"+IDArray[tip2s[i]]);
    $(".killer").eq(i).text("杀手"+shengyu2 + "人");
    $(".pingmin").eq(i).text("平民"+shengyu1 + "人");
   }
}
$(".button").click(function () { 
    var o = confirm("确立离开游戏吗？");
    if (o == true) {
        sessionStorage.clear(); //删除所有数据
        window.location.href = "../task2/taskpb1.html";
    }
});
$(".home").click(function () { 
        sessionStorage.clear(); //删除所有数据
        window.location.href = "../task2/taskpb1.html";
});
