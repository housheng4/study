var IDNum =sessionStorage.getItem("IDNum");//得到的是字符串
console.log(IDNum);
var IDNumshu = IDNum.split("|");//拆解字符串得到数组
console.log(IDNumshu);
var x = IDNumshu.length;

$(document).ready(function () {
    for (let i = 0; i < IDNumshu.length; i++) {
        
        $(".content").append(
            "<div class='box'><div class='div1'><p class='p1'></p></div>"
           + "<div class='div2'><p class='p2'></p></div></div>");       
        //    $(".p1").append(IDNumshu[i]); 
    }
    // p1=$(".p1").toArray();
    // console.log(p1);
    // p1 = IDNumshu;
    // console.log(p1);
    //把数据循环存入p中
    for (let i = 0; i < IDNumshu.length; i++) {
        x = document.getElementsByClassName('p1')//获取p1的DOM节点
        y = document.getElementsByClassName('p2')
        x[i].innerHTML = IDNumshu [i];
        y[i].innerHTML = i+1+"号";
    }
    $("#beginBtn").click(function (e) { 
        e.preventDefault();
        window.location.href = "../task4/tasktp.html"
        
    });
    $(".returnimg").click(function () { 
        location.href = "./taskck.html"
        
    });
});

