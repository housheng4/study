var IDNum = sessionStorage.getItem("IDNum");//得到的是字符串
// console.log(IDNum);
var IDNumshu = IDNum.split("|");//拆解字符串得到数组
// console.log(IDNumshu);
var x = IDNumshu.length;
var pingmin = JSON.parse(sessionStorage.getItem('pingmin'));
// console.log(pingmin);
//  pingminx = pingmin
//  console.log(pingminx);
shashou = sessionStorage.getItem('shashou')

var allKills = sessionStorage.getItem('allKill')
sessionStorage.setItem('allKills', allKills)

 pingmindeadall = sessionStorage.getItem('pingmindeadall')
    shashou = sessionStorage.getItem('shashou')
var allpingmin = IDNumshu.filter(function (n) {
    return n === '平民';
}).length;
// console.log(allpingmin);
var allshashou = IDNumshu.filter(function (n) {
    return n === '杀手';
}).length;
console.log(allshashou);

var alldeads = JSON.parse(sessionStorage.getItem('alldeadss'))
// console.log(alldeads);


$(document).ready(function () {

    //循环添加div有几个角色加几个div
    for (let i = 0; i < IDNumshu.length; i++) {
        $(".content").append(
            "<div class='box'><div class='div1'><p class='p1'></p></div>"
            + "<div class='div2'><p class='p2'></p></div>"
            + "<div class='killsimg'><img src='../image/kill.png'></div></div>");
    }



    let div1 = document.getElementsByClassName('div1')//死亡的人变色
    if (alldeads != null) {
        for (let i = 0; i < alldeads.length; i++) {
            // console.log(alldeads[i]);

            $(div1[alldeads[i]]).css("background-color", "#83b09a");
        }
    }
    // if (alldead != null) {
    //     for (let i = 0; i < alldead.length; i++) {
    //         $(div1[alldead[i]]).css("background-color", "#83b09a");

    //     }
    // }

    for (let i = 0; i < IDNumshu.length; i++) {
        x = document.getElementsByClassName('p1')//获取p1的DOM节点
        y = document.getElementsByClassName('p2')
        x[i].innerHTML = IDNumshu[i];
        y[i].innerHTML = i + 1 + "号";
        $(".killsimg").hide();
    }

    //通过下标来选择一个人来点击杀人。
    let index;
    $(".box").click(function () {
        index = $(this).index()

        // console.log(pingmin);
        var obj = alldeads.indexOf(index)
        // console.log(obj);
        //点击死亡的人
        if (obj > -1) {
            alert('已经死了');
        } else {
            $(".killsimg").hide()
            $(".killsimg").eq(index).show()
        }
    });

// var killx = JSON.parse(sessionStorage.getItem("killx")) || 0; //杀手被杀的人数
// var pinminy = JSON.parse(sessionStorage.getItem("flat")) || 0; //平民被杀的人数


    var qwe = [];
    // var qwe = JSON.parse(sessionStorage.getItem('diePerson'))// 被杀角色
    //点击确定按钮判断是不是杀手
    $("#beginBtn").click(function () {
        //点击死亡的人
        if (IDNumshu[index] == pingmin) {
            console.log(IDNumshu[index]);
            // alert('已经死了')   
        }
        //投票出来的人
        else {
            $(div1[index]).css("background-color", "#83b09a")
            // console.log(index);
            var alldead = [];
            alldeads.push(index);//得到所有死亡的人数重复点击出现重复的
            // alldeads = pingmin
            // console.log(alldeads);
            var alldead = Array.from(new Set(alldeads));//去重
            console.log(alldead);
            sessionStorage.setItem('alldead', JSON.stringify(alldead));//更新所有的死人
            
            console.log(alldead);
            // qwe.push(IDNumshu[index])
            // sessionStorage.setItem('diePerson',JSON.stringify(qwe));
            qwe.push(IDNumshu[index])
            // var shashou = 0
            console.log(qwe);
            if (IDNumshu[index] == '杀手') {
                shashou++;
                sessionStorage.setItem('shashou',shashou)
            }
            if (IDNumshu[index] == '平民') {
                console.log(IDNumshu[index]);
                
                pingmindeadall++;
                sessionStorage.setItem("pingmindeadall",pingmindeadall)
                var numberone = (allpingmin - pingmindeadall)
                console.log(numberone);
                
                var numbertwo = (allshashou - shashou)
                    console.log(numbertwo);
                    
                if (allshashou = shashou) {
                    alert('杀手胜利')
                    window.location.href = './taskck.html'
                }
                if (numbertwo = 0) {
                    alert('平民胜利')
                }
            }
            window.location.href = "./tasktp.html"


        }



    });

});