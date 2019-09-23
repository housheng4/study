
var IDNum = sessionStorage.getItem('IDNum');
console.log("身份字符串:",IDNum);
var IDArray = IDNum.split('|');
console.log("身份数组:",IDArray);
var sss = IDArray.filter(function (n) {//所有的杀手个数
    return n === '杀手';
}).length;
var ppp = IDArray.filter(function (n) {//所有的平民个数
    return n === '平民';
}).length;
var d = JSON.parse(sessionStorage.getItem('days')); //获取天数
d++//天数递增
    console.log(d);
    sessionStorage.setItem('days',JSON.stringify(d))//储存天数

var state = sessionStorage.getItem('state')
sessionStorage.setItem('state',state)
console.log(state);
var bevote = sessionStorage.getItem('bevote')//被投死的杀手人数

IDBekill = JSON.parse(sessionStorage.getItem('IDBekill')) ||[]
console.log(IDBekill);//需要变暗的盒子下标
sessionStorage.setItem('IDBekill',JSON.stringify(IDBekill)) ||[]


for (let i = 0; i < IDArray.length; i++) {//添加盒子
    $(".content").append(
        "<div class='box'><div class='div1'><p class='p1'></p></div>"
        + "<div class='div2'><p class='p2'></p></div>"
        + "<div class='killsimg'><img src='../image/kill.png'></div></div>");
}

for (let i = 0; i < IDArray.length; i++) {
    x = document.getElementsByClassName('p1')//获取p1的DOM节点
    y = document.getElementsByClassName('p2')
    x[i].innerHTML = IDArray[i];
    y[i].innerHTML = i + 1 + "号";
    $(".killsimg").hide();
}
let div1 = document.getElementsByClassName('div1')//获取盒子节点
for (let i = 0; i < IDArray.length; i++) {//所有需要变暗的盒子变色
    if (IDBekill != null) {
        $(div1[IDBekill[i]]).css("background-color", "#83b09a");
    }
}
let index;
$(".box").click(function () { //点击一个盒子下面显示杀人图标其他的图标不显示
    index = $(this).index()
    $(".killsimg").hide();
    $(".killsimg").eq(index).show();
});
let b = false;
$("#beginBtn").click(function () { 
    b = true;
    // d++//天数递增
    // console.log(d);
    // sessionStorage.setItem('days',JSON.stringify(d))//储存天数
    $(div1[index]).css("background-color", "#83b09a")
    let x = IDBekill.indexOf(index) 
    console.log(x);
    if (x >-1) {
        alert('已经死了')//判断点击的是不是死人
    }else {
        if (IDArray[index] == "杀手") {
            console.log("投死了杀手");
            IDBekill.push(index)
            IDBekill = Array.from(new Set(IDBekill))//下标去重
            bevote++;
            sessionStorage.setItem('IDBekill',JSON.stringify(IDBekill)) ||[] //存储需要变暗的盒子的下标
            sessionStorage.setItem('bevote',bevote) ||1//杀手被投死人数、初始化为1
            sessionStorage.setItem('killwhos',JSON.stringify(IDArray[index]))//投票页面谁被杀了
                tip2 = JSON.parse(sessionStorage.getItem('tip2')) ||[]
                tip2s = JSON.parse(sessionStorage.getItem('tip2s')) ||[]
                tip2.push(index+1)
                tip2s.push(index)
                sessionStorage.setItem('tip2',JSON.stringify(tip2)) ||[]
                sessionStorage.setItem('tip2s',JSON.stringify(tip2s)) ||[]
                sessionStorage.setItem('shengyu2',(sss-bevote))
            if (bevote === sss ) {
                sessionStorage.setItem('tip2',JSON.stringify(tip2)) ||[]
                sessionStorage.setItem('tip2s',JSON.stringify(tip2s)) ||[]
                alert('游戏结束平民胜利')
                location.href = "./gameover.html";
            }else {
                window.location.href = "./tasktp.html"
            }
        }
        if (IDArray[index] == "平民") {
            console.log("投死了平民");
            var bekilled = sessionStorage.getItem('bekilled')
            bekilled++;
            sessionStorage.setItem('bekilled',bekilled)//投票页面被杀的平民人数初始化为1
                tip2 = JSON.parse(sessionStorage.getItem('tip2')) ||[]
                tip2s = JSON.parse(sessionStorage.getItem('tip2s')) ||[]
                tip2.push(index+1)
                tip2s.push(index)
                sessionStorage.setItem('tip2',JSON.stringify(tip2)) ||[]
                sessionStorage.setItem('tip2s',JSON.stringify(tip2s)) || []
            IDBekill.push(index)
            IDBekill = Array.from(new Set(IDBekill))//下标去重
            sessionStorage.setItem('IDBekill',JSON.stringify(IDBekill)) ||[] //存储需要变暗的盒子的下标
            var result = (ppp-bekilled) - (sss-bevote)//判断游戏结果
            sessionStorage.setItem('shengyu1', (ppp-bekilled))
            sessionStorage.setItem('shengyu2',(sss-bevote))
                if (result <= 0) {
                    sessionStorage.setItem('tip2',JSON.stringify(tip2)) ||[]
                    sessionStorage.setItem('tip2s',JSON.stringify(tip2s)) ||[]
                    alert('游戏结束杀手胜利')
                    location.href = './gameover.html'
                }else {
                    sessionStorage.setItem('tip2',JSON.stringify(tip2)) || []
                    sessionStorage.setItem('tip2s',JSON.stringify(tip2s)) ||[]
                    window.location.href = "./tasktp.html"
                }
        }
        if (IDArray[index] == undefined) {
            if (bekilled == null) {//没有点击被杀或者被投死人数为0
                bekilled = 0;
            }if (bevote == null) {
                bevote = 0;
            }
            sessionStorage.setItem('shengyu1', (ppp-bekilled))
            sessionStorage.setItem('shengyu2',(sss-bevote))
            alert('啥也没干啊')
        }
    }
 
    sessionStorage.setItem('happenb',b)  
   
});
// if (a == false) {
//     tip2.push(null)
//     tip2s.push(null)
//     sessionStorage.setItem('tip2',JSON.stringify(tip2)) ||[]
//     sessionStorage.setItem('tip2s',JSON.stringify(tip2s)) ||[]
// }
