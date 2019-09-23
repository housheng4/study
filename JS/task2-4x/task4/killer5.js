var IDNum = sessionStorage.getItem('IDNum');
console.log("身份字符串：",IDNum);
var IDArray = IDNum.split('|');
console.log("身份数组：",IDArray);

var d = JSON.parse(sessionStorage.getItem('days')); //获取天数
// d++//天数递增
console.log(d);
tip1 = JSON.parse(sessionStorage.getItem('tip1')) ||[]
tip1s = JSON.parse(sessionStorage.getItem('tip1s')) ||[]
var state = sessionStorage.getItem('state')//获取状态
sessionStorage.setItem('state',state)//保存状态
console.log(state);
var ppp = IDArray.filter(function (n) {//所有的平民个数
    return n === '平民';
}).length;
var sss = IDArray.filter(function (n) {//所有的杀手个数
    return n === '杀手';
}).length;
var bevote = sessionStorage.getItem('bevote')//被投死的杀手人数
IDBekill = JSON.parse(sessionStorage.getItem('IDBekill')) ||[]
console.log(IDBekill);//需要变暗的盒子下标
// sessionStorage.setItem('IDBekill',JSON.stringify(IDBekill))
var bekilled = sessionStorage.getItem('bekilled')//被杀的平民人数

for (let i = 0; i < IDArray.length; i++) {
    $(".content").append(
        "<div class='box'><div class='div1'><p class='p1'></p></div>"
            + "<div class='div2'><p class='p2'></p></div>"
            + "<div class='killsimg'><img src='../image/kill.png'></div></div>"
    );
}
let div1 = document.getElementsByClassName('div1')
    
for (let i = 0; i < IDArray.length; i++) {
    x = document.getElementsByClassName('p1')//获取p1的DOM节点
    y = document.getElementsByClassName('p2')
    x[i].innerHTML = IDArray[i];//给对应盒子里加入职业文字
    y[i].innerHTML = i + 1 + "号";//给对应盒子里加入序号
    $(".killsimg").hide();
}
let index;
$(".box").click(function () { //点击一个盒子下面显示杀人图标其他的图标不显示
    index = $(this).index()
    $(".killsimg").hide();
    $(".killsimg").eq(index).show();
});
for (let i = 0; i < IDBekill.length; i++) {//所有需要变暗的盒子
    $(div1[IDBekill[i]]).css("background-color", "#83b09a");
}

let a = false;
$("#beginBtn").click(function () { 
    a = true;
    let y = IDBekill.indexOf(index) ;//判断有没有死
        if (y > -1) {
            alert('已经挂了')
        }
        else {
            if (IDArray[index] == "平民") {
                $(div1[index]).css("background-color", "#83b09a");//改变被杀的盒子颜色
                IDBekill.push(index);//杀手杀死的盒子的下标
                IDBekill = Array.from(new Set(IDBekill))//下标去重
                bekilled++;
                sessionStorage.setItem('IDBekill',JSON.stringify(IDBekill)) ||[]//存储需要变暗的盒子的下标
                sessionStorage.setItem('bekilled',bekilled) ||1//杀人页面被杀的平民人数初始化为1
                sessionStorage.setItem('killwho',JSON.stringify(IDArray[index]))//杀人页面谁被杀了
                var result = (ppp-bekilled) - (sss-bevote)//判断游戏结果
                sessionStorage.setItem('shengyu1', (ppp-bekilled))
                sessionStorage.setItem('shengyu2',(sss-bevote))
                if (result <= 0) {
                    d++;
                    sessionStorage.setItem('days',JSON.stringify(d))//储存天数
                    alert('游戏结束杀手胜利')
                    
                    tip1.push(index+1)
                    tip1s.push(index)
                    sessionStorage.setItem('tip1',JSON.stringify(tip1)) ||[]
                    sessionStorage.setItem('tip1s',JSON.stringify(tip1s)) ||[]
                    location.href = './gameover.html'
                }else {
                    // tip1 = JSON.parse(sessionStorage.getItem('tip1')) ||[]
                    // tip1s = JSON.parse(sessionStorage.getItem('tip1s')) ||[]
                    tip1.push(index+1)
                    tip1s.push(index)
                    sessionStorage.setItem('tip1',JSON.stringify(tip1)) ||[]
                    sessionStorage.setItem('tip1s',JSON.stringify(tip1s)) ||[]
                    window.location.href = "./tasktp.html"
                } 
            }
            if (IDArray[index] == "杀手" ) {
                alert('你这样会杀了自己人')
            } 
            if (IDArray[index] == null) {
                // tip1 = JSON.parse(sessionStorage.getItem('tip1')) ||[]
                // tip1s = JSON.parse(sessionStorage.getItem('tip1s')) ||[]
                tip1.push(null)
                tip1s.push(null)
                sessionStorage.setItem('tip1',JSON.stringify(tip1)) ||[]
                sessionStorage.setItem('tip1s',JSON.stringify(tip1s)) ||[]
                if (bekilled == null) {
                    bekilled = 0;
                }if (bevote == null) {
                    bevote = 0;
                }
                sessionStorage.setItem('shengyu1', (ppp-bekilled))
                sessionStorage.setItem('shengyu2',(sss-bevote))
                // alert('啥也没干啊')
                window.location.href = "./tasktp.html"
            }
        }
        sessionStorage.setItem('happena',a)
        console.log(a);

});
console.log(a);
console.log(tip1);

// if (a == false) {
//     tip1.push(null)
//     console.log(tip1);
    
//     tip1s.push(null)
//     sessionStorage.setItem('tip1',JSON.stringify(tip1)) ||[]
//     sessionStorage.setItem('tip1s',JSON.stringify(tip1s)) ||[]
// }

$(".closeimg").click(function () { 
    sessionStorage.clear();
    location.href = "../task2/taskpb1.html"
});